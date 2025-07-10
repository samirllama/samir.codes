"use client";

import Link from "next/link";
import SignUpForm from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-surface-page text-text-default">
      <div className="w-full max-w-lg p-8 mx-2 space-y-6 bg-surface-card rounded-2xl shadow-default">
        <div className="text-center">
          <h1 className="text-h1 tracking-tight text-text-default">Sign Up</h1>
        </div>

        <SignUpForm />

        <p className="text-md text-center text-text-muted">
          Already have an account?
          <Link
            href="/signin"
            className="font-medium transition-colors text-accent-primary hover:text-opacity-80"
          >
            Sign in
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-menu-text transition-all duration-300 ease-out-quad group-hover:w-full"></span>
          </Link>
        </p>
      </div>
    </main>
  );
}
