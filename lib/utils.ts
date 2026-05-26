import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'AED'): string {
  if (price >= 1_000_000) {
    return `${currency} ${(price / 1_000_000).toFixed(1)}M`;
  }
  if (price >= 1_000) {
    return `${currency} ${(price / 1_000).toFixed(0)}K`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export function formatArea(area: number, unit = 'sqft'): string {
  return `${area.toLocaleString()} ${unit}`;
}

export const DEFAULT_PROPERTY_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80';

export const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90';

export const PLACEHOLDER_AGENT_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80';
