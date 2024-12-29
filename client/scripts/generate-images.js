import sharp from 'sharp';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Convert favicon.svg to various sizes
  const faviconSizes = [16, 32, 96, 192, 512];
  
  for (const size of faviconSizes) {
    await sharp(path.join(publicDir, 'favicon.svg'))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
      
    console.log(`Generated favicon-${size}x${size}.png`);
  }
  
  // Copy files with new names
  await Promise.all([
    fs.copyFile(
      path.join(publicDir, 'favicon-192x192.png'),
      path.join(publicDir, 'android-chrome-192x192.png')
    ),
    fs.copyFile(
      path.join(publicDir, 'favicon-512x512.png'),
      path.join(publicDir, 'android-chrome-512x512.png')
    ),
    fs.copyFile(
      path.join(publicDir, 'favicon-192x192.png'),
      path.join(publicDir, 'apple-touch-icon.png')
    )
  ]);
  
  // Generate OG image
  await sharp(path.join(publicDir, 'og-image.svg'))
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
    
  console.log('Generated og-image.png');
  
  console.log('All images generated successfully!');
}

generateImages().catch(console.error);
