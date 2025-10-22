import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';
import { ArticleData } from '@/lib/mock-data';
import { getCategoryConfig } from '@/lib/category-config';
import { Badge } from '@/components/ui/badge';

interface HeroArticleProps {
  article: ArticleData;
}

/**
 * Hero article component - large featured article at the top
 */
export const HeroArticle = ({ article }: HeroArticleProps) => {
  const categoryConfig = getCategoryConfig(article.category);
  const CategoryIcon = categoryConfig.icon;

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block relative overflow-hidden rounded-xl bg-card hover:shadow-elevated transition-all duration-300"
    >
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-4">
          <Badge
            className={`${categoryConfig.color} ${categoryConfig.textColor} w-fit`}
          >
            <CategoryIcon className="h-3 w-3 mr-1" />
            {article.category}
          </Badge>

          <h1 className="heading-lg group-hover:text-primary transition-colors">
            {article.title}
          </h1>

          <p className="body-lg text-muted-foreground line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {article.sources} fontes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
