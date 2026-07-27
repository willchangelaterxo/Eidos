# Eidos

A premium minimalist movie and TV show streaming web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Premium Minimalist Design**: OLED black theme with glassmorphism UI and cyan accent colors
- **Dynamic Content**: Trending, popular, top-rated, and now-playing content from TMDB
- **Multi-Server Streaming**: 10+ streaming embed providers with health checking and fallback
- **Watch Later**: Save movies and TV shows to your personal watchlist (localStorage)
- **Search**: Multi-search across movies and TV shows
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Fast Loading**: Server-side data fetching with caching and image optimization
- **Dark Mode**: OLED-black optimized interface
- **Micro-haptics**: Haptic feedback on button interactions (mobile)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Data**: TMDB (The Movie Database) API
- **State Management**: React Context (Watch Later)
- **Icons**: Lucide React
- **Font**: Inter (via next/font)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- TMDB API key (free account at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/willchangelaterxo/Eidos.git
   cd Eidos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your TMDB API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deployment

**Build for production:**
```bash
npm run build
```

**Run production server:**
```bash
npm start
```

**Check code quality:**
```bash
npm run lint
```

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with preconnects
│   ├── globals.css          # Global styles
│   ├── page.tsx             # Homepage with hero and carousels
│   ├── movie/[id]/page.tsx  # Movie detail page
│   ├── tv/[id]/page.tsx     # TV show detail page
│   ├── search/page.tsx      # Search results page
│   └── watchlist/page.tsx   # Watch Later page
├── components/
│   ├── Navbar.tsx           # Navigation bar with search
│   ├── Hero.tsx             # Hero section component
│   ├── Carousel.tsx         # Horizontal scrolling carousel
│   ├── Card.tsx             # Movie/TV poster card
│   ├── Player.tsx           # Multi-server player
│   └── WatchLaterContext.tsx # Context for watch later state
├── lib/
│   ├── tmdb.ts              # TMDB API client
│   └── streaming-providers.ts # Streaming provider config
├── next.config.js           # Next.js config
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
```

## Streaming Providers

The app supports the following streaming embed providers:

- VidSrc
- 2Embed
- SmashyStream
- SuperEmbed
- GoMovies
- EmbedSito
- AutoEmbed
- MultiEmbed
- VidBinge
- MoviesAPI

Providers are configurable in `lib/streaming-providers.ts`. The player automatically selects the fastest working provider and allows manual switching.

## Sandbox & Security

The embedded iframes are sandboxed with restrictive attributes:
- ✅ `allow-scripts` - Enable video playback
- ✅ `allow-same-origin` - Support player scripts
- ✅ `allow-presentation` - Full screen support
- ❌ `allow-popups` - Block unwanted popups
- ❌ `allow-top-navigation` - Prevent navigation away

Note: Third-party iframe behavior and ad-blocking are limited by browser sandbox policies. Full control over embedded content is not guaranteed.

## Legal & Terms of Service

⚠️ **Important**: This application uses third-party streaming embeds. Users are responsible for:
- Ensuring their use complies with local laws and regulations
- Respecting copyright and intellectual property rights
- Understanding the terms of service of streaming providers
- Using VPNs where streaming may be restricted

The developers of Eidos are not responsible for:
- Content availability or legality in any jurisdiction
- Third-party provider behavior or ToS changes
- Ads, malware, or harmful content from third-party embeds
- User violations of local laws or provider terms

## Environment Variables

```bash
# Required
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# Optional
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3 # Default
```

## Performance

- **Server-side rendering**: Fast page loads with streaming
- **Image optimization**: Next.js Image with lazy loading and blur placeholders
- **Caching**: TMDB data cached with configurable revalidation
- **Code splitting**: Automatic with Next.js App Router
- **Bundle size**: Minimal dependencies (React, Next.js, Tailwind)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

**Type check:**
```bash
npm run type-check
```

**Watch mode:**
```bash
npm run dev
```

## Troubleshooting

### "TMDB API key not set"
- Copy `.env.example` to `.env.local`
- Add your TMDB API key from https://www.themoviedb.org/settings/api

### Player not loading
- Check your internet connection
- Try switching to a different server (button in player)
- Check browser console for CORS errors (expected with third-party embeds)

### Build fails
```bash
npm run build
npm run lint
```

## License

MIT

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie and TV show database
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons
