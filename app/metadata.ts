import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'Samir S. S. Llama',
    template: '%s | Samir S. S. Llama',
  },
  description: 'Personal website and posts of Samir S. S. Llama, a software engineer specializing in full-stack development, cloud architecture, and developer tools.',
  openGraph: {
    title: 'Samir S. S. Llama - Software Engineer & Full-Stack Developer',
    description: 'Personal website and posts of Samir S. S. Llama, a software engineer specializing in full-stack development, cloud architecture, and developer tools.',
    url: 'https://samir.codes',
    siteName: 'Samir.codes',
    images: [
      {
        url: 'https://samir.codes/og-image.jpg', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Samir S. S. Llama - Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@samir_llama', // Replace with your Twitter handle
    title: 'Samir S. S. Llama - Software Engineer & Full-Stack Developer',
    description: 'Personal website and posts of Samir S. S. Llama, a software engineer specializing in full-stack development, cloud architecture, and developer tools.',
    images: ['https://samir.codes/og-image.jpg'], // Replace with your actual OG image path
  },
  // Add other metadata as needed (e.g., icons, manifest)
};
