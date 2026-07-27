'use client';

import { useEffect, useState } from 'react';
import { getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, WatchListItem } from '@/lib/watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchListItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWatchlist(getWatchlist());
  }, []);

  const add = (item: WatchListItem) => {
    addToWatchlist(item);
    setWatchlist(getWatchlist());
  };

  const remove = (id: number, mediaType: 'movie' | 'tv') => {
    removeFromWatchlist(id, mediaType);
    setWatchlist(getWatchlist());
  };

  const isSaved = (id: number, mediaType: 'movie' | 'tv') => {
    return isInWatchlist(id, mediaType);
  };

  const toggle = (item: WatchListItem) => {
    if (isSaved(item.id, item.mediaType)) {
      remove(item.id, item.mediaType);
    } else {
      add(item);
    }
  };

  return {
    watchlist,
    add,
    remove,
    isSaved,
    toggle,
    mounted,
  };
}
