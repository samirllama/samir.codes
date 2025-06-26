// lib/gsap.ts

import { gsap, Expo } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(Expo, ScrollTrigger, MotionPathPlugin);

export { gsap, Expo, ScrollTrigger, MotionPathPlugin };
