import { z } from 'zod';

/**
 * 🔐 Password strength rules:
 *  Minimum 8 characters
 *  At least one uppercase, lowercase, number, and special character
 */
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character');

/**
 * 🧾 Registration schema
 */
export const registerSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

/**
 * 🔁 Reset password schema (for future use)
 */
export const resetPasswordSchema = z
    .object({
        token: z.string().min(1, 'Token is required'),
        newPassword: passwordSchema,
        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Passwords do not match',
        path: ['confirmNewPassword'],
    });
