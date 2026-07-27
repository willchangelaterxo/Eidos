'use client';

import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import { useWatchLater } from '@/components/WatchLaterContext';
import { Trash2 } from 'lucide-react';

export default function WatchlistPage() {
  const { items, removeItem, clearWatchLater } = useWatchLater();

  return (
    <>
      <Navbar />
      <main className="w-full bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">My Watch Later</h1>
              <p className="text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
            </div>
            {items.length > 0 && <button onClick={clearWatchLater} className="flex items-center gap-2 px-6 py-3 glass-dark hover:bg-red-500/20 transition-all duration-300 rounded-lg text-red-400"><Trash2 className="w-5 h-5" />Clear All</button>}
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {items.map((item) => (
                <div key={`${item.mediaType}-${item.id}`} className="relative">
                  <Card id={item.id} posterPath={item.posterPath} title={item.title} mediaType={item.mediaType} isSaved={true} onSaveClick={() => removeItem(item.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-4">Your watchlist is empty</p>
                <p className="text-gray-400 mb-8">Start adding movies and TV shows to your watch later list</p>
                <a href="/" className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-glow-lg">Explore Now</a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
