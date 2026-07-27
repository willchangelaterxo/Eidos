'use client';

import { WatchLaterProvider } from '@/components/WatchLaterContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <WatchLaterProvider>{children}</WatchLaterProvider>;
}
