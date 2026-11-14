const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function brandAll() {
  const masterLogoPath = path.resolve('public/images/brand/kwaality-logo-master.jpg');
  const baseDir = 'C:/Users/Admin/.gemini/antigravity/brain/0d890e28-5a79-4fb0-bfe1-49aba062702a';
  const outDir = path.resolve('public/images/corporate');

  console.log('Reading master logo:', masterLogoPath);
  const trimmedLogoBuffer = await sharp(masterLogoPath)
    .trim({ background: '#ffffff', threshold: 10 })
    .toBuffer();

  const trimmedMeta = await sharp(trimmedLogoBuffer).metadata();
  console.log('Trimmed master logo dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // Helper function to create cylinder badge
  async function createCylinderDecal(capacityText, subText, width, height, isNarrow = false) {
    const logoW = width - (isNarrow ? 26 : 40);
    const logoH = isNarrow ? 44 : 56;

    const logoBuffer = await sharp(trimmedLogoBuffer)
      .resize(logoW, logoH, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    const bannerH = isNarrow ? 26 : 34;
    const bannerRadius = isNarrow ? 9 : 12;
    const radius = isNarrow ? 9 : 12;

    const capFontSize = isNarrow ? 11 : 14;
    const subFontSize = isNarrow ? 8 : 10;
    const capY = isNarrow ? height - 10 : height - 13;
    const subY = isNarrow ? height - 31 : height - 39;
    const logoTop = isNarrow ? 8 : 10;

    const cleanSub = subText.replace(/&/g, 'AND').toUpperCase();
    const cleanCap = capacityText.replace(/&/g, 'AND').toUpperCase();

    const svg = `
      <svg width="${width}" height="${height}">
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="115%" height="120%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3" flood-color="#000000" flood-opacity="0.38"/>
          </filter>
        </defs>
        <!-- Background Pill -->
        <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${radius}" ry="${radius}" fill="#ffffff" filter="url(#shadow)" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- Bottom Banner with Capacity -->
        <path d="M 2 ${height - bannerH} L ${width - 2} ${height - bannerH} L ${width - 2} ${height - bannerRadius} Q ${width - 2} ${height - 2} ${width - bannerRadius} ${height - 2} L ${bannerRadius} ${height - 2} Q 2 ${height - 2} 2 ${height - bannerRadius} Z" fill="#0A2540"/>
        <text x="${width / 2}" y="${capY}" font-family="Arial, sans-serif" font-weight="900" font-size="${capFontSize}" fill="#F28C28" text-anchor="middle" letter-spacing="1.5">${cleanCap}</text>
        <text x="${width / 2}" y="${subY}" font-family="Arial, sans-serif" font-weight="700" font-size="${subFontSize}" fill="#64748b" text-anchor="middle" letter-spacing="1">${cleanSub}</text>
      </svg>
    `;

    return await sharp(Buffer.from(svg))
      .composite([
        {
          input: logoBuffer,
          top: logoTop,
          left: Math.round((width - logoW) / 2)
        }
      ])
      .png()
      .toBuffer();
  }

  // 1. 33kg Industrial Cylinder
  console.log('Generating 33kg cylinder...');
  const decal33 = await createCylinderDecal('33.0 KGS', 'Industrial LOT Cylinder', 168, 96, true);
  const img33Base = path.join(baseDir, 'product_cylinder_33kg_base_1794056132438.jpg');
  await sharp(img33Base)
    .composite([{ input: decal33, left: Math.round(600 - 168 / 2), top: 480 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-33kg.jpg'));

  // 2. 21kg Commercial High-Capacity Cylinder
  console.log('Generating 21kg cylinder...');
  const decal21 = await createCylinderDecal('21.0 KGS', 'Commercial Kitchen', 240, 128);
  const img17Base = path.join(baseDir, 'product_cylinder_17kg_base_1794056153297.jpg');
  await sharp(img17Base)
    .composite([{ input: decal21, left: Math.round(600 - 240 / 2), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-21kg.jpg'));

  // 3. 17kg Commercial Standard Cylinder
  console.log('Generating 17kg cylinder...');
  const decal17 = await createCylinderDecal('17.0 KGS', 'Commercial Standard', 240, 128);
  await sharp(img17Base)
    .composite([{ input: decal17, left: Math.round(600 - 240 / 2), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-17kg.jpg'));

  // 4. 15kg Dual Commercial & Domestic Cylinder
  console.log('Generating 15kg cylinder...');
  const decal15 = await createCylinderDecal('15.0 KGS', 'Commercial & Domestic', 230, 128);
  const img12Base = path.join(baseDir, 'product_cylinder_12kg_base_1794056174023.jpg');
  await sharp(img12Base)
    .composite([{ input: decal15, left: Math.round(600 - 230 / 2), top: 430 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-15kg.jpg'));

  // 5. 12kg Domestic Flagship Cylinder
  console.log('Generating 12kg cylinder...');
  const decal12 = await createCylinderDecal('12.0 KGS', 'Domestic Household', 230, 128);
  await sharp(img12Base)
    .composite([{ input: decal12, left: Math.round(600 - 230 / 2), top: 430 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-12kg.jpg'));

  // 6. 5.5kg Compact Domestic Cylinder
  console.log('Generating 5.5kg cylinder...');
  const decal55 = await createCylinderDecal('5.5 KGS', 'Compact Household', 220, 124);
  await sharp(img12Base)
    .composite([{ input: decal55, left: Math.round(600 - 220 / 2), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-5-5kg.jpg'));

  // 6b. 4kg Cook & Light Cylinder
  console.log('Generating 4kg cylinder...');
  const decal4 = await createCylinderDecal('4.0 KGS', 'Cook & Light Portable', 220, 124);
  await sharp(img12Base)
    .composite([{ input: decal4, left: Math.round(600 - 220 / 2), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-4kg.jpg'));

  // 6c. 2kg Micro Cylinder
  console.log('Generating 2kg cylinder...');
  const decal2 = await createCylinderDecal('2.0 KGS', 'Micro Portable', 220, 124);
  await sharp(img12Base)
    .composite([{ input: decal2, left: Math.round(600 - 220 / 2), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-2kg.jpg'));

  // 7. Delivery Truck Branding
  console.log('Branding delivery truck with official Kwaality logo...');
  const truckCleanPath = path.join(baseDir, 'service_delivery_truck_clean_1794056248499.jpg');
  // White panel on the front is left: 985, top: 432, width: 140, height: 42
  const truckLogoBuffer = await sharp(trimmedLogoBuffer)
    .resize(136, 38, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  await sharp(truckCleanPath)
    .composite([
      {
        input: truckLogoBuffer,
        left: 987,
        top: 434
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'service-delivery-truck.jpg'));

  console.log('🎉 ALL cylinders and delivery truck successfully branded with official Kwaality logo!');
}

brandAll().catch(console.error);
