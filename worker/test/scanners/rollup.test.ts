import { describe, it, expect } from 'vitest';
import { rollupResults } from '../../src/scoring/rollup';
import { FieldResult } from '../../src/types';

function makeResult(tier: 'RED' | 'YELLOW' | 'GREEN', field: string): FieldResult {
  return {
    field,
    displayName: field,
    tier,
    rationale: 'test',
    issues:
      tier === 'RED'
        ? [{ severity: 'critical', message: 'test issue' }]
        : tier === 'YELLOW'
          ? [{ severity: 'warning', message: 'test warning' }]
          : [],
    suggestions: [],
    evidence: { source: 'deterministic' },
  };
}

describe('rollupResults', () => {
  it('should return RED if any field is RED', () => {
    const result = rollupResults([
      makeResult('GREEN', 'a'),
      makeResult('RED', 'b'),
      makeResult('GREEN', 'c'),
    ]);
    expect(result.overallTier).toBe('RED');
  });

  it('should return RED if 3+ YELLOW fields', () => {
    const result = rollupResults([
      makeResult('YELLOW', 'a'),
      makeResult('YELLOW', 'b'),
      makeResult('YELLOW', 'c'),
      makeResult('GREEN', 'd'),
    ]);
    expect(result.overallTier).toBe('RED');
  });

  it('should return YELLOW for 1-2 YELLOW fields', () => {
    const result = rollupResults([
      makeResult('YELLOW', 'a'),
      makeResult('GREEN', 'b'),
      makeResult('GREEN', 'c'),
    ]);
    expect(result.overallTier).toBe('YELLOW');
  });

  it('should return GREEN when all fields are GREEN', () => {
    const result = rollupResults([
      makeResult('GREEN', 'a'),
      makeResult('GREEN', 'b'),
      makeResult('GREEN', 'c'),
    ]);
    expect(result.overallTier).toBe('GREEN');
  });

  it('should collect critical issues', () => {
    const result = rollupResults([makeResult('RED', 'a')]);
    expect(result.criticalIssues.length).toBe(1);
    expect(result.criticalIssues[0].severity).toBe('critical');
  });

  it('should collect warnings', () => {
    const result = rollupResults([makeResult('YELLOW', 'a')]);
    expect(result.warnings.length).toBe(1);
  });
});
