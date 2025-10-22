export interface Article {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  modifiedDate: string;
  keywords?: string[];
}

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq?: string;
  priority?: number;
}

const SITE_URL = "https://ispiai.com";
const SITEMAP_LIMIT = 1000;

/**
 * Gera sitemap.xml principal
 * Inclui: Home, páginas estáticas, todas as matérias
 */
export function generateMainSitemap(articles: Article[]): string {
  const urls: SitemapURL[] = [
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
      lastmod: article.modifiedDate,
      changefreq: "weekly",
      priority: 0.8
    });
  });

  if (urls.length > SITEMAP_LIMIT) {
    console.warn(`Sitemap excede ${SITEMAP_LIMIT} URLs. Considere particionar.`);
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

/**
 * Gera sitemap_news.xml (Google News)
 * APENAS artigos publicados nas últimas 48 horas
 * Limite: 1000 URLs
 */
export function generateNewsSitemap(articles: Article[]): string {
  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  const recentArticles = articles.filter(article => {
    const publishDate = new Date(article.publishDate);
    return publishDate >= fortyEightHoursAgo;
  });

  const limitedArticles = recentArticles.slice(0, SITEMAP_LIMIT);

  if (recentArticles.length > SITEMAP_LIMIT) {
    console.error(`News sitemap excede ${SITEMAP_LIMIT} URLs. Particionando.`);
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
      <news:publication_date>${article.publishDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      ${article.keywords && article.keywords.length > 0 ? `<news:keywords>${escapeXml(article.keywords.join(', '))}</news:keywords>` : ''}
    </news:news>
  </url>`).join('\n')}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
