import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface RelatedArticle {
  slug: string;
  title: string;
  image?: string;
  category?: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-4">
      <h3 className="font-bold text-2xl">Leia também</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <Link 
            key={article.slug} 
            to={`/noticias/${article.slug}`}
            className="group"
          >
            <Card className="overflow-hidden h-full transition-smooth hover:shadow-md hover:border-primary/50">
              {article.image && (
                <div className="aspect-video bg-muted overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-4 space-y-2">
                {article.category && (
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {article.category}
                  </span>
                )}
                
                <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-smooth">
                  {article.title}
                </h4>
                
                <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                  Ler mais
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
