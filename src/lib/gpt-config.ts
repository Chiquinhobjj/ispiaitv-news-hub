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

// Replace XXXXXX with your Google Ad Manager Network Code
// Example: /12345678/ispiai/top_leaderboard
const NETWORK_CODE = "XXXXXX";

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
 */
export const LAZY_LOAD_CONFIG = {
  // Fetch ads when 25% of viewport away from being visible
  fetchMarginPercent: 25,
  // Render ads when 10% of viewport away from being visible
  renderMarginPercent: 10,
  // No scaling on mobile
  mobileScaling: 1.0
};
