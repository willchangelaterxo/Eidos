'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card';

interface CarouselProps {
  title: string;
  items: Array<{ id: number; poster_path: string | null; title?: string; name?: string; media_type?: string }>;
  onItemSave?: (id: number) => void;
  savedItems?: number[];
}

export default function Carousel({ title, items, onItemSave, savedItems = [] }: CarouselProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 400;
      scrollContainer.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white ml-4 md:ml-8">{title}</h2>
      <div className="relative group">
        <div ref={scrollContainer} className="scroll-container flex gap-4 overflow-x-auto px-4 md:px-8 pb-2" onScroll={checkScroll}>
          {items.map((item) => <Card key={item.id} id={item.id} posterPath={item.poster_path} title={item.title || item.name || 'Unknown'} mediaType={(item.media_type as 'movie' | 'tv') || 'movie'} onSaveClick={() => onItemSave?.(item.id)} isSaved={savedItems.includes(item.id)} />)}
        </div>
        {canScrollLeft && <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-dark hidden group-hover:flex items-center justify-center transition-all duration-300" title="Scroll left"><ChevronLeft className="w-6 h-6 text-cyan-400" /></button>}
        {canScrollRight && <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-dark hidden group-hover:flex items-center justify-center transition-all duration-300" title="Scroll right"><ChevronRight className="w-6 h-6 text-cyan-400" /></button>}
      </div>
    </div>
  );
}
