// app/post/[slug]/fibonacci-spiral/page.tsx
import FibonacciSpiral from '@/components'; // Adjust import path if needed

// This page component can remain a Server Component because all the
// browser-specific logic is encapsulated within the FibonacciSpiral Client Component.
// It receives the dynamic 'slug' parameter, although we don't use it in this example.
export default function FibonacciSpiralPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      {/* You could add content here related to the specific 'post' using params.slug */}
      {/* <h1>Fibonacci Spiral for Post: {params.slug}</h1> */}

      {/* Render the Client Component that handles the animation */}
      <FibonacciSpiral />
    </div>
  );
}
