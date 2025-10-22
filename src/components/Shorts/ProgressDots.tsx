interface ProgressDotsProps {
  total: number;
  current: number;
  progress: number;
}

/**
 * Progress indicator dots for shorts navigation
 */
export const ProgressDots = ({ total, current, progress }: ProgressDotsProps) => {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden"
        >
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{
              width: index === current ? `${progress}%` : index < current ? '100%' : '0%',
            }}
          />
        </div>
      ))}
    </div>
  );
};
