import { useState } from 'react';

export type Filter = 'para-voce' | 'local' | 'tecnologia' | 'saude' | 'negocios' | 'educacao' | 'meio-ambiente';

export interface PersonalizationState {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
}

/**
 * Hook for managing personalization state (topic filters)
 */
export const usePersonalization = (): PersonalizationState => {
  const [activeFilter, setActiveFilter] = useState<Filter>('para-voce');

  return {
    activeFilter,
    setActiveFilter,
  };
};
