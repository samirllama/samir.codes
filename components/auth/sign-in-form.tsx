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
    <button
      type="submit"
      disabled={pending}
      className="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 rounded-md shadow-sm bg-accent-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}

export default function SignInForm() {
  const [state, formAction] = useFormState(signIn, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/work");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {!state.success && state.message && (
        <div className="p-3 text-center text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
          {state.message}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-muted"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full px-3 py-2 mt-1 bg-transparent border rounded-md shadow-sm border-border-default placeholder-text-muted focus:outline-none focus:ring-accent-primary focus:border-accent-primary sm:text-sm"
          placeholder="you@example.com"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-500">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-text-muted"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full px-3 py-2 mt-1 bg-transparent border rounded-md shadow-sm border-border-default placeholder-text-muted focus:outline-none focus:ring-accent-primary focus:border-accent-primary sm:text-sm"
          placeholder="••••••••"
        />
        {state.errors?.password && (
          <p className="mt-1 text-xs text-red-500">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}