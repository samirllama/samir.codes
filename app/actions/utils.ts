import { ratelimit } from '@/lib/rate-limiter';
import { getIpAddress } from '@/lib/server-utils';
import { z } from 'zod';

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

export function validateFormData<T extends z.ZodType<any, any>>(
  schema: T,
  formData: FormData
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string[] | undefined> } {
  const data = Object.fromEntries(formData.entries());
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: validationResult.data,
  };
}
