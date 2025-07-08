import Link from "next/link";
import SignInForm from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-surface-page text-text-default">
      <div className="w-full max-w-lg p-8 mx-4 space-y-6 rounded-2xl glassy-card shadow-default">
        <SignInForm />

        <p className="text-sm text-center text-text-muted">
          Don&apos;t have an account?
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
