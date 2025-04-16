// @/component/slider/slideData.ts
export interface SlideContent {
    id: string;
    title: string;
    text: string;
    imageUrl?: string; // Optional image for the right column
    bgColor: string; // Background color for the slide section
  }

  export const slides: SlideContent[] = [
    {
      id: 'intro',
      title: 'Welcome to Our Story',
      text: 'This is the beginning. Scroll down to see how things progress. Notice how the columns behave as you scroll through this section.',
      imageUrl: '/assets/blast-off.png',
      bgColor: 'bg-pastel-primary' // Light Blue
    },
    {
      id: 'middle',
      title: 'The Developing Chapter',
      text: 'Here, things start to change. The content on the left might be longer than the image placeholder on the right, demonstrating the sticky effect more clearly. Keep scrolling!',
      imageUrl: '/assets/astro-2.png',
      bgColor: 'bg-pastel-secondary' // Pink
    },
    {
      id: 'end',
      title: 'Looking Ahead',
      text: 'This marks a new phase. We explore future possibilities. Sticky positioning allows key information or visuals to remain present as related details scroll by.',
      imageUrl: '/assets/astro-3.png',
      bgColor: 'bg-pastel-accent' // Mint Green
    },
    {
      id: 'extra',
      title: 'More Details',
      imageUrl: '/assets/astro-5.png',
      text: 'Adding some extra content here to ensure scrolling is significant enough to see the sticky effect properly on multiple sections. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      // No image for this one to show variation
      bgColor: 'bg-indigo-100' // Different Pastel
    },
  ];
