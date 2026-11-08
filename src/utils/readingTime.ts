export function calculateReadingTime(text: string): { text: string; minutes: number; words: number } {
  if (!text) return { text: '1 min read', minutes: 1, words: 0 };
  
  // Strip HTML and Markdown characters
  const clean = text
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`_~[\]()\-+=>]/g, '')
    .trim();
    
  const words = clean.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  
  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}
