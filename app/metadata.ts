import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  authors: [{ name: "Samir Lama", url: "https://samir.codes" }],
  creator: "Samir Lama",
  title: {
    default: "Samir Baki Lama",
    template: "%s | Samir Lama",
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%22100%22>🤠</text></svg>',
  },
  description:
    "Personal website and blog of Samir Lama, showcasing projects and sharing insights about web development.",

  keywords: [
    "web development",
    "design",
    "javascript",
    "software engineer",
    "react",
    "nextjs",
    "typescript",
    "python"
  ],

  publisher: "Samir Lama",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://samir.codes"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: 'https://samir.codes',
    siteName: "Samir Codes",
    title: "Samir Lama - Software Engineer in Chicago",
    description:
      "Personal website and blog of Samir Lama, showcasing projects and sharing insights about web development.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Samir Lama - Software Engineer based in Chicago",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Samir Lama - Software Engineer based in Chicago",
    description:
      "Personal website and blog showcasing web development projects and insights.",
    creator: "@",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

