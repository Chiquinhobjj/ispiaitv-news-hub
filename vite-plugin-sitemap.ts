import type { Plugin } from 'vite';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { generateMainSitemap, generateNewsSitemap } from './src/lib/sitemap-generator';
import { fetchAllArticles } from './src/lib/article-data';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    async closeBundle() {
      console.log('🗺️  Gerando sitemaps...');
      
      try {
        const articles = await fetchAllArticles();
        
        // Gerar sitemap.xml
        const mainSitemap = generateMainSitemap(articles);
        writeFileSync(
          resolve(process.cwd(), 'public/sitemap.xml'),
          mainSitemap,
          'utf-8'
        );
        console.log('✓ sitemap.xml gerado com sucesso');
        
        // Gerar sitemap_news.xml
        const newsSitemap = generateNewsSitemap(articles);
        writeFileSync(
          resolve(process.cwd(), 'public/sitemap_news.xml'),
          newsSitemap,
          'utf-8'
        );
        console.log('✓ sitemap_news.xml gerado com sucesso');
      } catch (error) {
        console.error('❌ Erro ao gerar sitemaps:', error);
      }
    }
  };
}
