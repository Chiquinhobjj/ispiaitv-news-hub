/**
 * Mock Data for IspiAI - Shorts, Articles, Dossiers, Native Modules
 * Use ?mocks=1 query param to enable mock ads
 */

export interface ShortData {
  id: string;
  slug: string;
  title: string;
  category: string;
  poster: string;
  duration: number; // seconds
  videoUrl?: string; // Optional for now (mock)
  articleSlug: string;
}

export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number; // minutes
  thumbnail: string;
  imageUrl: string; // Alias for thumbnail
  sources: number; // Number of sources cited
  featured?: boolean;
}

export interface DossierData {
  id: string;
  slug: string;
  title: string;
  description: string;
  articlesCount: number;
  thumbnail: string;
  updatedAt: string;
}

export interface NativeModuleData {
  id: string;
  type: 'newsletter' | 'follow' | 'cta';
  title: string;
  description: string;
  ctaText: string;
  image?: string;
}

export const mockShorts: ShortData[] = [
  {
    id: '1',
    slug: 'ia-saude-diagnostico',
    title: 'IA revoluciona diagnóstico médico com 95% de precisão',
    category: 'Saúde',
    poster: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-revoluciona-diagnostico-medico',
  },
  {
    id: '2',
    slug: 'chatgpt-5-lancamento',
    title: 'OpenAI anuncia GPT-5: o que esperar?',
    category: 'Tecnologia',
    poster: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'openai-anuncia-gpt-5',
  },
  {
    id: '3',
    slug: 'ia-educacao-personalizada',
    title: 'IA cria planos de ensino personalizados para cada aluno',
    category: 'Educação',
    poster: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-educacao-personalizada',
  },
  {
    id: '4',
    slug: 'ia-clima-previsoes',
    title: 'IA melhora previsões climáticas em 40%',
    category: 'Meio Ambiente',
    poster: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-previsoes-climaticas',
  },
  {
    id: '5',
    slug: 'ia-seguranca-crimes',
    title: 'IA detecta fraudes financeiras em tempo real',
    category: 'Segurança',
    poster: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-detecta-fraudes',
  },
  {
    id: '6',
    slug: 'ia-agricultura-sustentavel',
    title: 'Agricultura 4.0: IA otimiza produção e reduz desperdício',
    category: 'Agronegócio',
    poster: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-agricultura-sustentavel',
  },
  {
    id: '7',
    slug: 'ia-arte-gerativa',
    title: 'Artistas usam IA para criar obras de arte únicas',
    category: 'Arte',
    poster: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-arte-gerativa',
  },
  {
    id: '8',
    slug: 'ia-transporte-autonomo',
    title: 'Veículos autônomos chegam às ruas de São Paulo',
    category: 'Mobilidade',
    poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'veiculos-autonomos-sp',
  },
  {
    id: '9',
    slug: 'ia-energia-renovavel',
    title: 'IA otimiza geração de energia solar e eólica',
    category: 'Energia',
    poster: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-energia-renovavel',
  },
  {
    id: '10',
    slug: 'ia-varejo-experiencia',
    title: 'Varejo usa IA para criar experiências personalizadas',
    category: 'Negócios',
    poster: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-varejo-personalizado',
  },
  {
    id: '11',
    slug: 'ia-traducao-tempo-real',
    title: 'Tradução simultânea com IA quebra barreiras linguísticas',
    category: 'Comunicação',
    poster: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'ia-traducao-tempo-real',
  },
  {
    id: '12',
    slug: 'ia-robotica-cirurgias',
    title: 'Robôs cirúrgicos com IA realizam operações complexas',
    category: 'Saúde',
    poster: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=700&fit=crop',
    duration: 30,
    articleSlug: 'robotica-cirurgica-ia',
  },
];

