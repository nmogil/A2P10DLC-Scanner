import { Env } from '../types';
import { z, ZodSchema } from 'zod';

export interface AiMessage {
  role: 'system' | 'user';
  content: string;
}

const DEFAULT_MODEL = 'openai/gpt-4o-mini';

export async function runAiAnalysis<T>(
  env: Env,
  messages: AiMessage[],
  schema: ZodSchema<T>,
  retries = 1
): Promise<T | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(env.AI_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cf-aig-authorization': `Bearer ${env.CF_AIG_TOKEN}`,
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          messages,
          max_tokens: 1024,
          temperature: 0.1,
          response_format: { type: 'json_object' },
        }),
      });

      if (!res.ok) continue;

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = json.choices?.[0]?.message?.content;
      if (!text) continue;

      const parsed = JSON.parse(text.trim());
      const validated = schema.safeParse(parsed);
      if (validated.success) {
        return validated.data;
      }
    } catch {
      // retry
    }
  }

  return null;
}

export const aiResultSchema = z.object({
  tier: z.enum(['RED', 'YELLOW', 'GREEN']),
  issues: z.array(z.string()),
  suggestions: z.array(z.string()),
  rationale: z.string(),
});

export type AiResult = z.infer<typeof aiResultSchema>;
