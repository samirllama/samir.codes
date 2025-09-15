import { format, formatDistanceToNow, isValid } from 'date-fns'
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs)
}

export function formatRelativeTime(date: Date | string) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(parsedDate)) {
    return 'Invalid Date';
  }
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return 'Invalid Date';
  }
  return format(date, 'MMMM d, yyyy');
};

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

export function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function getExcerpt(content: string, length: number = 160): string {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links
    .replace(/#{1,6}\s/g, "") // Remove headings
    .replace(/[*_`]/g, "") // Remove emphasis
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  return truncate(plainText, length);
}
