import { describe, it, expect } from 'vitest';
import { scanUrls } from '../../src/scanners/urls';
import { ScanRequest } from '../../src/types';

function makeRequest(messages: string[]): ScanRequest {
  return {
    useCaseType: 'MARKETING',
    campaignDescription: 'Test campaign',
    sampleMessages: messages,
    messageFlow: 'Test flow',
  };
}

describe('scanUrls', () => {
  it('should return RED when bit.ly is present', () => {
    const result = scanUrls(makeRequest(['Check out bit.ly/abc123']));
    expect(result.tier).toBe('RED');
    expect(result.issues[0].twilioErrorCode).toBe('30892');
  });

  it('should return RED when tinyurl.com is present', () => {
    const result = scanUrls(makeRequest(['Visit tinyurl.com/xyz']));
    expect(result.tier).toBe('RED');
  });

  it('should return RED when t.co is present', () => {
    const result = scanUrls(makeRequest(['Link: https://t.co/abc']));
    expect(result.tier).toBe('RED');
  });

  it('should return GREEN for full URLs', () => {
    const result = scanUrls(makeRequest(['Visit https://example.com/promo']));
    expect(result.tier).toBe('GREEN');
  });

  it('should return GREEN when no URLs present', () => {
    const result = scanUrls(makeRequest(['Hello, your order is ready!']));
    expect(result.tier).toBe('GREEN');
  });

  it('should detect shorteners across multiple messages', () => {
    const result = scanUrls(
      makeRequest(['Message one is fine', 'But message two has https://goo.gl/short'])
    );
    expect(result.tier).toBe('RED');
  });
});
