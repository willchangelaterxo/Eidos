'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { hapticFeedback } from '@/lib/vibration';
import { TMDBMovie, TMDBTVShow, getImageUrl } from '@/lib/tmdb';

interface CardProps {
  media: TMDBMovie | TMDBTVShow;
  mediaType: 'movie' | 'tv';
  onPlay?: (id: number) => void;
}

export function Card({ media, mediaType, onPlay }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isSaved, toggle } = useWatchlist();
  const posterUrl = getImageUrl(media.poster_path, 'w500');
  const title = 'title' in media ? media.title : media.name;

  const handlePlayClick = () => {
    hapticFeedback('medium');
    onPlay?.(media.id);
  };

  const handleBookmarkClick = () => {
    hapticFeedback('light');
    toggle({
      id: media.id,
      mediaType,
      title,
      posterPath: media.poster_path,
    });
  };

  return (
    <div
      className="relative group overflow-hidden rounded-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      {posterUrl && (
        <Image
          src={posterUrl}
          alt={title}
          width={300}
          height={450}
          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoGSj/2wBDAYcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKSj/wAARCAADAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        />
      )}

      {/* Overlay with Buttons */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 gap-3">
          <button
            onClick={handlePlayClick}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 glow-cyan"
          >
            <span>▶</span>
            Play
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`w-full py-2 px-4 rounded-xl font-semibold transition-colors ${
              isSaved(media.id, mediaType)
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <span>{isSaved(media.id, mediaType) ? '✓' : '♡'}</span> Save for Later
          </button>
        </div>
      )}

      {/* Title Overlay (Always Visible) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
        <p className="text-white font-semibold text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </p>
      </div>
    </div>
  );
}
