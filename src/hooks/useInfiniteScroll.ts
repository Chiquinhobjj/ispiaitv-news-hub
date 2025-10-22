import { useEffect, useRef } from 'react';

/**
 * Hook for implementing infinite scroll with Intersection Observer
 * @param loadMore - Callback function to load more items
 * @param hasMore - Whether there are more items to load
 */
export const useInfiniteScroll = (
  loadMore: () => void,
  hasMore: boolean = true
) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before reaching sentinel
        threshold: 0.1,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [loadMore, hasMore]);

  return { sentinelRef };
};
