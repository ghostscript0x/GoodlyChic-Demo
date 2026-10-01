'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const MAX_RECENT = 5;

export type SearchState = {
  recent: string[];
  hasHydrated: boolean;
  remember: (term: string) => void;
  clear: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recent: [],
      hasHydrated: false,
      remember: (term) => {
        const value = term.trim();
        if (value.length < 2) return;
        set((state) => ({
          recent: [value, ...state.recent.filter((item) => item.toLowerCase() !== value.toLowerCase())]
            .slice(0, MAX_RECENT),
        }));
      },
      clear: () => set({ recent: [] }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'goodlychic:recent-searches',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ recent: state.recent }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
