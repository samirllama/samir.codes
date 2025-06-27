// lib/gsap.ts

import { gsap, Expo } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(Expo, ScrollTrigger, MotionPathPlugin);

export { gsap, useGSAP, Expo, ScrollTrigger, MotionPathPlugin };
