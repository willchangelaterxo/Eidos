export interface WatchListItem {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  addedAt: number;
}

const STORAGE_KEY = 'eidos_watchlist';

export function getWatchlist(): WatchListItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading watchlist:', error);
    return [];
  }
}

export function addToWatchlist(item: WatchListItem): void {
  if (typeof window === 'undefined') return;

  try {
    const watchlist = getWatchlist();
    const exists = watchlist.some((w) => w.id === item.id && w.mediaType === item.mediaType);

    if (!exists) {
      watchlist.push({ ...item, addedAt: Date.now() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    }
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
}

export function removeFromWatchlist(id: number, mediaType: 'movie' | 'tv'): void {
  if (typeof window === 'undefined') return;

  try {
    const watchlist = getWatchlist();
    const filtered = watchlist.filter((w) => !(w.id === id && w.mediaType === mediaType));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing from watchlist:', error);
  }
}

export function isInWatchlist(id: number, mediaType: 'movie' | 'tv'): boolean {
  const watchlist = getWatchlist();
  return watchlist.some((w) => w.id === id && w.mediaType === mediaType);
}
