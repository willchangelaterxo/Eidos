'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface CardProps {
  id: number;
  posterPath: string | null;
  title: string;
  mediaType: 'movie' | 'tv';
  onClick?: () => void;
  onSaveClick?: (e: React.MouseEvent) => void;
  isSaved?: boolean;
}

export default function Card({ id, posterPath, title, mediaType, onClick, onSaveClick, isSaved = false }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleTap = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    onClick?.();
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    if (navigator.vibrate) navigator.vibrate([10, 20, 10]);
    e.preventDefault();
    e.stopPropagation();
    onSaveClick?.(e);
  };

  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '/placeholder.svg';

  return (
    <Link href={`/${mediaType}/${id}`}>
      <div className="relative flex-shrink-0 w-32 h-48 md:w-40 md:h-60 cursor-pointer overflow-hidden group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleTap}>
        <Image src={imageUrl} alt={title} fill className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-110" sizes="(max-width: 768px) 128px, 160px" priority={false} placeholder="blur" blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 240'%3E%3Crect fill='%23111' width='160' height='240'/%3E%3C/svg%3E" />
        <div className="card-overlay" />
        {(isHovered || true) && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="glass-button p-3 rounded-full hover:scale-110 transition-transform duration-300" title="Play" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleTap(); }}>
              <Play className="w-5 h-5 fill-cyan-400 text-cyan-400" />
            </button>
            <button className={`glass-button p-3 rounded-full hover:scale-110 transition-all duration-300 ${isSaved ? 'bg-cyan-500/40' : ''}`} title="Save to Watch Later" onClick={handleSaveClick}>
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-cyan-400 text-cyan-400' : 'text-white'}`} />
            </button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xs md:text-sm font-semibold line-clamp-2 text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
