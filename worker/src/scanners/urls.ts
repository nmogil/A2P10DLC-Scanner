import { ScanRequest, FieldResult } from '../types';
import { findShortenerUrls } from '../utils/urlShorteners';

export function scanUrls(input: ScanRequest): FieldResult {
  const allMessages = input.sampleMessages.join(' ');
  const shortenerUrls = findShortenerUrls(allMessages);

  if (shortenerUrls.length > 0) {
    return {
      field: 'sampleMessages',
      displayName: 'URL Shorteners in Messages',
      tier: 'RED',
      rationale: `Sample messages contain URL shortener links (${shortenerUrls.join(', ')}). TCR rejects campaigns with non-branded shortened URLs. Only dedicated, branded short domains are acceptable.`,
      issues: [
        {
          severity: 'critical',
          message: `URL shortener detected: ${shortenerUrls.join(', ')}`,
          twilioErrorCode: '30892',
        },
      ],
      suggestions: [
        {
          issue: 'URL shortener in sample messages',
          fix: 'Replace shortened URLs with full URLs or use a branded short domain owned by your business.',
          example: 'Instead of "bit.ly/abc123", use "https://yourbusiness.com/promo" or "https://shop.yourbrand.co/sale"',
        },
      ],
      evidence: { source: 'deterministic' },
    };
  }

  return {
    field: 'sampleMessages',
    displayName: 'URL Shorteners in Messages',
    tier: 'GREEN',
    rationale: 'No URL shortener links detected in sample messages.',
    issues: [],
    suggestions: [],
    evidence: { source: 'deterministic' },
  };
}
