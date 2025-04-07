import { Timestamp } from "@/components/Timestamp"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border-subtle bg-white dark:bg-dark-base">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* ...existing footer content... */}
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-gray-600">
              &copy; <Timestamp /> Mode. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
