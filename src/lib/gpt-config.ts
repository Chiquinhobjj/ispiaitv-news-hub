/**
 * Google Publisher Tag (GPT) Configuration
 * Centralizes all ad slot definitions, size mappings, and lazy load settings
 */

export interface AdSlotConfig {
  adUnit: string;
  sizes: googletag.GeneralSize;
  sizeMapping?: Array<{
    viewport: [number, number];
    sizes: googletag.GeneralSize;
  }>;
  minHeight: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
}

// Network Code from environment variable (see .env.example)
// Format: 8-digit number from Google Ad Manager (Admin → Global Settings)
const NETWORK_CODE = import.meta.env.VITE_GPT_NETWORK_CODE || "XXXXXX";

/**
 * Privacy Settings (GDPR/CCPA Compliance)
 * Set limitedAds: true to serve non-personalized ads when consent is not available
 */
export const PRIVACY_SETTINGS = {
  limitedAds: import.meta.env.VITE_GPT_LIMITED_ADS === 'true' || true
};

export const AD_SLOTS: Record<string, AdSlotConfig> = {
  top_leaderboard: {
    adUnit: `/${NETWORK_CODE}/ispiai/top_leaderboard`,
    sizes: [[970, 250], [728, 90], [320, 100], [320, 50]],
    sizeMapping: [
      { viewport: [1024, 0], sizes: [[970, 250], [728, 90]] },
      { viewport: [768, 0], sizes: [[728, 90], [320, 100]] },
      { viewport: [0, 0], sizes: [[320, 100], [320, 50]] }
    ],
    minHeight: {
      desktop: 250,
      tablet: 90,
      mobile: 100
    }
  },

  infeed_home: {
    adUnit: `/${NETWORK_CODE}/ispiai/infeed_home`,
    sizes: [[300, 250], [320, 250]],
    sizeMapping: [
      { viewport: [768, 0], sizes: [[300, 250]] },
      { viewport: [0, 0], sizes: [[320, 250]] }
    ],
    minHeight: {
      desktop: 250,
      tablet: 250,
      mobile: 250
    }
  },

  sticky_bottom_mobile: {
    adUnit: `/${NETWORK_CODE}/ispiai/sticky_bottom_mobile`,
    sizes: [[320, 50], [320, 100]],
    sizeMapping: [
      { viewport: [0, 0], sizes: [[320, 50], [320, 100]] }
    ],
    minHeight: {
      mobile: 50
    }
  },

  article_mid: {
    adUnit: `/${NETWORK_CODE}/ispiai/article_mid`,
    sizes: [[728, 90], [300, 250]],
    sizeMapping: [
      { viewport: [768, 0], sizes: [[728, 90], [300, 250]] },
      { viewport: [0, 0], sizes: [[300, 250]] }
    ],
    minHeight: {
      desktop: 250,
      tablet: 250,
      mobile: 250
    }
  },

  inarticle: {
    adUnit: `/${NETWORK_CODE}/ispiai/inarticle`,
    sizes: [[300, 250], [336, 280]],
    minHeight: {
      desktop: 280,
      tablet: 250,
      mobile: 250
    }
  },

  sidebar_mpu: {
    adUnit: `/${NETWORK_CODE}/ispiai/sidebar_mpu`,
    sizes: [[300, 250], [300, 600]],
    minHeight: {
      desktop: 250
    }
  }
};

/**
 * GPT Lazy Load Configuration
 * Optimized for news content
 * 
 * ❌ IMPORTANT: Do NOT use collapseEmptyDivs() - it conflicts with lazy-load
 * and can cause layout shifts. Use min-height instead for CLS prevention.
 */
export const LAZY_LOAD_CONFIG = {
  // Fetch ads when 25% of viewport away from being visible
  fetchMarginPercent: 25,
  // Render ads when 10% of viewport away from being visible
  renderMarginPercent: 10,
  // No scaling on mobile
  mobileScaling: 1.0
};

/**
 * Define a GPT slot with size mapping
 * @param config - Ad slot configuration
 * @returns GPT slot or null if failed
 * 
 * Note: Supports numbered slots (e.g., infeed_home_1, infeed_home_2)
 * The base slot name (infeed_home) will be used for configuration lookup
 */
export const defineSlotWithMapping = (
  divId: string,
  config: AdSlotConfig
): googletag.Slot | null => {
  if (!window.googletag) {
    console.error('[GPT] googletag not available');
    return null;
  }

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
    }
  });

  return slot;
};
