import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Article {
  slug: string;
  title: string;
  category: string;
  publish_date: string;
  modified_date: string;
  keywords?: string[];
}

const SITE_URL = "https://ispiai.com";
const SITEMAP_LIMIT = 1000;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateMainSitemap(articles: Article[]): string {
  const urls = [
    {
      loc: SITE_URL,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0
    },
    {
      loc: `${SITE_URL}/busca`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.5
    }
  ];

  articles.forEach(article => {
    urls.push({
      loc: `${SITE_URL}/noticias/${article.slug}`,
      lastmod: article.modified_date,
      changefreq: "weekly",
      priority: 0.8
    });
  });

  if (urls.length > SITEMAP_LIMIT) {
    console.warn(`Sitemap excede ${SITEMAP_LIMIT} URLs`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;
}

function generateNewsSitemap(articles: Article[]): string {
  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  const recentArticles = articles.filter(article => {
    const publishDate = new Date(article.publish_date);
    return publishDate >= fortyEightHoursAgo;
  });

  const limitedArticles = recentArticles.slice(0, SITEMAP_LIMIT);

  if (recentArticles.length > SITEMAP_LIMIT) {
    console.error(`News sitemap excede ${SITEMAP_LIMIT} URLs`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${limitedArticles.map(article => `  <url>
    <loc>${SITE_URL}/noticias/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>IspiAI</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${article.publish_date}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      ${article.keywords && article.keywords.length > 0 ? `<news:keywords>${escapeXml(article.keywords.join(', '))}</news:keywords>` : ''}
    </news:news>
  </url>`).join('\n')}
</urlset>`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🗺️  Iniciando geração de sitemaps...');

    // TODO: Substituir por query real do Supabase quando o banco estiver configurado
    // const { data: articles, error } = await supabaseClient
    //   .from('articles')
    //   .select('slug, title, category, publish_date, modified_date, keywords')
    //   .order('publish_date', { ascending: false });

    // Mock data para exemplo
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 47 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const articles: Article[] = [
      {
        slug: "ia-revoluciona-diagnostico-medico",
        title: "Inteligência Artificial revoluciona diagnóstico médico no Brasil",
        category: "Tecnologia",
        publish_date: yesterday.toISOString(),
        modified_date: now.toISOString(),
        keywords: ["inteligência artificial", "saúde", "startups", "brasil"]
      },
      {
        slug: "algoritmos-reconhecimento-facial-discriminacao",
        title: "Algoritmos de reconhecimento facial e casos de discriminação aumentam 40%",
        category: "Sociedade",
        publish_date: twoDaysAgo.toISOString(),
        modified_date: twoDaysAgo.toISOString(),
        keywords: ["reconhecimento facial", "discriminação", "privacidade"]
      },
      {
        slug: "startup-brasileira-levanta-milhoes",
        title: "Startup brasileira de IA levanta R$ 50 milhões em rodada Série A",
        category: "Negócios",
        publish_date: weekAgo.toISOString(),
        modified_date: weekAgo.toISOString(),
        keywords: ["startups", "investimentos", "brasil"]
      }
    ];

    // Gerar sitemaps
    const mainSitemap = generateMainSitemap(articles);
    const newsSitemap = generateNewsSitemap(articles);

    // TODO: Salvar no Supabase Storage quando configurado
    // const { error: mainError } = await supabaseClient.storage
    //   .from('sitemaps')
    //   .upload('sitemap.xml', mainSitemap, { 
    //     contentType: 'application/xml',
    //     upsert: true 
    //   });

    // const { error: newsError } = await supabaseClient.storage
    //   .from('sitemaps')
    //   .upload('sitemap_news.xml', newsSitemap, { 
    //     contentType: 'application/xml',
    //     upsert: true 
    //   });

    const newsArticlesCount = articles.filter(a => {
      const now = new Date();
      const publishDate = new Date(a.publish_date);
      return now.getTime() - publishDate.getTime() <= 48 * 60 * 60 * 1000;
    }).length;

    console.log('✓ Sitemaps gerados com sucesso');
    console.log(`  - Total de artigos: ${articles.length}`);
    console.log(`  - Artigos no news sitemap (≤48h): ${newsArticlesCount}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        articlesCount: articles.length,
        newsArticlesCount: newsArticlesCount,
        timestamp: new Date().toISOString(),
        sitemaps: {
          main: mainSitemap,
          news: newsSitemap
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Erro ao gerar sitemaps:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
