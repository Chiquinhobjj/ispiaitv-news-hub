import { useEffect } from "react";
import { LAZY_LOAD_CONFIG } from "@/lib/gpt-config";

/**
 * Initialize Google Publisher Tag (GPT) with best practices
 * - SRA (Single Request Architecture) for efficiency
 * - Lazy Load for performance and viewability
 * - Privacy settings for GDPR/CCPA compliance
 */
export const useGPT = () => {
  useEffect(() => {
    // Ensure googletag exists
    window.googletag = window.googletag || ({ cmd: [] } as any);

    let initialized = false;

    googletag.cmd.push(() => {
      // Prevent double initialization
      if (initialized) return;
      initialized = true;

      // 1. Enable Single Request Architecture (SRA)
      // Reduces latency and ensures proper roadblocking/competitive exclusions
      googletag.pubads().enableSingleRequest();

      // 2. Enable Lazy Load
      // Only fetch/render ads when they're near the viewport
      googletag.pubads().enableLazyLoad({
        fetchMarginPercent: LAZY_LOAD_CONFIG.fetchMarginPercent,
        renderMarginPercent: LAZY_LOAD_CONFIG.renderMarginPercent,
        mobileScaling: LAZY_LOAD_CONFIG.mobileScaling
      });

      // 3. Privacy Settings (GDPR/CCPA Compliance)
      // Enables non-personalized ads when consent is not available
      googletag.pubads().setPrivacySettings({
        limitedAds: true
      });

      // 4. Enable all GPT services
      googletag.enableServices();

      console.log("[GPT] Initialized with SRA + Lazy Load + Privacy Settings");
    });

    return () => {
      // Cleanup: destroy all slots on unmount
      googletag.cmd.push(() => {
        googletag.destroySlots();
      });
    };
  }, []);
};
