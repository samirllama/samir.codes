import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { verifyPassword, hashPassword } from "@/lib/auth-server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { withRateLimit, validateFormData } from "./utils";
import type { ActionResponse } from "./utils";

const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const SignUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

async function signInAction(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const validation = validateFormData(SignInSchema, formData);
  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    };
  }

  const { email, password } = validation.data;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    await createSession(user.id);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    console.error("Sign-in error:", error);
    return {
      success: false,
      message: "An internal error occurred. Please try again.",
    };
  }
}

async function signUpAction(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const validation = validateFormData(SignUpSchema, formData);
  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    };
  }

  const { email, password } = validation.data;

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    const hashedPassword = await hashPassword(password);
    const id = nanoid();

    const [newUser] = await db
      .insert(users)
      .values({ id, email, password: hashedPassword })
      .returning();
    if (!newUser) {
      return { success: false, message: "Failed to create user" };
    }

    await createSession(newUser.id);
    return { success: true, message: "Account created successfully" };
  } catch (error) {
    console.error("Sign-up error:", error);
    return {
      success: false,
      message: "An error occurred while creating your account.",
    };
  }
}

export const signIn = withRateLimit(signInAction);
export const signUp = withRateLimit(signUpAction);

export async function signOut(): Promise<void> {
  try {
    await deleteSession();
  } catch (error) {
    // redirect the finally block and log the error.
    console.error("Sign-out error:", error);
    throw new Error("Failed to sign out");
  } finally {
    redirect("/signin");
  }
}

