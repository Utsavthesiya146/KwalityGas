const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function prepareLogoBadge() {
  const logoPath = path.resolve('public/images/original/logo.jpg');
  const outPath = path.resolve('public/images/corporate/kwality-logo-badge.png');

  // Load logo.jpg (160x41)
  const metadata = await sharp(logoPath).metadata();
  console.log('Original logo metadata:', metadata);

  // Create a high-res, clean rounded-corner badge with white background and subtle padding
  // Resize logo 3x to 480 x 123 for crisp rendering on high-res product photos
  const resizedLogo = await sharp(logoPath)
    .resize(480, 123, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  // Badge with rounded corners
  const badgeWidth = 520;
  const badgeHeight = 150;
  const cornerRadius = 18;

  const roundedMask = Buffer.from(
    `<svg width="${badgeWidth}" height="${badgeHeight}">
      <rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff" />
    </svg>`
  );

  const badgeBase = await sharp({
    create: {
      width: badgeWidth,
      height: badgeHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    {
      input: resizedLogo,
      gravity: 'center'
    }
  ])
  .composite([
    {
      input: roundedMask,
      blend: 'dest-in'
    }
  ])
  .png()
  .toFile(outPath);

  console.log('Created badge:', outPath);
}

prepareLogoBadge().catch(console.error);

