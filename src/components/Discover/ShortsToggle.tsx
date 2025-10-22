import { useState, useEffect } from 'react';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShortsRail } from '@/components/Shorts/ShortsRail';
import { ShortData } from '@/lib/mock-data';

interface ShortsToggleProps {
  shorts: ShortData[];
}

/**
 * Collapsible shorts rail with toggle button
 */
export const ShortsToggle = ({ shorts }: ShortsToggleProps) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = localStorage.getItem('ispiai_shorts_expanded');
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ispiai_shorts_expanded', String(isExpanded));
  }, [isExpanded]);

  return (
    <section className="container py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          <h2 className="heading-md">Últimas em 30s</h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          {isExpanded ? (
            <>
              Ocultar <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Mostrar <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="animate-fade-in">
          <ShortsRail shorts={shorts} />
        </div>
      )}
    </section>
  );
};
