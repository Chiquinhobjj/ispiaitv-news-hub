import { useState, useEffect, useCallback, useRef } from 'react';
import { ShortData } from '@/lib/mock-data';

interface UseShortsControllerResult {
  currentIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  resetProgress: () => void;
}

/**
 * Controller hook for shorts playback with keyboard support
 */
export const useShortsController = (
  shorts: ShortData[],
  initialIndex: number = 0,
  onClose?: () => void
): UseShortsControllerResult => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentShort = shorts[currentIndex];

  // Auto-advance after duration
  useEffect(() => {
    if (!isPlaying || !currentShort) return;

    const duration = currentShort.duration * 1000; // Convert to ms
    const interval = 50; // Update progress every 50ms
    const increment = (interval / duration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          next();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex, isPlaying, currentShort]);

  const next = useCallback(() => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      setIsPlaying(true);
    } else {
      // Loop back to first or close
      onClose?.();
    }
  }, [currentIndex, shorts.length, onClose]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < shorts.length) {
      setCurrentIndex(index);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [shorts.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'Escape':
          e.preventDefault();
          onClose?.();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, togglePlay, toggleMute, onClose]);

  return {
    currentIndex,
    isPlaying,
    isMuted,
    progress,
    next,
    prev,
    goTo,
    togglePlay,
    toggleMute,
    resetProgress,
  };
};
