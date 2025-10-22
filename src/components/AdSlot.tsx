import { useEffect, useRef, useState } from "react";
import { AD_SLOTS, type AdSlotConfig } from "@/lib/gpt-config";
import { MockAd } from "./MockAd";

interface AdSlotProps {
  slotId: string;
  className?: string;
  useMock?: boolean;
}

const AdSlot = ({ slotId, className = "", useMock = false }: AdSlotProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(250);
  const divId = `div-gpt-ad-${slotId}`;

  // Get configuration for this slot
  const getSlotConfig = (): AdSlotConfig | undefined => {
    // Handle numbered slots (e.g., infeed_home_1 → infeed_home)
    const baseSlotId = slotId.replace(/_\d+$/, "");
    return AD_SLOTS[baseSlotId];
  };

  // Calculate responsive min-height
  const calculateMinHeight = (config: AdSlotConfig): number => {
    const width = window.innerWidth;
    
    if (width >= 1024 && config.minHeight.desktop) {
      return config.minHeight.desktop;
    }
    if (width >= 768 && config.minHeight.tablet) {
      return config.minHeight.tablet;
    }
    return config.minHeight.mobile || config.minHeight.desktop || 250;
  };

  useEffect(() => {
    const config = getSlotConfig();
    if (!config) {
      console.warn(`[AdSlot] No configuration found for slot: ${slotId}`);
      return;
    }

    // Validate min-height configuration (CLS safety)
    if (!config.minHeight.desktop && !config.minHeight.tablet && !config.minHeight.mobile) {
      console.error(`[AdSlot] ${slotId}: Missing min-height configuration (CLS risk!)`);
    }

    // Set initial min-height
    setMinHeight(calculateMinHeight(config));

    // Handle window resize
    const handleResize = () => {
      setMinHeight(calculateMinHeight(config));
    };
    window.addEventListener("resize", handleResize);

    // Initialize GPT slot
    window.googletag = window.googletag || ({ cmd: [] } as any);
    
    let slot: googletag.Slot | null = null;

    googletag.cmd.push(() => {
      // Build size mapping if provided
      let sizeMapping = null;
      if (config.sizeMapping && config.sizeMapping.length > 0) {
        const mapping = googletag.sizeMapping();
        config.sizeMapping.forEach(({ viewport, sizes }) => {
          mapping.addSize(viewport, sizes);
        });
        sizeMapping = mapping.build();
      }

      // Define slot
      slot = googletag.defineSlot(config.adUnit, config.sizes, divId);
      
      if (slot) {
        if (sizeMapping) {
          slot.defineSizeMapping(sizeMapping);
        }
        slot.addService(googletag.pubads());

        // Display the ad
        googletag.display(divId);

        console.log(`[AdSlot] Initialized: ${slotId} (${config.adUnit})`);
      }
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (slot) {
        googletag.cmd.push(() => {
          googletag.destroySlots([slot!]);
        });
      }
    };
  }, [slotId, useMock]);

  // Render mock ad if useMock is true
  if (useMock) {
    const mockSize = slotId.includes('leaderboard') 
      ? 'leaderboard' 
      : slotId.includes('sticky') 
        ? 'mobile' 
        : 'rectangle';
    
    const mockVariant = slotId === 'top_leaderboard' 
      ? 1 
      : slotId === 'infeed_home_1' 
        ? 2 
        : slotId === 'infeed_home_2' 
          ? 4 
          : slotId === 'sidebar_mpu_1' 
            ? 3 
            : slotId === 'sidebar_mpu_2' 
              ? 5 
              : 2;

    return (
      <div className={className}>
        <div className="text-center mb-2">
          <span className="text-xs text-muted-foreground font-medium">
            Publicidade
          </span>
        </div>
        <MockAd size={mockSize} variant={mockVariant as any} />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Ad label */}
      <div className="text-center mb-2">
        <span className="text-xs text-muted-foreground font-medium">
          Publicidade
        </span>
      </div>

      {/* Ad container with CLS prevention */}
      <div 
        ref={adRef}
        id={divId}
        style={{ minHeight: `${minHeight}px` }}
        aria-label={`Publicidade - ${slotId.replace(/_/g, ' ')}`}
        className="relative bg-muted/10 border border-dashed border-border/50 rounded-lg flex items-center justify-center overflow-hidden"
      >
        {/* Placeholder text (will be replaced by actual ad) */}
        <div className="text-center space-y-1 opacity-40">
          <p className="text-xs text-muted-foreground">{slotId}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Validate if an ad slot configuration has proper min-height
 * @param config - Ad slot configuration
 * @returns true if valid
 */
export const validateAdSlotConfig = (config: AdSlotConfig): boolean => {
  return !!(config.minHeight.desktop || config.minHeight.tablet || config.minHeight.mobile);
};

export default AdSlot;
