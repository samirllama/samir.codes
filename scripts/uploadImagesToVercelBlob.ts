import * as dotenv from 'dotenv';
import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

dotenv.config({ path: '.env.local' })

async function uploadImagesToVercelBlob(imagePaths: string[]) {
  console.log('Starting image upload to Vercel Blob...');

  for (const relativeImagePath of imagePaths) {
    const localImagePath = path.join(process.cwd(), 'public', relativeImagePath);

    try {
      const imageBuffer = await fs.readFile(localImagePath);
      const filename = path.basename(relativeImagePath);

      const blob = await put(filename, imageBuffer, {
        access: 'public',
        addRandomSuffix: false,
      });

      console.log(`Uploaded ${relativeImagePath} to: ${blob.url}`);

    } catch (error) {
      console.error(`Failed to upload ${localImagePath}:`, error);
    }
  }

  console.log('Image upload complete.');
}

// Example Usage:
// To use this script, call it with an array of relative paths
// to images within your 'public' directory.
// For example: uploadImagesToVercelBlob(['/assets/my-new-image.png', '/assets/another-image.jpg']);

const imagePaths = process.argv.slice(2)
if (!imagePaths.length) {
  console.error('No image paths provided. Please run the script like: ts-node scripts/uploadImage.ts <path1> <path2> ...');
} else {
  uploadImagesToVercelBlob(imagePaths)
}
