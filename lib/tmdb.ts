const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  console.warn('TMDB_API_KEY is not set. Please add it to your .env.local file.');
}

interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number;
  };
}

async function tmdbFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);
  url.searchParams.append('api_key', API_KEY || '');
  url.searchParams.append('language', 'en-US');

  const fetchOptions: FetchOptions = {
    ...options,
    next: {
      revalidate: options.next?.revalidate ?? 3600,
    },
  };

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getTrending(mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'day') {
  return tmdbFetch(`/trending/${mediaType}/${timeWindow}`, { next: { revalidate: 600 } });
}

export async function getPopularMovies(page = 1) {
  return tmdbFetch(`/movie/popular?page=${page}`, { next: { revalidate: 3600 } });
}

export async function getPopularTV(page = 1) {
  return tmdbFetch(`/tv/popular?page=${page}`, { next: { revalidate: 3600 } });
}

export async function getTopRatedMovies(page = 1) {
  return tmdbFetch(`/movie/top_rated?page=${page}`, { next: { revalidate: 3600 } });
}

export async function getTopRatedTV(page = 1) {
  return tmdbFetch(`/tv/top_rated?page=${page}`, { next: { revalidate: 3600 } });
}

export async function getNowPlaying(page = 1) {
  return tmdbFetch(`/movie/now_playing?page=${page}`, { next: { revalidate: 600 } });
}

export async function multiSearch(query: string, page = 1) {
  const encodedQuery = encodeURIComponent(query);
  return tmdbFetch(`/search/multi?query=${encodedQuery}&page=${page}`, { next: { revalidate: 3600 } });
}

export async function getMovieDetails(id: number) {
  return tmdbFetch(`/movie/${id}?append_to_response=credits,videos,similar`, { next: { revalidate: 3600 } });
}

export async function getTVDetails(id: number) {
  return tmdbFetch(`/tv/${id}?append_to_response=credits,videos,similar`, { next: { revalidate: 3600 } });
}

export async function getSeasonDetails(tvId: number, seasonNumber: number) {
  return tmdbFetch(`/tv/${tvId}/season/${seasonNumber}?append_to_response=credits`, { next: { revalidate: 3600 } });
}

export async function getEpisodeDetails(tvId: number, seasonNumber: number, episodeNumber: number) {
  return tmdbFetch(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, { next: { revalidate: 3600 } });
}
