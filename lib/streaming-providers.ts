export interface StreamingProvider {
  id: string;
  name: string;
  urlTemplate: (mediaType: string, id: number, season?: number, episode?: number) => string;
  supportsSandbox: boolean;
}

export const streamingProviders: StreamingProvider[] = [
  {
    id: 'vidsrc',
    name: 'VidSrc',
    urlTemplate: (mediaType, id, season, episode) => {
      if (mediaType === 'tv' && season !== undefined && episode !== undefined) {
        return `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://vidsrc.to/embed/${mediaType === 'tv' ? 'tv' : 'movie'}/${id}`;
    },
    supportsSandbox: true,
  },
  {
    id: '2embed',
    name: '2Embed',
    urlTemplate: (mediaType, id, season, episode) => {
      if (mediaType === 'tv' && season !== undefined && episode !== undefined) {
        return `https://www.2embed.cc/embed/${id}&s=${season}&e=${episode}`;
      }
      return `https://www.2embed.cc/embed/${id}`;
    },
    supportsSandbox: true,
  },
  { id: 'smashystream', name: 'SmashyStream', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://embed.smashystream.com/t/${id}-${season}-${episode}` : `https://embed.smashystream.com/${mediaType === 'tv' ? 't' : 'm'}/${id}`, supportsSandbox: true },
  { id: 'superembed', name: 'SuperEmbed', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://www.superembed.stream/embed/${id}&s=${season}&e=${episode}` : `https://www.superembed.stream/embed/${id}`, supportsSandbox: true },
  { id: 'gomovies', name: 'GoMovies', urlTemplate: (mediaType, id) => `https://gomovies.sx/${mediaType}/${id}`, supportsSandbox: true },
  { id: 'embedsito', name: 'EmbedSito', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://embedsito.com/series/${id}/${season}/${episode}` : `https://embedsito.com/movies/${id}`, supportsSandbox: true },
  { id: 'autoembed', name: 'AutoEmbed', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://autoembed.cc/series/${id}/${season}/${episode}` : `https://autoembed.cc/${mediaType === 'tv' ? 'series' : 'movie'}/${id}`, supportsSandbox: true },
  { id: 'multiembed', name: 'MultiEmbed', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://multiembed.mov/directstream.php?video_id=${id}&type=shows&season=${season}&episode=${episode}` : `https://multiembed.mov/directstream.php?video_id=${id}&type=movie`, supportsSandbox: true },
  { id: 'vidbinge', name: 'VidBinge', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}` : `https://vidbinge.dev/embed/movie/${id}`, supportsSandbox: true },
  { id: 'moviesapi', name: 'MoviesAPI', urlTemplate: (mediaType, id, season, episode) => mediaType === 'tv' && season !== undefined && episode !== undefined ? `https://moviesapi.club/tv/${id}-${season}-${episode}` : `https://moviesapi.club/movie/${id}`, supportsSandbox: true },
];

export function getProviderById(id: string): StreamingProvider | undefined {
  return streamingProviders.find((p) => p.id === id);
}

export function getProviderIds(): string[] {
  return streamingProviders.map((p) => p.id);
}
