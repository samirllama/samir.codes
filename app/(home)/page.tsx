// import AnimatedLogo from '@/components/ui/AnimatedLogo'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen py-20">
      <section className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
        AnimatedLogo Place holder
          {/* <AnimatedLogo /> */}
          <h1 className="mt-8 text-4xl font-bold text-gray-900 dark:text-white">
            Full-Stack Developer & Technical Leader
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Building scalable web applications with cutting-edge technologies
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Featured Work</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Project cards would go here */}
          </div>
        </section>

        {/* Latest Posts Preview */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Articles</h2>
            <Link href="/posts" className="text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Post preview components would go here */}
          </div>
        </section>
      </section>
    </main>
  )
}
