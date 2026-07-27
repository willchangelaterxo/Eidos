'use client';

import { useEffect, useRef, useState } from 'react';
import { hapticFeedback } from '@/lib/vibration';
import { STREAM_PROVIDERS } from '@/lib/providers';

interface PlayerProps {
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  backdropUrl?: string;
  title: string;
  season?: number;
  episode?: number;
}

interface ProviderHealth {
  id: string;
  name: string;
  url: string;
  isHealthy: boolean;
  responseTime: number;
}

export function Player({ tmdbId, mediaType, backdropUrl, title, season, episode }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<ProviderHealth | null>(null);
  const [allProviders, setAllProviders] = useState<ProviderHealth[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const checkProviderHealth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/providers/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tmdbId, mediaType }),
      });

      const data = await response.json();
      setAllProviders(data.allProviders);
      setCurrentProvider(data.recommended);
    } catch (err) {
      setError('Failed to check providers');
      console.error('Provider health check failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const playWithProvider = async (provider: ProviderHealth) => {
    hapticFeedback('medium');
    setCurrentProvider(provider);
    setIsPlaying(true);
  };

  const handlePlay = async () => {
    hapticFeedback('medium');

    if (!currentProvider) {
      await checkProviderHealth();
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
    }
  };

  const switchProvider = (provider: ProviderHealth) => {
    hapticFeedback('light');
    playWithProvider(provider);
  };

  const handleIframeError = () => {
    setError('Playback failed. Try another provider.');
    setIsPlaying(false);
  };

  useEffect(() => {
    // Prevent popups from player iframe
    if (iframeRef.current && isPlaying) {
      const originalOpen = window.open;
      window.open = function (...args: any[]) {
        console.warn('Popup blocked by player');
        return null;
      };

      return () => {
        window.open = originalOpen;
      };
    }
  }, [isPlaying]);

  return (
    <div className="w-full space-y-6">
      {/* Hero Section - Facade Loading */}
      {!isPlaying && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Play Button */}
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 rounded-full p-6 group-hover:bg-cyan-500/40 transition-all glow-cyan cursor-pointer"
            >
              <svg
                className="w-16 h-16 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">
              {title}
              {season && episode && (
                <span className="text-lg text-cyan-400 ml-4">
                  S{season}:E{episode}
                </span>
              )}
            </h2>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500 mx-auto mb-4" />
                <p className="text-cyan-400 font-semibold">Checking providers...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Player Iframe */}
      {isPlaying && currentProvider && (
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-cyan-500/20">
          <iframe
            ref={iframeRef}
            src={currentProvider.url}
            title={title}
            className="w-full h-full"
            allowFullScreen
            sandbox={undefined as any}
            style={{
              border: 'none',
            }}
            onError={handleIframeError}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Provider Selector */}
      {isPlaying && allProviders.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg">Switch Provider</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {allProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => switchProvider(provider)}
                className={`p-3 rounded-xl text-sm font-semibold transition-all ${
                  currentProvider.id === provider.id
                    ? 'bg-cyan-500 text-black glow-cyan'
                    : provider.isHealthy
                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20 opacity-50 cursor-not-allowed'
                }`}
                disabled={!provider.isHealthy}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
