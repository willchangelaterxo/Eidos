# Deployment Guide

## Vercel Deployment

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwillchangelaterxo%2FEidos&env=NEXT_PUBLIC_TMDB_API_KEY&envDescription=TMDB%20API%20Key&envLink=https%3A%2F%2Fwww.themoviedb.org%2Fsettings%2Fapi)

### Manual Setup
1. Push your repo to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project" and import the GitHub repository
4. Add environment variable:
   - `NEXT_PUBLIC_TMDB_API_KEY` = Your TMDB API key
5. Deploy!

## Replit Deployment

### Setup Steps
1. Visit [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Enter: `https://github.com/willchangelaterxo/Eidos`
4. Wait for import to complete
5. Click the "Run" button

### Configure Environment
1. Click "Secrets" (lock icon) in the left sidebar
2. Add secret: `NEXT_PUBLIC_TMDB_API_KEY` = Your TMDB API key
3. Click "Run" again

The app will start on a Replit URL (e.g., `https://eidos.willchangelaterxo.repl.co`)

## Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local and add your TMDB API key

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build & Test

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_TMDB_API_KEY` | ✅ Yes | TMDB API Key from https://www.themoviedb.org/settings/api |

## Troubleshooting

### "TMDB API key not set"
- Ensure `NEXT_PUBLIC_TMDB_API_KEY` is set in your environment
- For Vercel: Check "Settings" → "Environment Variables"
- For Replit: Check "Secrets" panel
- For local: Check `.env.local` file

### Build fails
```bash
npm run build
npm run lint
npm run type-check
```

### Port already in use (local)
```bash
npm run dev -- -p 3001
```

## Tips

- Keep your TMDB API key private (use environment variables, not in code)
- The `.env.local` file is gitignored
- Vercel automatically deploys on git push
- Replit deploys instantly when you click "Run"
