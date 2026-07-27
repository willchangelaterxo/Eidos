import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Carousel from '@/components/Carousel';
import { getTrending, getPopularMovies, getPopularTV, getTopRatedMovies } from '@/lib/tmdb';
import { Suspense } from 'react';

async function HeroSection() {
  try {
    const trendingData = await getTrending('movie', 'week');
    const featuredItem = trendingData.results?.[0];

    if (!featuredItem) {
      return <div className="h-96 md:h-[600px] bg-gradient-to-b from-gray-900 to-black" />;
    }

    return (
      <Hero
        id={featuredItem.id}
        title={featuredItem.title || featuredItem.name}
        overview={featuredItem.overview}
        backdropPath={featuredItem.backdrop_path}
        mediaType="movie"
        tagline="Trending This Week"
      />
    );
  } catch (error) {
    console.error('Failed to fetch hero data:', error);
    return <div className="h-96 md:h-[600px] bg-gradient-to-b from-gray-900 to-black" />;
  }
}

async function TrendingSection() {
  try {
    const data = await getTrending('movie', 'day');
    return <Carousel title="Trending Now" items={data.results || []} />;
  } catch (error) {
    console.error('Failed to fetch trending:', error);
    return null;
  }
}

async function PopularMoviesSection() {
  try {
    const data = await getPopularMovies();
    return <Carousel title="Popular Movies" items={data.results || []} />;
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
    return null;
  }
}

async function PopularTVSection() {
  try {
    const data = await getPopularTV();
    return <Carousel title="Popular Series" items={data.results || []} />;
  } catch (error) {
    console.error('Failed to fetch popular TV:', error);
    return null;
  }
}

async function TopRatedSection() {
  try {
    const data = await getTopRatedMovies();
    return <Carousel title="Top Rated" items={data.results || []} />;
  } catch (error) {
    console.error('Failed to fetch top rated:', error);
    return null;
  }
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-black">
        <Suspense fallback={<div className="h-96 md:h-[600px] bg-gradient-to-b from-gray-900 to-black" />}>
          <HeroSection />
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Suspense fallback={<div className="h-64 bg-gray-900/50 rounded-lg animate-pulse" />}>
            <TrendingSection />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-gray-900/50 rounded-lg animate-pulse" />}>
            <PopularMoviesSection />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-gray-900/50 rounded-lg animate-pulse" />}>
            <PopularTVSection />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-gray-900/50 rounded-lg animate-pulse" />}>
            <TopRatedSection />
          </Suspense>
        </div>

        <footer className="border-t border-white/10 mt-16 py-8 px-4 md:px-8 text-center text-gray-500 text-sm">
          <p>© 2024 Eidos. Data provided by TMDB. This app uses third-party streaming embeds.</p>
        </footer>
      </main>
    </>
  );
}
