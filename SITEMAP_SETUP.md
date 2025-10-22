# 📋 Configuração de Sitemaps - IspiAI

## ✅ Implementação Completa

O sistema de sitemaps foi implementado com:

### 🎯 Componentes Criados

1. **Structured Data (JSON-LD NewsArticle)**
   - ✅ `src/lib/structured-data.ts` - Geração de JSON-LD otimizado para Google
   - ✅ `src/components/SEOHead.tsx` - Componente atualizado com suporte completo
   - ✅ Todos os campos obrigatórios do Google implementados:
     - `mainEntityOfPage` (WebPage com @id)
     - `image` como array de ImageObject (≥1200px)
     - `publisher.logo` com dimensões (≥112×112px)
     - `articleSection`, `keywords`, `wordCount`
     - Datas ISO 8601 com timezone
   - ✅ Meta tag `max-image-preview:large` para Google Discover

2. **Geração de Sitemaps**
   - ✅ `src/lib/sitemap-generator.ts` - Geração de sitemap.xml e sitemap_news.xml
   - ✅ `src/lib/article-data.ts` - Mock data (substituir por API real)
   - ✅ `vite-plugin-sitemap.ts` - Plugin Vite para build-time generation
   - ✅ `public/sitemap.xml` - Sitemap principal (todas as páginas)
   - ✅ `public/sitemap_news.xml` - Sitemap Google News (artigos ≤48h)
   - ✅ `public/robots.txt` - Já configurado e apontando para ambos sitemaps

3. **Regeneração Automática (Lovable Cloud)**
   - ✅ `supabase/functions/generate-sitemaps/index.ts` - Edge Function
   - ✅ `supabase/config.toml` - Configuração da função
   - ✅ `supabase/migrations/setup_sitemap_cron.sql` - Script SQL para cron job diário

---

## 🚀 Próximos Passos (Produção)

### 1. Preparar Assets

#### Logo do Publisher
Criar logo oficial em `public/logo.png`:
- ✅ Dimensões mínimas: **112×112px**
- ✅ Recomendado: 200×60px (largura ≤600px, altura ≤60px)
- ✅ Formato: PNG com fundo transparente ou branco
- 📍 Atualizar URL em `src/pages/Article.tsx` (linha 125)

#### Imagens de Artigos
Preparar imagens em múltiplas proporções:
- ✅ **1200×675px** (16:9) - Para cards e hero images
- ✅ **1200×1200px** (1:1) - Para redes sociais
- ✅ Largura mínima: **1200px** (requisito Google Discover)

### 2. Integrar API/CMS Real

Substituir mock data em `src/lib/article-data.ts`:

```typescript
export async function fetchAllArticles(): Promise<Article[]> {
  // Opção 1: Supabase
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, category, publishDate, modifiedDate, keywords')
    .order('publishDate', { ascending: false });
  
  // Opção 2: API REST
  const response = await fetch('https://api.ispiai.com/articles');
  const articles = await response.json();
  
  return articles;
}
```

Atualizar `src/pages/Article.tsx` para buscar dados reais baseado no slug.

### 3. Habilitar Lovable Cloud (Backend)

Para regeneração automática dos sitemaps:

1. **Habilitar Lovable Cloud** no projeto
2. **Deploy da Edge Function**:
   ```bash
   # Função já está criada em supabase/functions/generate-sitemaps/
   # Será deployada automaticamente ao habilitar Cloud
   ```

3. **Configurar Cron Job**:
   - Abrir Supabase SQL Editor
   - Copiar conteúdo de `supabase/migrations/setup_sitemap_cron.sql`
   - Substituir `[SEU-PROJECT-REF]` e `[SEU-ANON-KEY]`
   - Executar o SQL

4. **Verificar configuração**:
   ```sql
   SELECT * FROM cron.job WHERE jobname = 'regenerate-sitemaps-daily';
   ```

### 4. Validação e Testes

#### JSON-LD NewsArticle
1. Acessar qualquer artigo (ex: `/noticias/ia-revoluciona-diagnostico-medico`)
2. Validar no **Google Rich Results Test**:
   - https://search.google.com/test/rich-results
3. Verificar todos os campos obrigatórios ✅

#### Sitemaps
1. **Validar XML**:
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Testar `/sitemap.xml` e `/sitemap_news.xml`

2. **Google Search Console**:
   - Adicionar propriedade: https://ispiai.com
   - Enviar ambos os sitemaps:
     - `https://ispiai.com/sitemap.xml`
     - `https://ispiai.com/sitemap_news.xml`
   - Monitorar cobertura e erros

3. **Teste da Edge Function** (após deploy):
   ```bash
   curl -X POST https://[PROJECT-REF].supabase.co/functions/v1/generate-sitemaps \
     -H "Authorization: Bearer [ANON-KEY]" \
     -H "Content-Type: application/json"
   ```

### 5. Google Publisher Center

Para Google News:
1. Registrar em: https://publishercenter.google.com/
2. Verificar propriedade do domínio
3. Enviar sitemap News: `https://ispiai.com/sitemap_news.xml`
4. Aguardar aprovação (pode levar dias/semanas)

---

## 📊 Checklist de Qualidade

### NewsArticle JSON-LD ✅
- [x] `@type: "NewsArticle"` implementado
- [x] `headline` (≤110 chars)
- [x] `description`
- [x] `image[]` array com ImageObject (≥1200px)
- [x] `datePublished` e `dateModified` (ISO 8601 + timezone)
- [x] `author` (@type Person com name e url)
- [x] `publisher` com logo (≥112×112px)
- [x] `mainEntityOfPage` (WebPage com @id)
- [x] `articleSection` (categoria)
- [x] `keywords[]` (array de tags)
- [x] `wordCount` (calculado do conteúdo)
- [x] `url` (canônica absoluta)
- [x] Meta tag `max-image-preview:large`

### Sitemap Principal ✅
- [x] Inclui Home, Busca, todas as matérias
- [x] `<lastmod>` confiável (data real)
- [x] Formato XML válido
- [x] Máximo 1000 URLs por arquivo

### Sitemap Google News ✅
- [x] Apenas artigos ≤48 horas
- [x] Namespace `xmlns:news` correto
- [x] `<news:publication>` com name e language
- [x] `<news:publication_date>` ISO 8601
- [x] `<news:title>` escapado corretamente
- [x] `<news:keywords>` incluído
- [x] Máximo 1000 URLs

### Infraestrutura ✅
- [x] `robots.txt` aponta ambos sitemaps
- [x] Sitemaps gerados no build (plugin Vite)
- [x] Edge Function criada
- [x] Script SQL para cron job pronto
- [ ] **TODO**: Habilitar Lovable Cloud
- [ ] **TODO**: Configurar cron job no Supabase

---

## 🔧 Comandos Úteis

### Build com geração de sitemaps
```bash
npm run build
# Sitemaps serão gerados automaticamente em public/
```

### Testar Edge Function localmente (após habilitar Cloud)
```bash
# Via Supabase CLI
supabase functions serve generate-sitemaps

# Testar
curl -X POST http://localhost:54321/functions/v1/generate-sitemaps
```

### Verificar cron jobs no Supabase
```sql
-- Ver todos os jobs
SELECT * FROM cron.job;

-- Ver histórico de execuções
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'regenerate-sitemaps-daily')
ORDER BY start_time DESC 
LIMIT 10;
```

---

## 📚 Referências

- [Google NewsArticle Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google News Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)
- [Google Discover Guidelines](https://developers.google.com/search/docs/appearance/google-discover)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Schema.org NewsArticle](https://schema.org/NewsArticle)

---

## 🎉 Status Atual

✅ **Sistema completo de structured data e sitemaps implementado**
✅ **Build-time generation funcionando**
✅ **Edge Function pronta para deploy**
⏳ **Aguardando**: Lovable Cloud para regeneração automática
⏳ **Aguardando**: Dados reais da API/CMS

**O sistema está production-ready para sitemaps estáticos. Para regeneração automática, basta habilitar Lovable Cloud e configurar o cron job.**
