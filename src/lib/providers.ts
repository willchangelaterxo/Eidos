export interface StreamProvider {
  id: string;
  name: string;
  urlTemplate: string;
  supportsTV: boolean;
}

export const STREAM_PROVIDERS: StreamProvider[] = [
  {
    id: 'vidsrc',
    name: 'VidSrc',
    urlTemplate: 'https://vidsrc.to/embed/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: '2embed',
    name: '2Embed',
    urlTemplate: 'https://www.2embed.to/embed/{id}',
    supportsTV: true,
  },
  {
    id: 'moviesjoy',
    name: 'MoviesJoy',
    urlTemplate: 'https://moviesjoy.plus/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'gomovies',
    name: 'GoMovies',
    urlTemplate: 'https://gomovies.sx/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'flixhq',
    name: 'FlixHQ',
    urlTemplate: 'https://flixhq.to/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'hdrezka',
    name: 'HDrezka',
    urlTemplate: 'https://hdrezka.ag/films/id/{id}',
    supportsTV: true,
  },
  {
    id: '123movies',
    name: '123Movies',
    urlTemplate: 'https://123moviesgo.com/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'putlocker',
    name: 'Putlocker',
    urlTemplate: 'https://putlocker.vc/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'solarmovie',
    name: 'SolarMovie',
    urlTemplate: 'https://solarmoviex.net/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'lookmovie',
    name: 'LookMovie',
    urlTemplate: 'https://lookmovie.io/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'fmovies',
    name: 'FMovies',
    urlTemplate: 'https://www.fmovies.gg/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'watchonline',
    name: 'WatchOnline',
    urlTemplate: 'https://watchonline.la/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'streamm4u',
    name: 'StreamM4u',
    urlTemplate: 'https://streamm4u.com/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'myflixersv2',
    name: 'MyFlixers',
    urlTemplate: 'https://myflixers.to/{mediaType}/{id}',
    supportsTV: true,
  },
  {
    id: 'doramasflix',
    name: 'DoramasFlixs',
    urlTemplate: 'https://doramasflix.io/{mediaType}/{id}',
    supportsTV: true,
  },
];

export function buildProviderUrl(
  provider: StreamProvider,
  tmdbId: number,
  mediaType: 'movie' | 'tv',
  season?: number,
  episode?: number
): string {
  let url = provider.urlTemplate
    .replace('{id}', String(tmdbId))
    .replace('{mediaType}', mediaType);

  if (season !== undefined && episode !== undefined) {
    url += `?season=${season}&episode=${episode}`;
  }

  return url;
}
