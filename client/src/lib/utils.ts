import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map(val => val.toString().padStart(2, '0'))
    .join(':');
}

export function formatTimeSpent(timeSpentInSeconds: number): string {
  const hours = Math.floor(timeSpentInSeconds / 3600);
  const minutes = Math.floor((timeSpentInSeconds % 3600) / 60);
  const seconds = timeSpentInSeconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export function calculateScore(answers: number[], correctAnswers: number[]): number {
  if (!answers || !correctAnswers || answers.length === 0 || correctAnswers.length === 0) {
    return 0;
  }

  let correct = 0;
  const total = Math.min(answers.length, correctAnswers.length);

  for (let i = 0; i < total; i++) {
    if (answers[i] === correctAnswers[i]) {
      correct++;
    }
  }

  return Math.round((correct / total) * 100);
}

export function countAnsweredQuestions(answers: (number | null)[]): number {
  if (!answers) return 0;
  return answers.filter(answer => answer !== null && answer !== undefined).length;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
