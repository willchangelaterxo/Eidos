import { buildProviderUrl, STREAM_PROVIDERS } from '@/lib/providers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tmdbId = searchParams.get('tmdbId');
    const mediaType = searchParams.get('mediaType') as 'movie' | 'tv' | null;
    const providerId = searchParams.get('providerId');
    const season = searchParams.get('season');
    const episode = searchParams.get('episode');

    if (!tmdbId || !mediaType || !providerId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const provider = STREAM_PROVIDERS.find((p) => p.id === providerId);

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    if (mediaType === 'tv' && !provider.supportsTV) {
      return NextResponse.json(
        { error: 'Provider does not support TV' },
        { status: 400 }
      );
    }

    const url = buildProviderUrl(
      provider,
      parseInt(tmdbId),
      mediaType,
      season ? parseInt(season) : undefined,
      episode ? parseInt(episode) : undefined
    );

    return NextResponse.json({ url, provider: provider.name });
  } catch (error) {
    console.error('Provider URL generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
