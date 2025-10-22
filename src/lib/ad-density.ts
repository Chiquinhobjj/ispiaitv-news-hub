/**
 * Ad Density Calculator - Better Ads Standards Compliance
 * Ensures mobile ad density stays ≤30% of main content
 */

export interface AdDensityConfig {
  totalAdHeight: number;
  contentHeight: number;
  maxDensityPercent?: number;
}

export interface AdDensityResult {
  density: number;
  isCompliant: boolean;
  totalAdHeight: number;
  contentHeight: number;
  maxDensity: number;
}

/**
 * Calculate ad density percentage
 * @param config - Ad density configuration
 * @returns Density calculation result
 */
export const calculateAdDensity = (config: AdDensityConfig): AdDensityResult => {
  const { totalAdHeight, contentHeight, maxDensityPercent = 30 } = config;
  
  if (contentHeight === 0) {
    console.warn("[AdDensity] Content height is 0, returning 0% density");
    return {
      density: 0,
      isCompliant: true,
      totalAdHeight,
      contentHeight,
      maxDensity: maxDensityPercent
    };
  }

  const density = (totalAdHeight / contentHeight) * 100;
  const isCompliant = density <= maxDensityPercent;

  return {
    density,
    isCompliant,
    totalAdHeight,
    contentHeight,
    maxDensity: maxDensityPercent
  };
};

/**
 * Validate if ad density is within acceptable range
 * @param density - Current density percentage
 * @param maxPercent - Maximum allowed density (default: 30%)
 * @returns true if compliant
 */
export const validateAdDensity = (density: number, maxPercent: number = 30): boolean => {
  return density <= maxPercent;
};

/**
 * Get total ad height for a page
 * @param adSlotHeights - Array of ad slot heights in pixels
 * @returns Total height in pixels
 */
export const getTotalAdHeight = (adSlotHeights: number[]): number => {
  return adSlotHeights.reduce((sum, height) => sum + height, 0);
};

/**
 * Get content height (main element)
 * @returns Content height in pixels
 */
export const getContentHeight = (): number => {
  const mainElement = document.querySelector('main');
  return mainElement?.scrollHeight || 0;
};

/**
 * Log ad density warning if non-compliant (mobile only)
 * @param pageName - Name of the page for logging
 * @param adSlotHeights - Array of ad slot heights
 */
export const logAdDensityWarning = (pageName: string, adSlotHeights: number[]): void => {
  // Only check on mobile
  if (window.innerWidth >= 768) {
    return;
  }

  const totalAdHeight = getTotalAdHeight(adSlotHeights);
  const contentHeight = getContentHeight();
  
  const result = calculateAdDensity({
    totalAdHeight,
    contentHeight,
    maxDensityPercent: 30
  });

  if (!result.isCompliant) {
    console.warn(
      `[Better Ads] ${pageName}: Mobile ad density is ${result.density.toFixed(1)}% (max: 30%)\n` +
      `Total ad height: ${result.totalAdHeight}px\n` +
      `Content height: ${result.contentHeight}px\n` +
      `Recommendation: Reduce number of ad slots or increase content length`
    );
  } else {
    console.log(
      `[Better Ads] ${pageName}: Mobile ad density is ${result.density.toFixed(1)}% ✓`
    );
  }
};