export const mockArticles: ArticleData[] = [
  {
    id: '1',
    slug: 'ia-revoluciona-diagnostico-medico',
    title: 'IA revoluciona diagnóstico médico com 95% de precisão',
    excerpt: 'Novo sistema de inteligência artificial supera médicos humanos na detecção precoce de doenças raras.',
    category: 'saude',
    author: {
      name: 'Dra. Ana Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 5,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    sources: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'openai-anuncia-gpt-5',
    title: 'OpenAI anuncia GPT-5 com capacidades surpreendentes',
    excerpt: 'Novo modelo de linguagem promete revolucionar a forma como interagimos com IA.',
    category: 'tecnologia',
    author: {
      name: 'Carlos Mendes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-14T15:30:00Z',
    readTime: 7,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    sources: 12,
  },
  {
    id: '3',
    slug: 'ia-educacao-personalizada',
    title: 'IA transforma educação com ensino personalizado',
    excerpt: 'Plataformas educacionais usam IA para adaptar conteúdo ao ritmo de cada estudante.',
    category: 'educacao',
    author: {
      name: 'Prof. João Santos',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-14T09:00:00Z',
    readTime: 6,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    sources: 5,
  },
  {
    id: '4',
    slug: 'ia-previsoes-climaticas',
    title: 'IA melhora previsões climáticas em 40%',
    excerpt: 'Modelos avançados de machine learning revolucionam meteorologia.',
    category: 'meio-ambiente',
    author: {
      name: 'Marina Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-13T11:20:00Z',
    readTime: 4,
    thumbnail: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
    sources: 9,
  },
  {
    id: '5',
    slug: 'ia-detecta-fraudes',
    title: 'Bancos usam IA para detectar fraudes em tempo real',
    excerpt: 'Sistema identifica transações suspeitas com 99.5% de precisão.',
    category: 'negocios',
    author: {
      name: 'Ricardo Almeida',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-13T14:45:00Z',
    readTime: 5,
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    sources: 7,
  },
  {
    id: '6',
    slug: 'ia-agricultura-sustentavel',
    title: 'Agricultura 4.0: IA otimiza produção e reduz desperdício',
    excerpt: 'Fazendas inteligentes aumentam produtividade em 30% com uso de IA.',
    category: 'meio-ambiente',
    author: {
      name: 'Pedro Oliveira',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-12T08:00:00Z',
    readTime: 6,
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    sources: 6,
  },
  {
    id: '7',
    slug: 'ia-arte-gerativa',
    title: 'Artistas usam IA para criar obras únicas',
    excerpt: 'Nova geração de artistas combina criatividade humana com IA generativa.',
    category: 'tecnologia',
    author: {
      name: 'Beatriz Lima',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-11T16:30:00Z',
    readTime: 5,
    thumbnail: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop',
    sources: 4,
  },
  {
    id: '8',
    slug: 'veiculos-autonomos-sp',
    title: 'São Paulo recebe primeiros veículos autônomos',
    excerpt: 'Frota de táxis autônomos começa operação em fase de testes na capital.',
    category: 'local',
    author: {
      name: 'Fernando Rocha',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
    },
    publishedAt: '2025-01-11T10:15:00Z',
    readTime: 7,
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    sources: 10,
  },
];

export const mockDossiers: DossierData[] = [
  {
    id: '1',
    slug: 'ia-na-saude',
    title: 'IA na Saúde: A Revolução Digital',
    description: 'Como a inteligência artificial está transformando diagnósticos, tratamentos e a medicina do futuro.',
    articlesCount: 12,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    slug: 'etica-ia',
    title: 'Ética e IA: Dilemas da Era Digital',
    description: 'Explorando questões éticas, vieses algorítmicos e o futuro da regulamentação de IA.',
    articlesCount: 8,
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop',
    updatedAt: '2025-01-12T14:00:00Z',
  },
];

export const mockNativeModules: NativeModuleData[] = [
  {
    id: '1',
    type: 'newsletter',
    title: 'Receba as últimas em IA',
    description: 'Notícias, análises e tendências direto no seu email. Toda semana.',
    ctaText: 'Assinar Newsletter',
  },
  {
    id: '2',
    type: 'follow',
    title: 'Siga IspiAI nas redes',
    description: 'Fique por dentro em tempo real. Conteúdo exclusivo e breaking news.',
    ctaText: 'Seguir no Twitter',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
  },
];
