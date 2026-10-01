'use client';

import Link from 'next/link';
import { track, type TrackEvent, type TrackPayload } from '@/lib/analytics';

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Analytics event fired on click. */
  event?: TrackEvent;
  payload?: TrackPayload;
  external?: boolean;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};

/**
 * An anchor that records a click before following it.
 * Server components can use this because the event handler lives on the client.
 */
export function TrackedLink({
  href,
  children,
  className,
  event,
  payload,
  external,
  target,
  rel,
  ...rest
}: TrackedLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  const onClick = () => {
    if (event) track(event, { ...payload, href });
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={target ?? '_blank'}
        rel={rel ?? 'noreferrer noopener'}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
