'use client'

import Link from 'next/link'
import SignUpForm from '@/components/auth/sign-up-form'

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-surface-page text-text-default">
      <div className="w-full max-w-sm p-8 mx-4 space-y-6 bg-surface-card rounded-2xl shadow-default">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-default">
            Sign Up
          </h1>
        </div>

        <SignUpForm />

        <p className="text-sm text-center text-text-muted">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-medium transition-colors text-accent-primary hover:text-opacity-80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}