import { Env } from '../types';

export interface FirecrawlResult {
  success: boolean;
  content: string;
  statusCode: number;
  error?: string;
}

const TIMEOUT_MS = 15000;
const MAX_CONTENT_LENGTH = 50000;

export async function scrapeUrl(url: string, env: Env): Promise<FirecrawlResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      return {
        success: false,
        content: '',
        statusCode: status,
        error: `HTTP ${status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as {
      success: boolean;
      data?: { markdown?: string };
      error?: string;
    };

    if (!data.success) {
      return {
        success: false,
        content: '',
        statusCode: 200,
        error: data.error || 'Firecrawl returned unsuccessful response',
      };
    }

    const content = (data.data?.markdown || '').slice(0, MAX_CONTENT_LENGTH);

    return {
      success: true,
      content,
      statusCode: 200,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === 'AbortError') {
      return {
        success: false,
        content: '',
        statusCode: 0,
        error: 'Request timed out after 15 seconds',
      };
    }

    return {
      success: false,
      content: '',
      statusCode: 0,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

export async function crawlUrls(
  urls: { label: string; url: string }[],
  env: Env
): Promise<Map<string, FirecrawlResult>> {
  const results = new Map<string, FirecrawlResult>();
  const settled = await Promise.allSettled(
    urls.map(async ({ label, url }) => {
      const result = await scrapeUrl(url, env);
      return { label, result };
    })
  );

  for (const entry of settled) {
    if (entry.status === 'fulfilled') {
      results.set(entry.value.label, entry.value.result);
    } else {
      results.set('unknown', {
        success: false,
        content: '',
        statusCode: 0,
        error: 'Promise rejected',
      });
    }
  }

  return results;
}
