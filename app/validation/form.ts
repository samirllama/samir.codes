// app/validation/form.ts

import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
})

export const SignUpSchema = z
    .object({
        email: z.string().min(1, 'Email is required').email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })


export function validateFormData<
    Output = unknown,
    Def extends z.ZodTypeDef = z.ZodTypeDef,
    Input = unknown,
    T extends z.ZodType<Output, Def, Input> = z.ZodType<Output, Def, Input>
>(
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

