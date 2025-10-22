import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { ArticleData } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

interface ArticleTeaserProps {
  article: ArticleData;
}

export const ArticleTeaser = ({ article }: ArticleTeaserProps) => {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block bg-card rounded-lg overflow-hidden hover:shadow-hover transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="md:flex">
        {/* Thumbnail */}
        <div className="md:w-72 aspect-video md:aspect-square overflow-hidden flex-shrink-0">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex-1">
          <Badge variant="secondary" className="mb-2">{article.category}</Badge>
          
          <h3 className="heading-xs line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          
          <p className="body-sm text-muted-foreground line-clamp-3 mb-4 hidden md:block">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
