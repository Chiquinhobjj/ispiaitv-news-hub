import type { ArticleData } from './mock-data';

export const mapArticleFromDB = (dbArticle: any): ArticleData => {
  return {
    id: dbArticle.id,
    slug: dbArticle.slug,
    title: dbArticle.title,
    excerpt: dbArticle.excerpt || '',
    thumbnail: dbArticle.thumbnail || '/placeholder.svg',
    imageUrl: dbArticle.thumbnail || '/placeholder.svg',
    category: dbArticle.category,
    author: {
      name: 'Redação IspiAI', // TODO: join com profiles
      avatar: '/placeholder.svg',
    },
    publishedAt: dbArticle.published_at || dbArticle.created_at,
    readTime: dbArticle.read_time || 5,
    sources: dbArticle.sources || 1,
  };
};
