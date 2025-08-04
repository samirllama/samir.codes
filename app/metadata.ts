import type { Metadata } from 'next';


export const defaultMetadata: Metadata = {
  title: {
    default: "Samir Lama",
    template: "%s | Samir Lama",
  },
  description: "Personal website and a catalog of experiments by Samir Lama.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Samir Lama – Software Engineer",
    description:
      "Personal website and posts of Samir Lama, specializing in full-stack, cloud and dev tools.",
    url: "https://samir.codes",
    siteName: "Samir.codes",
    images: [
      {
        url: "https://samir.codes/api/og?title=Home&subtitle=Welcome&theme=gradient&author=Samir",
        width: 1200,
        height: 630,
        alt: "Dynamic OG image for samir.codes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Lama – Full-Stack Developer",
    description:
      "A curated collection of code experiments and tutorials by Samir Lama.",
    images: ["https://samir.codes/api/og?title=Home&theme=gradient&author=Samir"],
  },
};
