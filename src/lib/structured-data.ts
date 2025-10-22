// Publisher Logo Configuration (Google News requirements)
export const PUBLISHER_LOGO_CONFIG = {
  "@type": "ImageObject" as const,
  url: "https://ispiai.com/logo.png",
  width: 800,
  height: 267
};

interface NewsArticleImageObject {
  "@type": "ImageObject";
  url: string;
  width: number;
  height: number;
}

interface NewsArticleAuthor {
  "@type": "Person";
  name: string;
  url?: string;
}

interface PublisherLogo {
  "@type": "ImageObject";
  url: string;
  width: number;
  height: number;
}

export interface NewsArticleData {
  headline: string;
  description: string;
  images: NewsArticleImageObject[];
  datePublished: string;
  dateModified: string;
  author: NewsArticleAuthor;
  publisher?: {
    name: string;
    logo?: PublisherLogo;
  };
  articleSection: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
}

export function generateNewsArticleJsonLd(data: NewsArticleData) {
  // Validações críticas
  if (!data.images.length) {
    console.error("NewsArticle: Nenhuma imagem fornecida");
  }
  
  if (data.images.some(img => img.width < 1200)) {
    console.warn("NewsArticle: Imagem com largura <1200px pode ter preview pequeno no Google Discover");
  }

  const publisherLogo = data.publisher?.logo || PUBLISHER_LOGO_CONFIG;
  
  if (publisherLogo.width < 112 || publisherLogo.height < 112) {
    console.error("NewsArticle: Logo do publisher deve ter no mínimo 112x112px");
  }

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": data.headline,
    "description": data.description,
    "image": data.images,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "author": {
      "@type": "Person",
      "name": data.author.name,
      ...(data.author.url && { "url": data.author.url })
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisher?.name || "IspiAI",
      "logo": publisherLogo
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "articleSection": data.articleSection,
    "url": data.url,
    ...(data.keywords && data.keywords.length > 0 && { "keywords": data.keywords }),
    ...(data.wordCount && { "wordCount": data.wordCount })
  };
}
