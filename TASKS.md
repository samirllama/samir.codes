# Project Tasks

## High Priority

- [x] **Migrate Local Images to Vercel Blob**
  - **Objective:** Move all project images from the local `/public/assets` directory to Vercel Blob storage to optimize storage and delivery.
  - **Steps:**
    1.  **Setup Environment:** Run `npx vercel link` and `npx vercel env pull .env.local` to configure local development access to Vercel Blob.
    2.  **Create Upload Script:** Develop a Node.js script using the `@vercel/blob` SDK to:
        - Read project data from `lib/data/port-data.ts`.
        - Iterate through each project's `projectScreenshotUrl`.
        - Upload the corresponding local image file from `/public/assets` to Vercel Blob.
    3.  **Update Data Source:** Modify `lib/data/port-data.ts` to replace local image paths with the new Vercel Blob URLs returned by the upload script.
    4.  **Configure Next.js:** Update `next.config.js` to include the Vercel Blob storage hostname in the `images.remotePatterns` array. The hostname will look something like `[id].blob.vercel-storage.com`.
    5.  **Verification:** Run the application locally to confirm that all images are loading correctly from Vercel Blob.
    6.  **Cleanup:** Remove the now-unused image files from the `/public/assets` directory.
