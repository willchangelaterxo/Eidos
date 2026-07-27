const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB_API_KEY environment variable is not set');
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBMediaDetail {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  similar?: {
    results: (TMDBMovie | TMDBTVShow)[];
  };
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export interface TMDBSearchResult {
  results: Array<TMDBMovie | TMDBTVShow | { id: number; profile_path: string | null; name: string; known_for_department: string }>;
  total_pages: number;
  total_results: number;
  page: number;
}

async function fetchFromTMDB(endpoint: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('TMDB API fetch error:', error);
    throw error;
  }
}

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'day') {
  const data = await fetchFromTMDB(`/trending/movie/${timeWindow}`);
  return data.results as TMDBMovie[];
}

export async function getTrendingTV(timeWindow: 'day' | 'week' = 'day') {
  const data = await fetchFromTMDB(`/trending/tv/${timeWindow}`);
  return data.results as TMDBTVShow[];
}

export async function getPopularMovies(page = 1) {
  const data = await fetchFromTMDB('/movie/popular', { page });
  return data.results as TMDBMovie[];
}

export async function getPopularTV(page = 1) {
  const data = await fetchFromTMDB('/tv/popular', { page });
  return data.results as TMDBTVShow[];
}

export async function getTopRatedMovies(page = 1) {
  const data = await fetchFromTMDB('/movie/top_rated', { page });
  return data.results as TMDBMovie[];
}

export async function getTopRatedTV(page = 1) {
  const data = await fetchFromTMDB('/tv/top_rated', { page });
  return data.results as TMDBTVShow[];
}

export async function getNowPlayingMovies(page = 1) {
  const data = await fetchFromTMDB('/movie/now_playing', { page });
  return data.results as TMDBMovie[];
}

export async function searchMulti(query: string, page = 1) {
  const data = await fetchFromTMDB('/search/multi', { query, page });
  return data as TMDBSearchResult;
}

export async function getMovieDetail(id: number) {
  const data = await fetchFromTMDB(`/movie/${id}`, {
    append_to_response: 'credits,videos,similar',
  });
  return data as TMDBMediaDetail;
}

export async function getTVDetail(id: number) {
  const data = await fetchFromTMDB(`/tv/${id}`, {
    append_to_response: 'credits,videos,similar',
  });
  return data as TMDBMediaDetail;
}

export async function getTVSeasonDetail(tvId: number, seasonNumber: number) {
  const data = await fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}`, {
    append_to_response: 'credits',
  });
  return data;
}

export function getImageUrl(path: string | null, size: 'w300' | 'w500' | 'w780' | 'original' = 'w500') {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
