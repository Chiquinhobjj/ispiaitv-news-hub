import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { ArticleData } from '@/lib/mock-data';
import { getCategoryConfig } from '@/lib/category-config';
import { Badge } from '@/components/ui/badge';

interface DiscoverCardProps {
  article: ArticleData;
}

/**
 * Individual card for the discover grid
 */
export const DiscoverCard = ({ article }: DiscoverCardProps) => {
  const categoryConfig = getCategoryConfig(article.category);
  const CategoryIcon = categoryConfig.icon;

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block bg-card rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <Badge
          className={`absolute top-3 left-3 ${categoryConfig.color} ${categoryConfig.textColor}`}
        >
          <CategoryIcon className="h-3 w-3 mr-1" />
          {article.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="heading-sm group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="body-sm text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
          <Clock className="h-3 w-3" />
          {article.readTime} min
        </div>
      </div>
    </Link>
  );
};
