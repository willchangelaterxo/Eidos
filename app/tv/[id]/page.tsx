'use client';

import Navbar from '@/components/Navbar';
import Player from '@/components/Player';
import Carousel from '@/components/Carousel';
import { getTVDetails } from '@/lib/tmdb';
import { useWatchLater } from '@/components/WatchLaterContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Bookmark, Calendar, Trophy } from 'lucide-react';

interface TVDetailsPageProps {
  params: {
    id: string;
  };
}

export default function TVDetailsPage({ params }: TVDetailsPageProps) {
  const tvId = parseInt(params.id);
  const [tv, setTV] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const { addItem, removeItem, isInWatchLater } = useWatchLater();
  const isSaved = isInWatchLater(tvId);

  useEffect(() => {
    async function fetchTV() {
      try {
        const data = await getTVDetails(tvId);
        setTV(data);
      } catch (err) {
        setError('Failed to load TV show details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTV();
  }, [tvId]);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeItem(tvId);
    } else {
      addItem({
        id: tvId,
        mediaType: 'tv',
        title: tv.name,
        posterPath: tv.poster_path,
        addedAt: Date.now(),
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen bg-black flex items-center justify-center"><div className="animate-spin"><div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full" /></div></div>
      </>
    );
  }

  if (error || !tv) {
    return (
      <>
        <Navbar />
        <div className="h-screen bg-black flex items-center justify-center text-white"><p>{error || 'TV show not found'}</p></div>
      </>
    );
  }

  const cast = (tv.credits?.cast || []).slice(0, 8);
  const similar = (tv.similar?.results || []).slice(0, 10);
  const seasons = tv.seasons || [];

  return (
    <>
      <Navbar />
      <main className="w-full bg-black">
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
          {tv.backdrop_path && <Image src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} alt={tv.name} fill className="object-cover" sizes="100vw" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8 -mt-32 relative z-10">
            {tv.poster_path && <div className="flex-shrink-0"><Image src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`} alt={tv.name} width={200} height={300} className="rounded-xl shadow-2xl" /></div>}
            <div className="flex-1 flex flex-col justify-end">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tv.name}</h1>
              {tv.tagline && <p className="text-cyan-400 text-lg mb-4 italic">\"{tv.tagline}\"</p>}
              <div className="flex flex-wrap gap-4 mb-4">
                {tv.first_air_date && <div className="flex items-center gap-2 text-gray-300"><Calendar className="w-5 h-5" /><span>{new Date(tv.first_air_date).getFullYear()}</span></div>}
                {tv.number_of_seasons && <div className="text-gray-300">{tv.number_of_seasons} Season{tv.number_of_seasons > 1 ? 's' : ''}</div>}
                {tv.vote_average && <div className="flex items-center gap-2 text-yellow-400"><Trophy className="w-5 h-5" /><span>{tv.vote_average.toFixed(1)}/10</span></div>}
              </div>
              {tv.genres && <div className="flex flex-wrap gap-2 mb-6">{tv.genres.map((genre: any) => <span key={genre.id} className="px-3 py-1 glass-dark rounded-lg text-sm">{genre.name}</span>)}</div>}
              <button onClick={handleSaveToggle} className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isSaved ? 'bg-cyan-500 text-black hover:bg-cyan-600' : 'glass-dark hover:bg-white/20'}`}>
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Remove from Watch Later' : 'Add to Watch Later'}
              </button>
            </div>
          </div>

          {tv.overview && <div className="mb-8"><h2 className="text-2xl font-bold mb-4 text-white">Overview</h2><p className="text-gray-300 text-lg leading-relaxed">{tv.overview}</p></div>}

          {seasons.length > 0 && (
            <div className="mb-8 p-6 glass-dark rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-white">Select Episode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-gray-300 mb-2">Season</label><select value={selectedSeason} onChange={(e) => { setSelectedSeason(parseInt(e.target.value)); setSelectedEpisode(1); }} className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500">{seasons.map((season: any) => <option key={season.season_number} value={season.season_number}>Season {season.season_number}</option>)}</select></div>
                <div><label className="block text-sm font-semibold text-gray-300 mb-2">Episode</label><select value={selectedEpisode} onChange={(e) => setSelectedEpisode(parseInt(e.target.value))} className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500">{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>Episode {i + 1}</option>)}</select></div>
              </div>
            </div>
          )}

          <div className="mb-8"><h2 className="text-2xl font-bold mb-4 text-white">Watch</h2><Player id={tvId} mediaType="tv" title={tv.name} backdropPath={tv.backdrop_path} season={selectedSeason} episode={selectedEpisode} /></div>

          {cast.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {cast.map((actor: any) => (
                  <div key={actor.id} className="text-center">
                    {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} width={150} height={225} className="rounded-lg mb-2 w-full h-auto" />}
                    <p className="text-sm font-semibold text-white line-clamp-1">{actor.name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similar.length > 0 && <Carousel title="Similar Shows" items={similar} />}
        </div>
      </main>
    </>
  );
}
