import { ScanRequest, FieldResult } from '../types';

export function scanHelpKeywords(input: ScanRequest): FieldResult {
  const keywords = input.helpKeywords ?? [];
  const hasHelp = keywords.some((k) => k.toUpperCase() === 'HELP');

  if (!hasHelp) {
    return {
      field: 'helpKeywords',
      displayName: 'Help Keywords',
      tier: 'RED',
      rationale:
        'The help keywords do not include "HELP". CTIA guidelines require HELP as a mandatory keyword for all A2P messaging campaigns.',
      issues: [
        {
          severity: 'critical',
          message: 'Missing required "HELP" keyword',
          twilioErrorCode: null,
        },
      ],
      suggestions: [
        {
          issue: 'Missing HELP keyword',
          fix: 'Add "HELP" to your help keywords list.',
          example: 'Help keywords: HELP, INFO',
        },
      ],
      evidence: { source: 'deterministic' },
    };
  }

  return {
    field: 'helpKeywords',
    displayName: 'Help Keywords',
    tier: 'GREEN',
    rationale: '"HELP" keyword is present in help keywords.',
    issues: [],
    suggestions: [],
    evidence: { source: 'deterministic' },
  };
}
