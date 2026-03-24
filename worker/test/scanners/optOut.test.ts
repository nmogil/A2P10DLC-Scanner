import { describe, it, expect } from 'vitest';
import { scanOptOut } from '../../src/scanners/optOut';
import { ScanRequest } from '../../src/types';

const base: ScanRequest = {
  useCaseType: 'MARKETING',
  campaignDescription: 'Test',
  sampleMessages: ['Test'],
  messageFlow: 'Test',
};

describe('scanOptOut', () => {
  it('should return RED when no opt-out keywords provided', () => {
    const result = scanOptOut(base);
    expect(result.tier).toBe('RED');
  });

  it('should return RED when STOP is not in keywords', () => {
    const result = scanOptOut({ ...base, optOutKeywords: ['CANCEL', 'QUIT'] });
    expect(result.tier).toBe('RED');
  });

  it('should return GREEN when STOP is present', () => {
    const result = scanOptOut({ ...base, optOutKeywords: ['STOP'] });
    expect(result.tier).toBe('GREEN');
  });

  it('should be case-insensitive', () => {
    const result = scanOptOut({ ...base, optOutKeywords: ['stop'] });
    expect(result.tier).toBe('GREEN');
  });

  it('should return GREEN when STOP is among multiple keywords', () => {
    const result = scanOptOut({
      ...base,
      optOutKeywords: ['CANCEL', 'STOP', 'UNSUBSCRIBE'],
    });
    expect(result.tier).toBe('GREEN');
  });
});
