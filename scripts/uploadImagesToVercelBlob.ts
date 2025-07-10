import { put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';

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
// To use this script, you would call it with an array of relative paths
// to images within your 'public' directory.
// For example: uploadImagesToVercelBlob(['/assets/my-new-image.png', '/assets/another-image.jpg']);

// If you want to run this script directly from the command line with specific images,
// you can modify the following line:
// For now, it's commented out as it's a utility function.
// uploadImagesToVercelBlob(['/placeholder.svg']).catch(console.error);