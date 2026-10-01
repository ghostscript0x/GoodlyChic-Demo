/**
 * Checkout validation.
 *
 * Hand-rolled so the demo stays dependency-light, but written to be replaced by
 * a shared schema (zod/valibot) or server actions in a backend phase. Messages
 * are written in the brand voice — warm, direct, never shouty.
 */

import { NIGERIAN_STATES } from './nigeria';

export type CheckoutValues = {
  name: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
};

export type CheckoutField = keyof CheckoutValues;

export type FieldErrors = Partial<Record<CheckoutField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Accepts Nigerian formats such as 0803…, +234803…, and spaced/dashed variants. */
const phonePattern = /^(?:\+?234|0)[789][01]\d{8}$/;

const digitsOnly = (value: string) => value.replace(/[^\d]/g, '');

export const checkoutDefaults: CheckoutValues = {
  name: '',
  email: '',
  phone: '',
  addressLine: '',
  city: '',
  state: '',
};

export function validateField(field: CheckoutField, values: CheckoutValues): string | undefined {
  const value = values[field].trim();

  switch (field) {
    case 'name':
      if (!value) return 'Please tell us your name.';
      if (value.length < 2) return 'Please enter your full name.';
      return undefined;
    case 'email':
      if (!value) return 'We need an email for your order confirmation.';
      if (!emailPattern.test(value)) return 'That email address does not look right.';
      return undefined;
    case 'phone':
      if (!value) return 'A phone number helps our courier reach you.';
      if (!phonePattern.test(digitsOnly(value)))
        return 'Please enter a Nigerian number, for example 0803 000 0000.';
      return undefined;
    case 'addressLine':
      if (!value) return 'Where should we deliver?';
      if (value.length < 5) return 'Please add a little more detail to your address.';
      return undefined;
    case 'city':
      if (!value) return 'Which city are we delivering to?';
      return undefined;
    case 'state': {
      if (!value) return 'Please choose your state.';
      if (!(NIGERIAN_STATES as readonly string[]).includes(value))
        return 'Please choose a state from the list.';
      return undefined;
    }
    default:
      return undefined;
  }
}

/** Validates the whole form. Returns an empty object when it is complete. */
export function validateCheckout(values: CheckoutValues, needsAddress: boolean): FieldErrors {
  const errors: FieldErrors = {};
  const fields: CheckoutField[] = needsAddress
    ? ['name', 'email', 'phone', 'addressLine', 'city', 'state']
    : ['name', 'email', 'phone'];

  for (const field of fields) {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  }

  return errors;
}

export function normalisePhone(value: string): string {
  return digitsOnly(value);
}
