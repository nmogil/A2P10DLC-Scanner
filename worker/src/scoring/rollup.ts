import { FieldResult, ScanTier, CriticalIssue, Warning } from '../types';

export interface RollupResult {
  overallTier: ScanTier;
  overallSummary: string;
  criticalIssues: CriticalIssue[];
  warnings: Warning[];
}

export function rollupResults(fieldResults: FieldResult[]): RollupResult {
  const criticalIssues: CriticalIssue[] = [];
  const warnings: Warning[] = [];

  let redCount = 0;
  let yellowCount = 0;

  for (const fr of fieldResults) {
    if (fr.tier === 'RED') {
      redCount++;
    } else if (fr.tier === 'YELLOW') {
      yellowCount++;
    }

    for (const issue of fr.issues) {
      if (issue.severity === 'critical') {
        criticalIssues.push({
          severity: 'critical',
          message: `[${fr.displayName}] ${issue.message}`,
          twilioErrorCode: issue.twilioErrorCode ?? null,
        });
      } else if (issue.severity === 'warning') {
        warnings.push({
          severity: 'warning',
          message: `[${fr.displayName}] ${issue.message}`,
        });
      }
    }
  }

  let overallTier: ScanTier;
  let overallSummary: string;

  if (redCount > 0) {
    overallTier = 'RED';
    overallSummary = `${redCount} critical issue(s) found that will likely cause campaign rejection. ${yellowCount > 0 ? `Plus ${yellowCount} warning(s).` : ''} Fix the critical issues before submitting.`;
  } else if (yellowCount >= 3) {
    overallTier = 'RED';
    overallSummary = `${yellowCount} warnings found — cumulative risk is high enough to likely cause rejection. Address at least some warnings before submitting.`;
  } else if (yellowCount > 0) {
    overallTier = 'YELLOW';
    overallSummary = `${yellowCount} warning(s) found. Campaign may pass but addressing these issues will improve your chances of approval.`;
  } else {
    overallTier = 'GREEN';
    overallSummary =
      'No issues detected. Campaign data appears compliant with A2P 10DLC requirements. Note: this is guidance only — TCR may apply additional unpublished checks.';
  }

  return { overallTier, overallSummary, criticalIssues, warnings };
}
