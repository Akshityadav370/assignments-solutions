import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roomColors = {
  one: 'oklch(0.808 0.114 19.571)',
  two: 'oklch(0.91 0.096 180.426)',
  three: 'oklch(0.894 0.057 293.283)',
  four: 'oklch(0.905 0.182 98.111)',
  five: 'oklch(0.768 0.233 130.85)',
};
