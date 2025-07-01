'use client';

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, type ActionResponse } from "@/app/actions/auth";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}

export default function SignInForm() {
  const [state, formAction] = useFormState(signIn, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/playground");
    }
  }, [state.success, router]);

  return (
    <div className="contact-form">
      <div className="flow">
        <h1>Welcome Back!</h1>
        <p>Sign in to access your account.</p>
      </div>
      <form action={formAction}>
        {!state.success && state.message && (
          <div className="p-3 text-center text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
            {state.message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div className="form-group">
          <a href="#" className="fine-print">
            Forgot Password?
          </a>
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}