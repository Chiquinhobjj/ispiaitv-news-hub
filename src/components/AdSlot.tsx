import { useEffect, useRef } from "react";

interface AdSlotProps {
  slotId: string;
  minHeight?: string;
  className?: string;
}

const AdSlot = ({ slotId, minHeight = "250px", className = "" }: AdSlotProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google Publisher Tag initialization would go here
    // For now, we'll just prepare the structure
    console.log(`Ad slot initialized: ${slotId}`);
  }, [slotId]);

  return (
    <div 
      ref={adRef}
      className={`relative bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center ${className}`}
      style={{ minHeight }}
      data-ad-slot={slotId}
    >
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Publicidade</p>
        <p className="text-xs text-muted-foreground/50">{slotId}</p>
      </div>
    </div>
  );
};

export default AdSlot;
