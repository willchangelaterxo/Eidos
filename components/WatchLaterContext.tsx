'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WatchLaterItem {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  addedAt: number;
}

interface WatchLaterContextType {
  items: WatchLaterItem[];
  addItem: (item: WatchLaterItem) => void;
  removeItem: (id: number) => void;
  isInWatchLater: (id: number) => boolean;
  clearWatchLater: () => void;
}

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(undefined);
const STORAGE_KEY = 'eidos_watch_later';

export function WatchLaterProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WatchLaterItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load watch later items:', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save watch later items:', error);
      }
    }
  }, [items, isLoaded]);

  const addItem = (item: WatchLaterItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev;
      }
      return [item, ...prev];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWatchLater = (id: number) => {
    return items.some((item) => item.id === id);
  };

  const clearWatchLater = () => {
    setItems([]);
  };

  return (
    <WatchLaterContext.Provider value={{ items, addItem, removeItem, isInWatchLater, clearWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
}

export function useWatchLater() {
  const context = useContext(WatchLaterContext);
  if (context === undefined) {
    throw new Error('useWatchLater must be used within a WatchLaterProvider');
  }
  return context;
}
