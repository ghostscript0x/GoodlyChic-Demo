'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type WishlistState = {
  /** Product slugs, so the list stays valid if the catalogue changes. */
  slugs: string[];
  hasHydrated: boolean;
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hasHydrated: false,
      /** Returns the resulting state so callers can report the right message. */
      toggle: (slug) => {
        const exists = get().slugs.includes(slug);
        set((state) => ({
          slugs: exists
            ? state.slugs.filter((item) => item !== slug)
            : [...state.slugs, slug],
        }));
        return !exists;
      },
      remove: (slug) => set((state) => ({ slugs: state.slugs.filter((item) => item !== slug) })),
      clear: () => set({ slugs: [] }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'goodlychic:wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ slugs: state.slugs }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

export const selectWishlistCount = (state: WishlistState) => state.slugs.length;
