"use server";

import { z } from "zod";
import { db } from "@/db";
import { users, passwordResetTokens } from "@/db/schema";
import bcrypt from 'bcryptjs';
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const forgotPasswordSchema = z.string().email();

export async function actionSignUpUser(values: unknown) {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = nanoid();

  try {
    await db.insert(users).values({
      id: userId,
      email: email,
      password: hashedPassword,
    });
  } catch (e) {
    return {
      error: "Email already in use",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // Redirect to home page after successful signup and login
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("CredentialsSignin")) {
        return {
          error: "Invalid credentials.",
        };
      }
    }
    throw error; // Re-throw other errors
  }

  return {
    success: true,
  };
}

export async function actionForgotPassword(email: string) {
  const validatedEmail = forgotPasswordSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      error: "Invalid email address",
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, validatedEmail.data),
  });

  // Always return a generic success message to prevent email enumeration
  if (!user) {
    return {
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    };
  }

  const token = nanoid(32); // Generate a secure, random token
  const expiresAt = new Date(Date.now() + 3600 * 1000); // Token valid for 1 hour

  try {
    await db.insert(passwordResetTokens).values({
      token: token,
      userId: user.id,
      expiresAt: expiresAt,
    });
  } catch (e) {
    console.error("Error inserting password reset token:", e);
    return {
      error: "Failed to generate password reset link. Please try again.",
    };
  }

  // TODO: Send email with the reset link
  console.log(`Password reset link for ${user.email}: /reset-password/${token}`);

  return {
    success: true,
    message: "If an account with that email exists, a password reset link has been sent.",
  };
}

export async function actionResetPassword(token: string, newPassword: string) {
  const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(8),
  });

  const validatedFields = resetPasswordSchema.safeParse({ token, newPassword });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { token: validatedToken, newPassword: validatedNewPassword } = validatedFields.data;

  const resetTokenEntry = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, validatedToken),
  });

  if (!resetTokenEntry || resetTokenEntry.expiresAt < new Date()) {
    return {
      error: "Invalid or expired token.",
    };
  }

  const hashedPassword = await bcrypt.hash(validatedNewPassword, 10);

  try {
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, resetTokenEntry.userId));

    await db.delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, validatedToken));

    return {
      success: true,
      message: "Password has been reset successfully.",
    };
  } catch (e) {
    console.error("Error resetting password:", e);
    return {
      error: "Failed to reset password. Please try again.",
    };
  }
}
