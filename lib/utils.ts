import { formatDistanceToNow } from 'date-fns'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: Date | string) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
