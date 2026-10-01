'use client';

import { create } from 'zustand';

export type UiState = {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setMobileNavOpen: (open: boolean) => void;
};

/** Overlay state shared between the header, the search overlay and the nav. */
export const useUiStore = create<UiState>()((set) => ({
  searchOpen: false,
  mobileNavOpen: false,
  openSearch: () => set({ searchOpen: true, mobileNavOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
