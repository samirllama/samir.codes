"use client";

import { MDXRemote } from 'next-mdx-remote/rsc';
import { componentsForMdx } from '@/mdx-components';

export default function MdxRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={componentsForMdx} />;
}