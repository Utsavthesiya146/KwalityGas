const sharp = require('sharp');
const path = require('path');

async function brandTruck() {
  const truckPath = 'C:/Users/Admin/.gemini/antigravity/brain/0d890e28-5a79-4fb0-bfe1-49aba062702a/service_delivery_truck_clean_1794056248499.jpg';
  const logoPath = path.resolve('public/images/original/logo.jpg');
  const outPath = path.resolve('public/images/corporate/service-delivery-truck.jpg');

  // Resize logo for front panel of truck (approx 140 x 42)
  const truckLogo = await sharp(logoPath)
    .resize(140, 42, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  await sharp(truckPath)
    .composite([
      {
        input: truckLogo,
        left: 985,
        top: 432
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(outPath);

  console.log('Truck branded and saved to:', outPath);
}

brandTruck().catch(console.error);
