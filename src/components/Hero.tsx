import Image from 'next/image';
import { TMDBMovie, getImageUrl } from '@/lib/tmdb';
import { Button } from './Button';

interface HeroProps {
  movie: TMDBMovie;
}

export function Hero({ movie }: HeroProps) {
  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden rounded-b-3xl">
      {/* Backdrop Image */}
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          quality={100}
        />
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-2xl text-white space-y-6">
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold uppercase tracking-widest text-sm">This Week's Featured</p>
          <h1 className="text-6xl md:text-7xl font-black leading-tight">{movie.title}</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-lg">{movie.overview}</p>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">⭐</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">📅</span>
            <span>{movie.release_date?.split('-')[0]}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            href={`/movie/${movie.id}`}
            variant="primary"
            size="lg"
            className="inline-flex items-center gap-3"
          >
            <span>▶</span>
            Play Now
          </Button>
        </div>
      </div>
    </div>
  );
}
