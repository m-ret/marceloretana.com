import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const publicDir = join(rootDir, "public");
const appDir = join(rootDir, "app");

const sourceImage = join(publicDir, "profile.jpeg");

async function generateImages() {
  console.log("Generating images from profile.jpeg...");

  // Load source image
  const image = sharp(sourceImage);
  const metadata = await image.metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}`);

  // 1. Favicon (32x32) - crop to face area
  await sharp(sourceImage)
    .extract({ left: 0, top: 0, width: metadata.width, height: metadata.width })
    .resize(32, 32)
    .png()
    .toFile(join(appDir, "favicon.ico"));
  console.log("Created favicon.ico");

  // 2. Apple Touch Icon (180x180)
  await sharp(sourceImage)
    .extract({ left: 0, top: 0, width: metadata.width, height: metadata.width })
    .resize(180, 180)
    .png()
    .toFile(join(appDir, "apple-icon.png"));
  console.log("Created apple-icon.png");

  // 3. Icon 192x192 (for PWA manifest)
  await sharp(sourceImage)
    .extract({ left: 0, top: 0, width: metadata.width, height: metadata.width })
    .resize(192, 192)
    .png()
    .toFile(join(appDir, "icon.png"));
  console.log("Created icon.png (192x192)");

  // 4. OG Image (1200x630) - create branded image
  // Dark background with profile on left side
  const ogWidth = 1200;
  const ogHeight = 630;

  // Resize profile to fit height
  const profileHeight = ogHeight;
  const profileWidth = Math.round((metadata.width / metadata.height) * profileHeight);

  const resizedProfile = await sharp(sourceImage)
    .resize(profileWidth, profileHeight, { fit: "cover" })
    .toBuffer();

  // Create dark background and composite
  await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 3,
      background: { r: 10, g: 10, b: 10 }
    }
  })
    .composite([
      {
        input: resizedProfile,
        left: 0,
        top: 0,
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(join(appDir, "opengraph-image.jpg"));
  console.log("Created opengraph-image.jpg");

  // 5. Twitter Image (same as OG)
  await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 3,
      background: { r: 10, g: 10, b: 10 }
    }
  })
    .composite([
      {
        input: resizedProfile,
        left: 0,
        top: 0,
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(join(appDir, "twitter-image.jpg"));
  console.log("Created twitter-image.jpg");

  console.log("\nAll images generated successfully!");
}

generateImages().catch(console.error);
