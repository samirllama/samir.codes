'use client'

import { useEffect, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
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
    <button type="submit" disabled={pending}>
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push('/playground')
    }
  }, [state.success, router])

  return (
    <div className="contact-form">
      <div className="flow">
        <h1>Create Your Account</h1>
        <p>Join us! Fill in your details to get started.</p>
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
            <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
          />
          {state.errors?.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{state.errors.confirmPassword[0]}</p>
          )}
        </div>

        <div className="form-group">
          <input type="checkbox" id="signup-privacy" />
          <label htmlFor="signup-privacy" className="fine-print">
            I agree to the <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>
          </label>
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}