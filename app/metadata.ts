import type { Metadata } from 'next';


export const defaultMetadata: Metadata = {
  title: { default: 'Samir Lama', template: '%s | Samir Lama' },
  description:
    'Dive into Samir Lama’s personal playground: a growing catalog of in-depth tutorials, code experiments, and real-world guides on full-stack development, cloud architecture, and modern developer tooling.',

  openGraph: {
    title: 'Samir Lama – Software Engineer',
    description:
      'A catalog of in-depth tutorials and experiments on full-stack development, cloud, and developer tooling.',
    url: 'https://samir.codes',
    siteName: 'Samir.codes',
    locale: 'en_US',
    type: 'website',
  },

  twitter: { card: 'summary_large_image' },
};
