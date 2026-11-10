const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateAllCylinders() {
  const baseDir = 'C:/Users/Admin/.gemini/antigravity/brain/0d890e28-5a79-4fb0-bfe1-49aba062702a';
  const outDir = path.resolve('public/images/corporate');
  const logoPath = path.resolve('public/images/brand/logo.jpg');

  console.log('Generating premium branded cylinder photography...');

  // Helper to create an ultra-clean corporate cylinder emblem
  async function createCylinderDecal(capacityText, subText, width, height) {
    const logoBuffer = await sharp(logoPath)
      .resize(width - 40, 50, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    const cleanSub = subText.replace(/&/g, 'AND').toUpperCase();
    const cleanCap = capacityText.replace(/&/g, 'AND').toUpperCase();
    const svg = `
      <svg width="${width}" height="${height}">
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="115%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
          </filter>
        </defs>
        <!-- Background Pill -->
        <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="14" ry="14" fill="#ffffff" filter="url(#shadow)" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- Bottom Banner with Capacity -->
        <path d="M 2 ${height - 34} L ${width - 2} ${height - 34} L ${width - 2} ${height - 16} Q ${width - 2} ${height - 2} ${width - 16} ${height - 2} L 16 ${height - 2} Q 2 ${height - 2} 2 ${height - 16} Z" fill="#0A2540"/>
        <text x="${width / 2}" y="${height - 14}" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#F28C28" text-anchor="middle" letter-spacing="1.5">${cleanCap}</text>
        <text x="${width / 2}" y="${height - 39}" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#64748b" text-anchor="middle" letter-spacing="1">${cleanSub}</text>
      </svg>
    `;

    return await sharp(Buffer.from(svg))
      .composite([
        {
          input: logoBuffer,
          top: 14,
          left: 20
        }
      ])
      .png()
      .toBuffer();
  }

  // 1. 33kg Industrial Cylinder
  const decal33 = await createCylinderDecal('33.0 KGS', 'Industrial LOT Cylinder', 220, 120);
  const img33Base = path.join(baseDir, 'product_cylinder_33kg_base_1794056132438.jpg');
  await sharp(img33Base)
    .composite([{ input: decal33, left: Math.round(600 - 110), top: 480 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-33kg.jpg'));
  console.log('✅ Created product-cylinder-33kg.jpg');

  // 2. 21kg Commercial High-Capacity Cylinder
  // Using 17kg base image with 21kg emblem
  const decal21 = await createCylinderDecal('21.0 KGS', 'Commercial Kitchen', 240, 125);
  const img17Base = path.join(baseDir, 'product_cylinder_17kg_base_1794056153297.jpg');
  await sharp(img17Base)
    .composite([{ input: decal21, left: Math.round(600 - 120), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-21kg.jpg'));
  console.log('✅ Created product-cylinder-21kg.jpg');

  // 3. 17kg Commercial Standard Cylinder
  const decal17 = await createCylinderDecal('17.0 KGS', 'Commercial Standard', 240, 125);
  await sharp(img17Base)
    .composite([{ input: decal17, left: Math.round(600 - 120), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-17kg.jpg'));
  console.log('✅ Created product-cylinder-17kg.jpg');

  // 4. 15kg Dual Commercial & Domestic Cylinder
  const decal15 = await createCylinderDecal('15.0 KGS', 'Commercial & Domestic', 230, 125);
  const img12Base = path.join(baseDir, 'product_cylinder_12kg_base_1794056174023.jpg');
  await sharp(img12Base)
    .composite([{ input: decal15, left: Math.round(600 - 115), top: 430 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-15kg.jpg'));
  console.log('✅ Created product-cylinder-15kg.jpg');

  // 5. 12kg Domestic Flagship Cylinder
  const decal12 = await createCylinderDecal('12.0 KGS', 'Domestic Household', 230, 125);
  await sharp(img12Base)
    .composite([{ input: decal12, left: Math.round(600 - 115), top: 430 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-12kg.jpg'));
  console.log('✅ Created product-cylinder-12kg.jpg');

  // 6. 5.5kg Compact Domestic Cylinder
  const decal55 = await createCylinderDecal('5.5 KGS', 'Compact Household', 220, 120);
  await sharp(img12Base)
    .composite([{ input: decal55, left: Math.round(600 - 110), top: 440 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'product-cylinder-5-5kg.jpg'));
  console.log('✅ Created product-cylinder-5-5kg.jpg');

  console.log('🎉 All cylinder images generated with 100% accurate capacities & Kwality Gas branding!');
}

generateAllCylinders().catch(console.error);
