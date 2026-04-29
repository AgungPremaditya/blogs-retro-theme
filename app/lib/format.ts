export function formatClockTime(
  date: Date,
  opts: { seconds?: boolean } = {},
): string {
  return date.toLocaleTimeString("en-DE", {
    hour: "2-digit",
    minute: "2-digit",
    ...(opts.seconds && { second: "2-digit" }),
  });
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatPublishedDate(input: Date | string): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200,
): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
