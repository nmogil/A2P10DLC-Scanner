import { ScanRequest, FieldResult, FieldIssue, FixSuggestion } from '../types';

const URL_REGEX = /https?:\/\/\S+/gi;
const PHONE_REGEX = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

export function scanContentFlags(input: ScanRequest): FieldResult {
  const issues: FieldIssue[] = [];
  const suggestions: FixSuggestion[] = [];
  const allMessages = input.sampleMessages.join(' ');

  // Check: embedded links declared vs detected
  const hasLinks = URL_REGEX.test(allMessages);
  if (hasLinks && input.embeddedLinks === false) {
    issues.push({
      severity: 'warning',
      message: 'Sample messages contain URLs but "Embedded Links" is set to false.',
    });
    suggestions.push({
      issue: 'Embedded links mismatch',
      fix: 'Set the "Embedded Links" flag to true since your sample messages contain URLs.',
    });
  }

  // Check: embedded phone numbers declared vs detected
  const hasPhones = PHONE_REGEX.test(allMessages);
  if (hasPhones && input.embeddedPhoneNumbers === false) {
    issues.push({
      severity: 'warning',
      message: 'Sample messages contain phone numbers but "Embedded Phone Numbers" is set to false.',
    });
    suggestions.push({
      issue: 'Embedded phone numbers mismatch',
      fix: 'Set the "Embedded Phone Numbers" flag to true since your sample messages contain phone numbers.',
    });
  }

  // Check: description length
  const descLen = input.campaignDescription.trim().length;
  if (descLen < 40) {
    issues.push({
      severity: 'critical',
      message: `Campaign description is only ${descLen} characters. Descriptions under 40 characters are almost always rejected.`,
      twilioErrorCode: '30886',
    });
    suggestions.push({
      issue: 'Description too short',
      fix: 'Provide a detailed description of at least 100 characters that explains the campaign objective, target audience, and message content.',
      example:
        'This campaign sends weekly promotional offers and seasonal sale notifications to customers who opted in via our website checkout flow at example.com.',
    });
  } else if (descLen < 100) {
    issues.push({
      severity: 'warning',
      message: `Campaign description is ${descLen} characters. Descriptions under 100 characters are at risk of rejection for being too vague.`,
      twilioErrorCode: '30886',
    });
    suggestions.push({
      issue: 'Description may be too short',
      fix: 'Expand the description to clearly explain the campaign objective, target audience, and message content. Aim for at least 100 characters.',
    });
  }

  const tier = issues.some((i) => i.severity === 'critical') ? 'RED' : issues.length > 0 ? 'YELLOW' : 'GREEN';
  const rationale =
    tier === 'GREEN'
      ? 'Content flags are consistent with sample message content and description length is adequate.'
      : `Found ${issues.length} issue(s) with content flags or description length.`;

  return {
    field: 'contentFlags',
    displayName: 'Content Flags & Description Length',
    tier,
    rationale,
    issues,
    suggestions,
    evidence: { source: 'deterministic' },
  };
}
