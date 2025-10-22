import { useEffect } from "react";
import { generateNewsArticleJsonLd, type NewsArticleData } from "@/lib/structured-data";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  article?: NewsArticleData;
  canonical?: string;
}

const SEOHead = ({ title, description, image, article, canonical }: SEOHeadProps) => {
  useEffect(() => {
    // Update title
    document.title = `${title} | IspiAI`;
    
    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "robots", content: "max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: article ? "article" : "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];

    if (image) {
      metaTags.push(
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:image", content: image }
      );
    }

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement("meta");
        if (name) element.setAttribute("name", name);
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    });

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // JSON-LD for NewsArticle
    let jsonLdScript: HTMLScriptElement | null = null;
    
    if (article) {
      const jsonLd = generateNewsArticleJsonLd(article);
      
      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.id = "newsarticle-jsonld";
      jsonLdScript.text = JSON.stringify(jsonLd, null, 2);
      document.head.appendChild(jsonLdScript);
    }

    // Cleanup
    return () => {
      if (jsonLdScript && document.head.contains(jsonLdScript)) {
        document.head.removeChild(jsonLdScript);
      }
    };
  }, [title, description, image, article, canonical]);

  return null;
};

export default SEOHead;
