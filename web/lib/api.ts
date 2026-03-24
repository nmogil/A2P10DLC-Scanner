import { ScanRequest, ScanResponse, ErrorResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_WORKER_API_URL || 'http://localhost:8787';

export async function submitScan(data: ScanRequest, quick: boolean): Promise<ScanResponse> {
  const endpoint = quick ? '/api/v1/scan/quick' : '/api/v1/scan';

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as ErrorResponse;
    throw new ApiError(
      errorBody.error?.message || `HTTP ${response.status}`,
      response.status,
      errorBody.error?.details,
      errorBody.error?.retryAfterSeconds
    );
  }

  return response.json() as Promise<ScanResponse>;
}

export class ApiError extends Error {
  status: number;
  details?: { field?: string; issue: string }[];
  retryAfterSeconds?: number;

  constructor(
    message: string,
    status: number,
    details?: { field?: string; issue: string }[],
    retryAfterSeconds?: number
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
