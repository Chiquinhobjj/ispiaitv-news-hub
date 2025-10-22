import { Play, Clock } from 'lucide-react';
import { ShortData } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

interface ShortCardProps {
  short: ShortData;
  onClick: () => void;
}

/**
 * Individual short card with 9:16 portrait aspect ratio
 */
export const ShortCard = ({ short, onClick }: ShortCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-muted hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`Assistir: ${short.title}`}
    >
      {/* Poster Image */}
      <img
        src={short.poster}
        alt={short.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Play Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
          <Play className="h-8 w-8 text-black ml-1" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        {/* Category Badge */}
        <Badge variant="secondary" className="label">
          {short.category}
        </Badge>

        {/* Title */}
        <h3 className="heading-xs text-white text-left line-clamp-2">
          {short.title}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-1 text-white/80 text-xs">
          <Clock className="h-3 w-3" />
          <span>{short.duration}s</span>
        </div>

        {/* CTA - Visible on mobile, hover on desktop */}
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <div className="text-xs text-white/90 font-medium border border-white/30 rounded-full px-3 py-1 backdrop-blur-sm bg-white/10 inline-block">
            Aprofundar →
          </div>
        </div>
      </div>
    </button>
  );
};
