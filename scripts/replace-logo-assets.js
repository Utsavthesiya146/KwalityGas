const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const inputPath = path.resolve('audit_images/Kwaality.jpg');
  console.log('Reading input logo:', inputPath);

  // 1. Trim the white borders to get the exact tight bounding box
  const trimmedBuffer = await sharp(inputPath)
    .trim({ background: '#ffffff', threshold: 10 })
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed dimensions:', trimmedMeta.width, 'x', trimmedMeta.height, 'ratio:', (trimmedMeta.width / trimmedMeta.height).toFixed(2));

  // 2. Add a clean, proportional padding (3% on sides, 4% top/bottom) for optimal balance in UI containers
  const padX = Math.round(trimmedMeta.width * 0.03);
  const padY = Math.round(trimmedMeta.height * 0.04);

  const paddedBuffer = await sharp(trimmedBuffer)
    .extend({
      top: padY,
      bottom: padY,
      left: padX,
      right: padX,
      background: '#ffffff'
    })
    .toBuffer();

  const paddedMeta = await sharp(paddedBuffer).metadata();
  console.log('Padded dimensions:', paddedMeta.width, 'x', paddedMeta.height);

  // 3. Generate high-res web-optimized JPEG for brand/logo.jpg (width 1200 for Retina 3x sharpness)
  const targetWidth = 1200;
  const targetHeight = Math.round(targetWidth * (paddedMeta.height / paddedMeta.width));

  const logoJpg = await sharp(paddedBuffer)
    .resize(targetWidth, targetHeight, { fit: 'inside' })
    .jpeg({ quality: 95, progressive: true })
    .toBuffer();

  // Save to public destinations
  const targets = [
    'public/images/brand/logo.jpg',
    'public/images/original/logo.jpg',
  ];

  for (const t of targets) {
    fs.writeFileSync(path.resolve(t), logoJpg);
    console.log('Saved JPG to:', t);
  }

  // 4. Generate transparent PNG version
  // We can make the pure white background transparent
  const rawPadded = await sharp(paddedBuffer)
    .resize(targetWidth, targetHeight, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = rawPadded;
  // Convert white / near-white pixels to transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Threshold for pure white / near-white background
    if (r > 245 && g > 245 && b > 245) {
      data[i + 3] = 0; // Transparent
    }
  }

  const logoPng = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const pngTargets = [
    'public/images/brand/logo.png',
    'public/images/original/logo.png',
    'public/images/original/ft-logo.png',
  ];

  for (const t of pngTargets) {
    fs.writeFileSync(path.resolve(t), logoPng);
    console.log('Saved PNG to:', t);
  }

  // Also preserve master copy in public/images/brand/
  fs.copyFileSync(inputPath, path.resolve('public/images/brand/kwaality-logo-master.jpg'));
  console.log('Preserved master in public/images/brand/kwaality-logo-master.jpg');

  // Also generate updated cylinder badge public/images/corporate/kwality-logo-badge.png
  // Badge on cylinders is transparent PNG
  const badgeWidth = 600;
  const badgeHeight = Math.round(badgeWidth * (paddedMeta.height / paddedMeta.width));
  const badgeBuffer = await sharp(logoPng)
    .resize(badgeWidth, badgeHeight, { fit: 'inside' })
    .png()
    .toBuffer();

  fs.writeFileSync(path.resolve('public/images/corporate/kwality-logo-badge.png'), badgeBuffer);
  console.log('Updated cylinder badge: public/images/corporate/kwality-logo-badge.png');
}

processLogo().catch(console.error);
