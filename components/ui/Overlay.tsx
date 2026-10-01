'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useEscape, useFocusTrap } from '@/lib/useFocusTrap';
import { cn } from '@/lib/utils';

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  /** Drawer slides from the right; panel fades and rises from the bottom. */
  mode?: 'drawer' | 'modal';
  labelledBy: string;
  children: React.ReactNode;
  /** Extra class on the panel. */
  panelClassName?: string;
  /** Hide the built-in close button when the panel provides its own. */
  hideClose?: boolean;
  closeLabel?: string;
};

/**
 * Shared overlay shell: portal, scroll lock, focus trap, Escape to close and a
 * backdrop. Handles both the cart drawer and modal surfaces so focus behaviour
 * is consistent across the site.
 */
export function Overlay({
  open,
  onClose,
  mode = 'drawer',
  labelledBy,
  children,
  panelClassName,
  hideClose = false,
  closeLabel = 'Close',
}: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useFocusTrap(panelRef, open);
  useEscape(open, onClose);

  useEffect(() => setMounted(true), []);

  if (!mounted || !open) return null;

  const isDrawer = mode === 'drawer';

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-espresso/25 animate-fade-in"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          'absolute flex flex-col bg-white shadow-drawer',
          isDrawer
            ? 'right-0 top-0 h-full w-full max-w-[27rem] animate-[fade-in_400ms_ease-editorial]'
            : 'left-1/2 top-1/2 max-h-[92vh] w-[min(94vw,60rem)] -translate-x-1/2 -translate-y-1/2 animate-fade-rise',
          panelClassName,
        )}
      >
        {!hideClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-espresso transition-colors hover:text-espresso-55"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
