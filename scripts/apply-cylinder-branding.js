const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function applyBranding() {
  const logoPath = path.resolve('public/images/original/logo.jpg');
  const baseDir = 'C:/Users/Admin/.gemini/antigravity/brain/0d890e28-5a79-4fb0-bfe1-49aba062702a';
  const outDir = path.resolve('public/images/corporate');

  // Helper to create a realistic curved brand decal/badge
  async function createDecal(targetWidth, targetHeight, radius = 12) {
    // Resize the authentic logo
    const logoBuffer = await sharp(logoPath)
      .resize(targetWidth - 24, targetHeight - 20, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    // Create rounded white badge with subtle border/drop shadow
    const badgeSvg = `
      <svg width="${targetWidth}" height="${targetHeight}">
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="115%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35"/>
          </filter>
        </defs>
        <rect x="3" y="3" width="${targetWidth - 6}" height="${targetHeight - 6}" rx="${radius}" ry="${radius}" fill="#ffffff" filter="url(#shadow)" stroke="#e2e8f0" stroke-width="1"/>
      </svg>
    `;

    return await sharp(Buffer.from(badgeSvg))
      .composite([
        {
          input: logoBuffer,
          gravity: 'center'
        }
      ])
      .png()
      .toBuffer();
  }

  // 1. Process 33kg Cylinder
  // Cylinder center x: 600, width is ~220px. Ideal badge: 160w x 54h
  console.log('Branding 33kg cylinder...');
  const decal33 = await createDecal(160, 54, 8);
  const img33Path = path.join(baseDir, 'product_cylinder_33kg_base_1794056132438.jpg');
  await sharp(img33Path)
    .composite([
      {
        input: decal33,
        left: Math.round(600 - 160 / 2),
        top: 500
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-33kg.jpg'));

  // 2. Process 17kg Cylinder
  // Cylinder center x: 600, width is ~368px. Ideal badge: 240w x 78h
  console.log('Branding 17kg cylinder...');
  const decal17 = await createDecal(240, 78, 10);
  const img17Path = path.join(baseDir, 'product_cylinder_17kg_base_1794056153297.jpg');
  await sharp(img17Path)
    .composite([
      {
        input: decal17,
        left: Math.round(600 - 240 / 2),
        top: 450
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-17kg.jpg'));

  // 3. Process 12kg Cylinder
  // Cylinder center x: 600, width is ~380px. Ideal badge: 230w x 75h
  console.log('Branding 12kg cylinder...');
  const decal12 = await createDecal(230, 75, 10);
  const img12Path = path.join(baseDir, 'product_cylinder_12kg_base_1794056174023.jpg');
  await sharp(img12Path)
    .composite([
      {
        input: decal12,
        left: Math.round(600 - 230 / 2),
        top: 450
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-12kg.jpg'));

  console.log('All 3 cylinders successfully branded!');
}

applyBranding().catch(console.error);

