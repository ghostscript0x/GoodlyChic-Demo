'use client';

import { useId } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const controlBase =
  'w-full rounded-sm border bg-white px-4 font-sans text-[0.9375rem] text-espresso transition-colors duration-200 placeholder:text-espresso-40 focus:outline-none focus-visible:border-espresso';

const controlTone = (invalid?: boolean, light?: boolean) =>
  cn(
    controlBase,
    'min-h-12',
    invalid ? 'border-espresso' : light ? 'border-ivory/25 bg-transparent' : 'border-taupe',
    light && 'text-ivory placeholder:text-ivory-55',
  );

type FieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  light?: boolean;
  className?: string;
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => React.ReactNode;
};

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  light,
  className,
  children,
}: FieldProps) {
  const generatedId = useId();
  const id = htmlFor ?? generatedId;
  const messageId = `${id}-message`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className={cn(
          'font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em]',
          light ? 'text-ivory-70' : 'text-espresso-55',
        )}
      >
        {label}
        {required && <span className="ml-1 text-champagne">*</span>}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error || hint ? messageId : undefined,
      })}
      {(error || hint) && (
        <p
          id={messageId}
          className={cn(
            'flex items-start gap-1.5 text-[0.8125rem] leading-snug',
            error
              ? 'text-espresso'
              : light
                ? 'text-ivory-55'
                : 'text-espresso-55',
          )}
        >
          {error && <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />}
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function Input({
  className,
  invalid,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input className={cn(controlTone(invalid), className)} {...rest} />;
}

export function Textarea({
  className,
  invalid,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea className={cn(controlTone(invalid), 'py-3', className)} {...rest} />;
}

export function Select({
  className,
  invalid,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select className={cn(controlTone(invalid), 'appearance-none pr-11', className)} {...rest}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-55"
        strokeWidth={1.25}
        aria-hidden="true"
      />
    </div>
  );
}
