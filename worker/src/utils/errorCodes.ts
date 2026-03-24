export interface ErrorCodeMapping {
  code: string;
  category: string;
  description: string;
  remediable: boolean;
}

export const TWILIO_ERROR_CODES: Record<string, ErrorCodeMapping> = {
  '30882': {
    code: '30882',
    category: 'Terms & Conditions Violation',
    description: 'Campaign violates Twilio general Terms & Conditions',
    remediable: false,
  },
  '30883': {
    code: '30883',
    category: 'Content Violation (SHAFT)',
    description: 'Campaign contains prohibited SHAFT content (Sex, Hate, Alcohol, Firearms, Tobacco)',
    remediable: false,
  },
  '30884': {
    code: '30884',
    category: 'Spam/Phishing Risk',
    description: 'Campaign deemed high risk for spam or phishing',
    remediable: false,
  },
  '30885': {
    code: '30885',
    category: 'Fraudulent Activity',
    description: 'Campaign deemed potentially fraudulent',
    remediable: false,
  },
  '30886': {
    code: '30886',
    category: 'Invalid Campaign Description',
    description: 'Campaign description is invalid, too vague, or does not match the use case',
    remediable: true,
  },
  '30892': {
    code: '30892',
    category: 'URL Shortener in Sample Message',
    description: 'Sample message contains a non-branded URL shortener',
    remediable: true,
  },
  '30893': {
    code: '30893',
    category: 'Invalid Sample Message',
    description: 'Sample messages are unclear, missing, or do not match the campaign use case',
    remediable: true,
  },
  '30897': {
    code: '30897',
    category: 'Disallowed Content',
    description: 'Campaign submission rejected due to disallowed content',
    remediable: false,
  },
};

export function getErrorCodeInfo(code: string): ErrorCodeMapping | undefined {
  return TWILIO_ERROR_CODES[code];
}
