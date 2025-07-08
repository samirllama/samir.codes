
export interface SlideContent {
    id: string;
    title: string;
    text: string;
    imageUrl?: string;
    bgColor: string;
  }

  export const slides: SlideContent[] = [
    {
      id: 'intro',
      title: 'Welcome to Our Story',
      text: 'This is the beginning. Scroll down to see how things progress. Notice how the columns behave as you scroll through this section.',
      imageUrl: '/assets/blast-off.png',
      
    },
    {
      id: 'middle',
      title: 'The Developing Chapter',
      text: 'Here, things start to change. The content on the left might be longer than the image placeholder on the right, demonstrating the sticky effect more clearly. Keep scrolling!',
      imageUrl: '/assets/astro-2.png',
      
    },
    {
      id: 'end',
      title: 'Looking Ahead',
      text: 'This marks a new phase. We explore future possibilities. Sticky positioning allows key information or visuals to remain present as related details scroll by.',
      imageUrl: '/assets/astro-3.png',
      
    },
    {
      id: 'extra',
      title: 'More Details',
      imageUrl: '/assets/astro-5.png',
      text: 'Adding some extra content here to ensure scrolling is significant enough to see the sticky effect properly on multiple sections. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      
      
    },
  ];
