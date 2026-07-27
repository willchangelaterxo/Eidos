'use client';

import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import { multiSearch } from '@/lib/tmdb';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    async function search() {
      try {
        setLoading(true);
        const data = await multiSearch(query);
        const filtered = (data.results || []).filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
        setResults(filtered);
      } catch (err) {
        setError('Failed to search');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [query]);

  return (
    <>
      <Navbar />
      <main className="w-full bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Search Results</h1>
          <p className="text-gray-400 mb-8">{query ? `Results for \"${query}\"` : 'No search query'}</p>

          {loading && <div className="flex items-center justify-center h-96"><div className="animate-spin"><div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full" /></div></div>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((item) => (
                <Card key={item.id} id={item.id} posterPath={item.poster_path} title={item.title || item.name || 'Unknown'} mediaType={item.media_type as 'movie' | 'tv'} />
              ))}
            </div>
          )}
          {!loading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96">
              <p className="text-2xl font-bold text-white mb-4">No results found</p>
              <p className="text-gray-400">Try searching for a different movie or TV show</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
