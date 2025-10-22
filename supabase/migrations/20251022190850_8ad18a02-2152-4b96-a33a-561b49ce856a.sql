-- ============================================================================
-- FASE 1: BACKEND & AUTENTICAÇÃO - SCHEMA COMPLETO
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. USER ROLES SYSTEM
-- ----------------------------------------------------------------------------

-- Enum para roles do sistema
create type public.app_role as enum ('admin', 'editor', 'client');

-- Tabela de roles (separada para segurança)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Tabela de perfis (dados públicos do usuário)
create table public.profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- ----------------------------------------------------------------------------
-- 2. CONTENT TABLES (ARTICLES & SHORTS)
-- ----------------------------------------------------------------------------

-- Tabela de artigos
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  thumbnail text,
  category text not null,
  author_id uuid references auth.users(id),
  published_at timestamptz,
  updated_at timestamptz default now(),
  created_at timestamptz default now(),
  views integer default 0,
  read_time integer default 5,
  sources integer default 1,
  status text default 'draft' check (status in ('draft', 'published', 'archived'))
);

create index idx_articles_slug on public.articles(slug);
create index idx_articles_category on public.articles(category);
create index idx_articles_published_at on public.articles(published_at desc);
create index idx_articles_status on public.articles(status);

alter table public.articles enable row level security;

-- Tabela de shorts (Espiaí em 30s)
create table public.shorts (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references public.articles(id) on delete cascade,
  video_url text not null,
  poster_url text,
  duration integer not null,
  views integer default 0,
  created_at timestamptz default now()
);

create index idx_shorts_article_id on public.shorts(article_id);

alter table public.shorts enable row level security;

-- ----------------------------------------------------------------------------
-- 3. CAMPAIGNS & ANALYTICS (B2G/B2B)
-- ----------------------------------------------------------------------------

-- Tabela de campanhas
create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references auth.users(id),
  title text not null,
  description text,
  start_date timestamptz not null,
  end_date timestamptz not null,
  budget decimal,
  status text default 'active' check (status in ('active', 'paused', 'completed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.campaigns enable row level security;

-- Tabela de performance de anúncios
create table public.ad_performance (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id),
  slot_id text not null,
  impressions integer default 0,
  viewable_impressions integer default 0,
  clicks integer default 0,
  ctr decimal generated always as (
    case when impressions > 0 
    then (clicks::decimal / impressions::decimal) * 100 
    else 0 end
  ) stored,
  viewability decimal generated always as (
    case when impressions > 0 
    then (viewable_impressions::decimal / impressions::decimal) * 100 
    else 0 end
  ) stored,
  date date default current_date,
  unique(campaign_id, slot_id, date)
);

create index idx_ad_performance_date on public.ad_performance(date desc);
create index idx_ad_performance_campaign on public.ad_performance(campaign_id);

alter table public.ad_performance enable row level security;

-- ----------------------------------------------------------------------------
-- 4. SECURITY DEFINER FUNCTIONS (evita recursão RLS)
-- ----------------------------------------------------------------------------

-- Função para checar se usuário tem uma role específica
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Função para obter role do usuário atual
create or replace function public.get_user_role(_user_id uuid)
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.user_roles
  where user_id = _user_id
  limit 1
$$;

-- ----------------------------------------------------------------------------
-- 5. RLS POLICIES
-- ----------------------------------------------------------------------------

-- PROFILES: todos leem, só dono atualiza
create policy "Public profiles are viewable by everyone"
on public.profiles for select using (true);

create policy "Users can insert own profile"
on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update using (auth.uid() = id);

-- USER ROLES: admins gerenciam, users veem próprio
create policy "Users can view own roles"
on public.user_roles for select
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Only admins can manage roles"
on public.user_roles for all
using (public.has_role(auth.uid(), 'admin'));

-- ARTICLES: públicos se published, editores gerenciam
create policy "Anyone can read published articles"
on public.articles for select
using (status = 'published' or auth.uid() is not null);

create policy "Editors can insert articles"
on public.articles for insert
with check (public.has_role(auth.uid(), 'editor') or public.has_role(auth.uid(), 'admin'));

create policy "Editors can update own articles"
on public.articles for update
using (
  author_id = auth.uid() or 
  public.has_role(auth.uid(), 'admin')
);

create policy "Only admins can delete articles"
on public.articles for delete
using (public.has_role(auth.uid(), 'admin'));

-- SHORTS: seguem permissões do article
create policy "Anyone can view shorts"
on public.shorts for select using (true);

create policy "Editors can manage shorts"
on public.shorts for all
using (public.has_role(auth.uid(), 'editor') or public.has_role(auth.uid(), 'admin'));

-- CAMPAIGNS: clientes veem suas, admins veem todas
create policy "Clients see their campaigns"
on public.campaigns for select
using (client_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Admins manage all campaigns"
on public.campaigns for all
using (public.has_role(auth.uid(), 'admin'));

-- AD PERFORMANCE: clientes veem suas métricas
create policy "View campaign performance"
on public.ad_performance for select
using (
  exists (
    select 1 from public.campaigns
    where campaigns.id = ad_performance.campaign_id
    and (campaigns.client_id = auth.uid() or public.has_role(auth.uid(), 'admin'))
  )
);

create policy "Admins manage ad performance"
on public.ad_performance for all
using (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- 6. TRIGGER: AUTO-CREATE PROFILE ON SIGNUP
-- ----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Criar profile automaticamente
  insert into public.profiles (id, full_name)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', 'Usuário')
  );
  
  -- Primeiro usuário vira admin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin');
  end if;
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();