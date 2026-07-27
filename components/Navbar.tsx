'use client';

import Link from 'next/link';
import { Search, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
        <Link href="/" className="text-xl md:text-2xl font-bold text-white hover:text-cyan-400 transition-colors"><span className="text-cyan-400">Eidos</span></Link>
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px] max-w-sm">
          <div className="relative">
            <input type="text" placeholder="Search movies & TV shows..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 pl-10 glass-dark border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </form>
        <Link href="/watchlist" className="flex items-center gap-2 px-4 py-2 glass-dark hover:bg-white/20 rounded-lg transition-all duration-300 group"><Bookmark className="w-5 h-5 text-cyan-400 group-hover:fill-cyan-400" /><span className="hidden md:inline text-white">Watch Later</span></Link>
      </div>
    </nav>
  );
}
