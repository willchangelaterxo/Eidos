'use client';

import Navbar from '@/components/Navbar';
import Player from '@/components/Player';
import Carousel from '@/components/Carousel';
import { getMovieDetails } from '@/lib/tmdb';
import { useWatchLater } from '@/components/WatchLaterContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Bookmark, Clock, Award } from 'lucide-react';

interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movieId = parseInt(params.id);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, removeItem, isInWatchLater } = useWatchLater();
  const isSaved = isInWatchLater(movieId);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeItem(movieId);
    } else {
      addItem({
        id: movieId,
        mediaType: 'movie',
        title: movie.title,
        posterPath: movie.poster_path,
        addedAt: Date.now(),
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen bg-black flex items-center justify-center">
          <div className="animate-spin"><div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full" /></div>
        </div>
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <div className="h-screen bg-black flex items-center justify-center text-white"><p>{error || 'Movie not found'}</p></div>
      </>
    );
  }

  const cast = (movie.credits?.cast || []).slice(0, 8);
  const similar = (movie.similar?.results || []).slice(0, 10);

  return (
    <>
      <Navbar />
      <main className="w-full bg-black">
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
          {movie.backdrop_path && <Image src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} fill className="object-cover" sizes="100vw" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8 -mt-32 relative z-10">
            {movie.poster_path && (
              <div className="flex-shrink-0"><Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} width={200} height={300} className="rounded-xl shadow-2xl" /></div>
            )}
            <div className="flex-1 flex flex-col justify-end">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.tagline && <p className="text-cyan-400 text-lg mb-4 italic">\"{movie.tagline}\"</p>}
              <div className="flex flex-wrap gap-4 mb-4">
                {movie.release_date && (
                  <div className="flex items-center gap-2 text-gray-300"><Clock className="w-5 h-5" /><span>{new Date(movie.release_date).getFullYear()}</span></div>
                )}
                {movie.runtime && <div className="text-gray-300">{movie.runtime} mins</div>}
                {movie.vote_average && <div className="flex items-center gap-2 text-yellow-400"><Award className="w-5 h-5" /><span>{movie.vote_average.toFixed(1)}/10</span></div>}
              </div>
              {movie.genres && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre: any) => <span key={genre.id} className="px-3 py-1 glass-dark rounded-lg text-sm">{genre.name}</span>)}
                </div>
              )}
              <button onClick={handleSaveToggle} className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${ isSaved ? 'bg-cyan-500 text-black hover:bg-cyan-600' : 'glass-dark hover:bg-white/20'}`}>
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Remove from Watch Later' : 'Add to Watch Later'}
              </button>
            </div>
          </div>

          {movie.overview && (
            <div className="mb-8"><h2 className="text-2xl font-bold mb-4 text-white">Overview</h2><p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p></div>
          )}

          <div className="mb-8"><h2 className="text-2xl font-bold mb-4 text-white">Watch</h2><Player id={movieId} mediaType="movie" title={movie.title} backdropPath={movie.backdrop_path} /></div>

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

          {similar.length > 0 && <Carousel title="Similar Movies" items={similar} />}
        </div>
      </main>
    </>
  );
}
