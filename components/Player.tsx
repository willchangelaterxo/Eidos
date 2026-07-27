'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, X, AlertCircle } from 'lucide-react';
import { streamingProviders } from '@/lib/streaming-providers';

interface PlayerProps {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  backdropPath: string | null;
  season?: number;
  episode?: number;
}

export default function Player({ id, mediaType, title, backdropPath, season = 1, episode = 1 }: PlayerProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(streamingProviders[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const backdropUrl = backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : '/placeholder.svg';

  const getPlayerUrl = () => {
    return selectedProvider.urlTemplate(mediaType, id, season, episode);
  };

  const handlePlayClick = () => {
    setIsPlayerOpen(true);
    setIsLoading(true);
    setError(null);
  };

  const handleProviderChange = (providerId: string) => {
    const provider = streamingProviders.find((p) => p.id === providerId);
    if (provider) {
      setSelectedProvider(provider);
      setError(null);
      if (iframeRef.current) {
        iframeRef.current.src = getPlayerUrl();
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load player. Please try another server.');
  };

  if (!isPlayerOpen) {
    return (
      <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden group">
        <Image src={backdropUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 90vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button onClick={handlePlayClick} className="absolute inset-0 flex items-center justify-center group/btn transition-all duration-300 hover:bg-black/30" title="Play">
          <div className="p-4 rounded-full bg-cyan-500/80 group-hover/btn:bg-cyan-500 transition-all duration-300 transform group-hover/btn:scale-110 shadow-glow-lg">
            <Play className="w-8 h-8 md:w-12 md:h-12 fill-white text-white" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Server:</span>
          {streamingProviders.slice(0, 5).map((provider) => (
            <button key={provider.id} onClick={() => handleProviderChange(provider.id)} className={`text-xs px-3 py-1 rounded-lg transition-all duration-300 ${selectedProvider.id === provider.id ? 'bg-cyan-500 text-black font-semibold shadow-glow' : 'glass-dark hover:bg-white/20'}`}>
              {provider.name}
            </button>
          ))}
        </div>
        <button onClick={() => setIsPlayerOpen(false)} className="p-2 rounded-lg glass-dark hover:bg-red-500/20 transition-all duration-300" title="Close player">
          <X className="w-5 h-5" />
        </button>
      </div>
      {error && (
        <div className="flex gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
      <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="animate-spin"><div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full" /></div>
          </div>
        )}
        <iframe ref={iframeRef} src={getPlayerUrl()} title={title} className="w-full h-full border-0" allowFullScreen onLoad={handleIframeLoad} onError={handleIframeError} sandbox={{
          allowSameOrigin: true,
          allowScripts: true,
          allowPresentation: true,
          allowPopups: false,
          allowPopupsToEscapeFrom: false,
          allowTopNavigation: false,
        } as unknown as string} />
      </div>
      <p className="text-xs text-gray-500 italic">Note: Player is embedded from third-party sources. Ad-blocking may affect playback.</p>
    </div>
  );
}
