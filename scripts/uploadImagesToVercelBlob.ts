import { put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import { projects } from '../lib/data/port-data.ts';

async function uploadImages() {
  console.log('Starting image upload to Vercel Blob...');

  for (const project of projects) {
    if (!project.projectScreenshotUrl) {
      console.warn(`Skipping project ${project.name}: projectScreenshotUrl is missing.`);
      continue;
    }
    const localImagePath = path.join(process.cwd(), 'public', project.projectScreenshotUrl);

    try {
      const imageBuffer = await fs.readFile(localImagePath);
      const filename = path.basename(project.projectScreenshotUrl);

      const blob = await put(filename, imageBuffer, {
        access: 'public',
        addRandomSuffix: false,
      });

      console.log(`Uploaded ${filename} to: ${blob.url}`);

      project.projectScreenshotUrl = blob.url;

    } catch (error) {
      console.error(`Failed to upload ${localImagePath}:`, error);
    }
  }

  const updatedPortDataPath = path.join(process.cwd(), 'lib', 'data', 'port-data.ts');
  const updatedContent = `export const projects = ${JSON.stringify(projects, null, 2)};`;
  await fs.writeFile(updatedPortDataPath, updatedContent);

  console.log('Image upload complete and port-data.ts updated.');
}

uploadImages().catch(console.error);
