import { useState } from 'react';
import { ShortData } from '@/lib/mock-data';
import { ShortCard } from './ShortCard';
import { ShortPlayer } from './ShortPlayer';

interface ShortsRailProps {
  shorts: ShortData[];
}

/**
 * Horizontal scrollable rail of short videos
 */
export const ShortsRail = ({ shorts }: ShortsRailProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {shorts.map((short, index) => (
          <ShortCard
            key={short.id}
            short={short}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Short Player Modal */}
      {selectedIndex !== null && (
        <ShortPlayer
          shorts={shorts}
          initialIndex={selectedIndex}
          onClose={handleClose}
        />
      )}
    </>
  );
};
