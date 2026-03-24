export type ScanTier = 'RED' | 'YELLOW' | 'GREEN';

export interface ScanRequest {
  useCaseType: string;
  campaignDescription: string;
  sampleMessages: string[];
  messageFlow: string;
  businessName?: string;
  privacyPolicyUrl?: string;
  websiteUrl?: string;
  termsOfServiceUrl?: string;
  optInKeywords?: string[];
  optOutKeywords?: string[];
  helpKeywords?: string[];
  optInMessage?: string;
  optOutMessage?: string;
  helpMessage?: string;
  embeddedLinks?: boolean;
  embeddedPhoneNumbers?: boolean;
  ageGatedContent?: boolean;
  directLending?: boolean;
  numberPool?: boolean;
}

export interface FieldIssue {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  twilioErrorCode?: string | null;
}

export interface FixSuggestion {
  issue: string;
  fix: string;
  example?: string;
}

export interface FieldResult {
  field: string;
  displayName: string;
  tier: ScanTier;
  rationale: string;
  issues: FieldIssue[];
  suggestions: FixSuggestion[];
  evidence: {
    source: 'deterministic' | 'ai' | 'firecrawl' | 'ai+firecrawl';
  };
}

export interface CriticalIssue {
  severity: 'critical';
  message: string;
  twilioErrorCode: string | null;
}

export interface Warning {
  severity: 'warning';
  message: string;
}

export interface ScanResponse {
  scanId: string;
  timestamp: string;
  rulesVersion: string;
  overallTier: ScanTier;
  overallSummary: string;
  criticalIssues: CriticalIssue[];
  warnings: Warning[];
  fieldResults: FieldResult[];
  metadata: {
    scanDurationMs: number;
    fieldsAnalyzed: number;
    aiModel: string;
    urlsCrawled: string[];
    quickScan?: boolean;
    partial?: boolean;
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: { field?: string; issue: string }[];
    retryAfterSeconds?: number;
    traceId: string;
  };
}
