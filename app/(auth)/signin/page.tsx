import Link from "next/link";
import SignInForm from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-surface-page text-text-default">
      <div className="w-full max-w-sm p-8 mx-4 space-y-6 bg-surface-card rounded-2xl shadow-default">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-default">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Welcome back. Please enter your details.
          </p>
        </div>

        <SignInForm />

        <p className="text-sm text-center text-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium transition-colors text-accent-primary hover:text-opacity-80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}