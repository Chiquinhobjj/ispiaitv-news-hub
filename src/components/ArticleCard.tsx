import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  publishDate: string;
  featured?: boolean;
}

const ArticleCard = ({ 
  slug, 
  title, 
  excerpt, 
  image, 
  category, 
  publishDate,
  featured = false 
}: ArticleCardProps) => {
  return (
    <Link to={`/noticias/${slug}`} className="group">
      <Card className={`overflow-hidden h-full transition-smooth hover:shadow-lg hover:border-primary/50 ${
        featured ? 'md:flex md:flex-row' : ''
      }`}>
        {image && (
          <div className={`bg-muted overflow-hidden ${
            featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'
          }`}>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            />
          </div>
        )}
        
        <div className={`p-6 space-y-3 ${featured ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
          {category && (
            <span className="inline-block text-xs font-medium text-accent uppercase tracking-wide">
              {category}
            </span>
          )}
          
          <h3 className={`font-bold group-hover:text-primary transition-smooth ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <time dateTime={publishDate}>{publishDate}</time>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
