import { getCurrentUser } from '@/lib/dal'
import { signOut } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

// This is a server component, so we can fetch data directly.
export default async function WorkPage() {
  const user = await getCurrentUser()

  // Although the middleware should protect this page, this is an extra layer of security.
  // If for any reason the user object is not found, redirect to sign-in.
  if (!user) {
    redirect('/signin')
  }

  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-surface-page text-text-default">
      <div className="w-full max-w-md p-8 mx-4 text-center bg-surface-card rounded-2xl shadow-default">
        <h1 className="text-3xl font-bold tracking-tight text-text-default">
          Welcome Back
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          You are signed in as <span className="font-semibold text-accent-primary">{user.email}</span>.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          This is a protected page. Only authenticated users can see this.
        </p>

        <div className="mt-8">
          <form action={signOut}>
            <button
              type="submit"
              className="w-full max-w-xs px-4 py-2 mx-auto text-sm font-semibold text-white transition-colors duration-200 rounded-md shadow-sm bg-accent-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary disabled:opacity-60"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}