import { useState, useCallback } from 'react';
import { ArticleData } from '@/lib/mock-data';
import { DiscoverCard } from './DiscoverCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Skeleton } from '@/components/ui/skeleton';
import AdSlot from '@/components/AdSlot';

interface DiscoverGridProps {
  articles: ArticleData[];
  useMockAds?: boolean;
}

/**
 * Main discover grid with infinite scroll and in-feed ads
 */
export const DiscoverGrid = ({ articles, useMockAds = false }: DiscoverGridProps) => {
  const [displayedArticles, setDisplayedArticles] = useState(articles.slice(0, 12));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(articles.length > 12);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const currentLength = displayedArticles.length;
      const nextArticles = articles.slice(currentLength, currentLength + 9);
      
      if (nextArticles.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedArticles(prev => [...prev, ...nextArticles]);
      }
      
      setIsLoading(false);
    }, 500);
  }, [articles, displayedArticles.length, isLoading, hasMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore);

  return (
    <section className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article, index) => (
          <div key={article.id}>
            <DiscoverCard article={article} />
            
            {/* In-feed ad every 9 articles */}
            {(index + 1) % 9 === 0 && (
              <div className="mt-6">
                <AdSlot slotId={`infeed_${index}`} useMock={useMockAds} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Sentinel for infinite scroll */}
      {hasMore && <div ref={sentinelRef} className="h-20" />}

      {!hasMore && (
        <p className="text-center text-muted-foreground py-8">
          Você chegou ao fim. Continue explorando!
        </p>
      )}
    </section>
  );
};
