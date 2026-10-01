'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
  /** Distance travelled, in pixels. Kept small and editorial. */
  distance?: number;
};

/**
 * Fade + 14px upward reveal, once, on scroll. Respects reduced motion by
 * rendering the children statically.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  distance = 14,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

/** Staggers direct `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  step = 90,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ visible: { transition: { staggerChildren: step / 1000 } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  distance = 14,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
