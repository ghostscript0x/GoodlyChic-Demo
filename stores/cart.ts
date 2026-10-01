'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartLine, ColourName, Product } from '@/lib/types';

const lineIdFor = (slug: string, size: string, colour: string) => `${slug}::${size}::${colour}`;

export type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  /** True once the persisted state has been read on the client. */
  hasHydrated: boolean;
  /** Name of the last item added, used for the drawer's confirmation line. */
  lastAdded: string | null;
  add: (input: {
    product: Product;
    size: string;
    colour: ColourName;
    quantity?: number;
  }) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setHasHydrated: (value: boolean) => void;
  clearLastAdded: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      hasHydrated: false,
      lastAdded: null,

      add: ({ product, size, colour, quantity = 1 }) =>
        set((state) => {
          const lineId = lineIdFor(product.slug, size, colour);
          const stock = product.inventory[size] ?? 0;
          const existing = state.lines.find((line) => line.lineId === lineId);
          const lines = existing
            ? state.lines.map((line) =>
                line.lineId === lineId
                  ? { ...line, quantity: Math.min(line.quantity + quantity, Math.max(stock, 1)) }
                  : line,
              )
            : [
                ...state.lines,
                {
                  lineId,
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: product.images[0],
                  price: product.price,
                  comparePrice: product.comparePrice,
                  size,
                  colour,
                  quantity: Math.min(quantity, Math.max(stock, 1)),
                  stock,
                },
              ];
          return { lines, isOpen: true, lastAdded: product.name };
        }),

      setQuantity: (lineId, quantity) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.lineId === lineId
              ? { ...line, quantity: Math.max(1, Math.min(quantity, Math.max(line.stock, 1))) }
              : line,
          ),
        })),

      remove: (lineId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.lineId !== lineId) })),

      clear: () => set({ lines: [], lastAdded: null }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false, lastAdded: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
      clearLastAdded: () => set({ lastAdded: null }),
    }),
    {
      name: 'goodlychic:cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

/* ────────────────────────────── selectors ─────────────────────────────── */

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((total, line) => total + line.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.lines.reduce((total, line) => total + line.price * line.quantity, 0);
