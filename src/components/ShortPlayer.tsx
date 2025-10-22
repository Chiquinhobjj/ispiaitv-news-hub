import { useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShortPlayerProps {
  videoUrl: string;
  title: string;
  captions?: string;
}

const ShortPlayer = ({ videoUrl, title, captions }: ShortPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative aspect-[9/16] max-h-[600px] w-full max-w-[340px] mx-auto bg-black rounded-xl overflow-hidden shadow-elegant group">
      {/* Video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="text-white/50 text-sm">Video: {title}</span>
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-smooth">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Captions */}
          {captions && (
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-white text-sm text-center">{captions}</p>
            </div>
          )}

          {/* Title */}
          <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortPlayer;
