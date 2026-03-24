import { describe, it, expect } from 'vitest';
import { scanContentFlags } from '../../src/scanners/contentFlags';
import { ScanRequest } from '../../src/types';

const base: ScanRequest = {
  useCaseType: 'MARKETING',
  campaignDescription: 'A sufficiently long campaign description that explains what this campaign does in detail for testing purposes here.',
  sampleMessages: ['Test message'],
  messageFlow: 'Test flow',
};

describe('scanContentFlags', () => {
  it('should return RED for very short descriptions', () => {
    const result = scanContentFlags({ ...base, campaignDescription: 'Marketing texts' });
    expect(result.tier).toBe('RED');
    expect(result.issues.some((i) => i.twilioErrorCode === '30886')).toBe(true);
  });

  it('should return YELLOW for descriptions under 100 chars', () => {
    const result = scanContentFlags({
      ...base,
      campaignDescription: 'We send promotional offers to customers who signed up on our website.',
    });
    expect(result.tier).toBe('YELLOW');
  });

  it('should return GREEN for adequate descriptions', () => {
    const result = scanContentFlags(base);
    expect(result.tier).toBe('GREEN');
  });

  it('should warn when links present but flag is false', () => {
    const result = scanContentFlags({
      ...base,
      sampleMessages: ['Visit https://example.com for deals'],
      embeddedLinks: false,
    });
    expect(result.issues.some((i) => i.message.includes('URLs'))).toBe(true);
  });

  it('should warn when phone numbers present but flag is false', () => {
    const result = scanContentFlags({
      ...base,
      sampleMessages: ['Call us at 555-123-4567 for info'],
      embeddedPhoneNumbers: false,
    });
    expect(result.issues.some((i) => i.message.includes('phone numbers'))).toBe(true);
  });
});
