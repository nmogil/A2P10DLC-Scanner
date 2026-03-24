import { ScanRequest, FieldResult } from '../types';

export function scanOptOut(input: ScanRequest): FieldResult {
  const keywords = input.optOutKeywords ?? [];
  const hasStop = keywords.some((k) => k.toUpperCase() === 'STOP');

  if (!hasStop) {
    return {
      field: 'optOutKeywords',
      displayName: 'Opt-Out Keywords',
      tier: 'RED',
      rationale:
        'The opt-out keywords do not include "STOP". CTIA guidelines require STOP as a mandatory opt-out keyword for all A2P messaging campaigns.',
      issues: [
        {
          severity: 'critical',
          message: 'Missing required "STOP" opt-out keyword',
          twilioErrorCode: null,
        },
      ],
      suggestions: [
        {
          issue: 'Missing STOP keyword',
          fix: 'Add "STOP" to your opt-out keywords list.',
          example: 'Opt-out keywords: STOP, UNSUBSCRIBE, CANCEL',
        },
      ],
      evidence: { source: 'deterministic' },
    };
  }

  return {
    field: 'optOutKeywords',
    displayName: 'Opt-Out Keywords',
    tier: 'GREEN',
    rationale: '"STOP" keyword is present in opt-out keywords.',
    issues: [],
    suggestions: [],
    evidence: { source: 'deterministic' },
  };
}
