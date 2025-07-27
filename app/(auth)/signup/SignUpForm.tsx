// app/signup/SignUpForm.tsx
"use client";
import { useTransition } from "react";

export default function SignUpForm() {
  const [isPending] = useTransition();

  return (
    <form action="/signup" method="post" className="space-y-4 max-w-sm mx-auto">
      <input name="email" type="email" placeholder="Email" required />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        minLength={6}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isPending ? "Creating Account…" : "Create Account"}
      </button>
    </form>
  );
}
