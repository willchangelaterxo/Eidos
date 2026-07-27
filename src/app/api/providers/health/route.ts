import { STREAM_PROVIDERS, buildProviderUrl } from '@/lib/providers';
import { NextRequest, NextResponse } from 'next/server';

interface ProviderHealth {
  id: string;
  name: string;
  url: string;
  isHealthy: boolean;
  responseTime: number;
}

async function checkProviderHealth(
  provider: (typeof STREAM_PROVIDERS)[0],
  tmdbId: number,
  mediaType: 'movie' | 'tv'
): Promise<ProviderHealth> {
  const url = buildProviderUrl(provider, tmdbId, mediaType);
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }).catch(() =>
      fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })
    );

    clearTimeout(timeout);
    const responseTime = Date.now() - startTime;

    return {
      id: provider.id,
      name: provider.name,
      url,
      isHealthy: response.ok || response.status < 500,
      responseTime,
    };
  } catch (error) {
    return {
      id: provider.id,
      name: provider.name,
      url,
      isHealthy: false,
      responseTime: Date.now() - startTime,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tmdbId, mediaType } = body as { tmdbId: number; mediaType: 'movie' | 'tv' };

    if (!tmdbId || !mediaType) {
      return NextResponse.json(
        { error: 'Missing required parameters: tmdbId, mediaType' },
        { status: 400 }
      );
    }

    const healthChecks = await Promise.all(
      STREAM_PROVIDERS.map((provider) => checkProviderHealth(provider, tmdbId, mediaType))
    );

    const healthyProviders = healthChecks
      .filter((h) => h.isHealthy)
      .sort((a, b) => a.responseTime - b.responseTime);

    const recommended = healthyProviders[0] || healthChecks[0];

    return NextResponse.json({
      recommended,
      allProviders: healthChecks,
      healthyCount: healthyProviders.length,
    });
  } catch (error) {
    console.error('Provider health check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
