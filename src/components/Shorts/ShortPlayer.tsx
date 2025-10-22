import { useNavigate } from 'react-router-dom';
import { X, Volume2, VolumeX, Play, Pause, ExternalLink } from 'lucide-react';
import { ShortData } from '@/lib/mock-data';
import { useShortsController } from '@/hooks/useShortsController';
import { ProgressDots } from './ProgressDots';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ShortPlayerProps {
  shorts: ShortData[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Full-screen short player with navigation controls
 */
export const ShortPlayer = ({ shorts, initialIndex, onClose }: ShortPlayerProps) => {
  const navigate = useNavigate();
  const {
    currentIndex,
    isPlaying,
    isMuted,
    progress,
    next,
    prev,
    togglePlay,
    toggleMute,
  } = useShortsController(shorts, initialIndex, onClose);

  const currentShort = shorts[currentIndex];

  const handleAprofundar = () => {
    navigate(`/article/${currentShort.articleSlug}`);
    onClose();
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 3) {
      prev();
    } else if (x > (width * 2) / 3) {
      next();
    } else {
      togglePlay();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] h-[80vh] md:h-[90vh] p-0 bg-black overflow-hidden z-50">
        <div className="relative w-full h-full">
          {/* Poster/Video Container */}
          <div
            className="absolute inset-0 cursor-pointer select-none"
            onClick={handleTap}
          >
            <img
              src={currentShort.poster}
              alt={currentShort.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

            {/* Play/Pause indicator (center) */}
            {!isPlaying && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Top Bar - Progress + Close */}
          <div className="absolute top-0 left-0 right-0 p-4 space-y-3 z-10">
            <div className="flex items-center justify-between">
              <ProgressDots
                total={shorts.length}
                current={currentIndex}
                progress={progress}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="ml-2 h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>
          </div>

          {/* Bottom Bar - Content + Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 z-10">
            {/* Category Badge */}
            <Badge variant="secondary" className="label">
              {currentShort.category}
            </Badge>

            {/* Title */}
            <h2 className="heading-md text-white leading-tight">
              {currentShort.title}
            </h2>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Aprofundar CTA */}
              <Button
                onClick={handleAprofundar}
                className="flex-1 bg-white text-black hover:bg-white/90"
              >
                Aprofundar
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>

              {/* Play/Pause */}
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlay}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
                <span className="sr-only">{isPlaying ? 'Pausar' : 'Reproduzir'}</span>
              </Button>

              {/* Mute/Unmute */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMute}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                <span className="sr-only">{isMuted ? 'Ativar som' : 'Desativar som'}</span>
              </Button>
            </div>

            {/* Navigation hint */}
            <p className="text-xs text-white/60 text-center">
              ← Toque nas laterais para navegar | Espaço para pausar | Esc para fechar →
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
