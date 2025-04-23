import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function timeAgo(timestamp: number): string {
    const now = Date.now();
    const diffMs = now - timestamp;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

    if (seconds < 10) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 2) return "a minute ago";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 2) return "an hour ago";
    if (hours < 24) return `${hours} hours ago`;
    if (days < 2) return "yesterday";
    if (days < 7) return `${days} days ago`;
    if (weeks < 2) return "a week ago";
    if (weeks < 4) return `${weeks} weeks ago`;
    if (months < 2) return "a month ago";
    if (months < 12) return `${months} months ago`;
    if (years < 2) return "a year ago";
    return `${years} years ago`;
}
