import Link from "next/link"
import { Suspense } from "react"
import Button from "@/components/ui/Button"
import DashboardButton from "@/components/DashboardButton"

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-dark-border-subtle bg-white dark:bg-dark-base">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Mode
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/features"
              className="text-sm font-medium hover:text-purple-600"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-purple-600"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium hover:text-purple-600"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Suspense
            fallback={
              <div className="flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="outline">Sign in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            }
          >
            <DashboardButton />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
