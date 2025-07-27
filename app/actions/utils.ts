import { ratelimit } from '@/lib/rate-limiter';
import { getIpAddress } from '@/lib/server-utils';

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
  error?: string;
};

export function withRateLimit(
  action: (prevState: ActionResponse, formData: FormData) => Promise<ActionResponse>
) {
  return async (prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
    const ip = await getIpAddress();
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return {
        success: false,
        message: 'Too many requests. Please try again later.',
        error: 'Rate limit exceeded',
      };
    }

    return action(prevState, formData);
  };
}

