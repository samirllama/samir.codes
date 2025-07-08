"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
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
      className="w-full px-4 py-2 text-white bg-accent-primary rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
      router.push("/playground");
    }
  }, [state.success, router]);

  return (
    <div className="w-full glassy-card p-8 rounded-2xl shadow-default flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-default">Welcome Back!</h2>
        <p className="mt-2 text-sm text-text-muted">
          Sign in to access your account.
        </p>
      </div>
      <form
        action={formAction}
        className="flex flex-col items-center w-full gap-4"
      >
        {!state.success && state.message && (
          <div className="p-3 text-center text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
            {state.message}
          </div>
        )}

        <div className="relative w-full">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder=" "
            className="peer block w-full px-3 py-2 border border-border-light rounded-md shadow-sm focus:ring-accent-primary focus:border-accent-primary bg-surface-input text-text-default placeholder-text-muted pt-6"
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted duration-200 transform origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-accent-primary"
          >
            Email
          </label>
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="relative w-full">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder=" "
            className="peer block w-full px-3 py-2 border border-border-light rounded-md shadow-sm focus:ring-accent-primary focus:border-accent-primary bg-surface-input text-text-default placeholder-text-muted pt-6"
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted duration-200 transform origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-accent-primary"
          >
            Password
          </label>
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
          {/* Placeholder for password toggle icon */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {/* Icon will go here */}
          </div>
        </div>

        <div className="text-center">
          <a
            href="#"
            className="text-sm font-medium text-accent-primary hover:text-opacity-80"
          >
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
