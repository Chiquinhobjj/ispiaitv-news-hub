import { useState, useCallback } from 'react';
import { ArticleTeaser } from './ArticleTeaser';
import { AdInfeed } from './AdInfeed';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { mockArticles } from '@/lib/mock-data';
import { Filter } from '@/hooks/usePersonalization';

interface FeedListProps {
  filter: Filter;
  useMockAds?: boolean;
}

export const FeedList = ({ filter, useMockAds = false }: FeedListProps) => {
  const [displayedArticles, setDisplayedArticles] = useState(mockArticles.slice(0, 8));
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    const currentLength = displayedArticles.length;
    const nextArticles = mockArticles.slice(currentLength, currentLength + 4);
    
    if (nextArticles.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedArticles(prev => [...prev, ...nextArticles]);
  }, [displayedArticles.length]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {displayedArticles.map((article, index) => (
          <div key={article.id}>
            <ArticleTeaser article={article} />
            
            {/* Insert ad every 6-8 articles */}
            {(index + 1) % 7 === 0 && (
              <AdInfeed position={Math.floor((index + 1) / 7)} useMock={useMockAds} />
            )}
          </div>
        ))}

        {/* Sentinel for infinite scroll */}
        {hasMore && <div ref={sentinelRef} className="h-20" />}
      </div>
    </div>
  );
};
