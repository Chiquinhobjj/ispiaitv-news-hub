import { useState, useEffect } from 'react';

/**
 * Hook to manage ad display mode (mock vs real)
 * - Auto: mock ads in dev, real ads in prod (if configured)
 * - Manual override via toggle in Header
 */
export const useAdMode = () => {
  const [useMockAds, setUseMockAds] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('ispiai_mock_ads');
    if (stored !== null) return stored === 'true';
    
    // Auto mode: use mocks in dev OR if GPT not configured
    const isDev = import.meta.env.DEV;
    const hasGPTConfig = !!import.meta.env.VITE_GPT_NETWORK_CODE;
    return isDev || !hasGPTConfig;
  });

  const toggleAdMode = () => {
    setUseMockAds(prev => {
      const newValue = !prev;
      localStorage.setItem('ispiai_mock_ads', String(newValue));
      return newValue;
    });
  };

  return { useMockAds, toggleAdMode };
};
