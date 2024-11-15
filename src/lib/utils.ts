import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i) !== null;
  } catch {
    return false;
  }
}