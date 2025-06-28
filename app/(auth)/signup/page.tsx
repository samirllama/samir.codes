'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp, type ActionResponse } from '@/app/actions/auth'

// Initial state for the form
const initialState: ActionResponse = {
  success: false,
  message: '',
}

// A separate component for the submit button to use the useFormStatus hook
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 rounded-md shadow-sm bg-accent-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  )
}

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState)
  const router = useRouter()

  // Effect to handle redirection on successful sign-up
  useEffect(() => {
    if (state.success) {
      // Redirect to a protected route
      router.push('/work')
    }
  }, [state.success, router])

  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-surface-page text-text-default">
      <div className="w-full max-w-sm p-8 mx-4 space-y-6 bg-surface-card rounded-2xl shadow-default">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-default">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Get started by creating your account.
          </p>
        </div>

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
              <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
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
              autoComplete="new-password"
              required
              className="block w-full px-3 py-2 mt-1 bg-transparent border rounded-md shadow-sm border-border-default placeholder-text-muted focus:outline-none focus:ring-accent-primary focus:border-accent-primary sm:text-sm"
              placeholder="••••••••"
            />
            {state.errors?.password && (
              <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-muted"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full px-3 py-2 mt-1 bg-transparent border rounded-md shadow-sm border-border-default placeholder-text-muted focus:outline-none focus:ring-accent-primary focus:border-accent-primary sm:text-sm"
              placeholder="••••••••"
            />
            {state.errors?.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{state.errors.confirmPassword[0]}</p>
            )}
          </div>

          <div>
            <SubmitButton />
          </div>
        </form>

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