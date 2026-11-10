const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDb() {
  console.log('Updating DB image paths...');

  // Update products
  const products = await prisma.product.findMany();
  for (const p of products) {
    const cap = (p.capacity || '').toLowerCase();
    const name = (p.name || '').toLowerCase();
    let img = p.imageUrl;

    if (name.includes('geyser') || name.includes('water heater') || cap.includes('instantaneous')) {
      img = '/images/corporate/product-gas-geyser.jpg';
    } else if (cap.includes('33') || name.includes('33')) {
      img = '/images/corporate/product-cylinder-33kg.jpg';
    } else if (cap.includes('21') || name.includes('21')) {
      img = '/images/corporate/product-cylinder-21kg.jpg';
    } else if (cap.includes('17') || name.includes('17')) {
      img = '/images/corporate/product-cylinder-17kg.jpg';
    } else if (cap.includes('15') || name.includes('15')) {
      img = '/images/corporate/product-cylinder-15kg.jpg';
    } else if (cap.includes('12') || name.includes('12')) {
      img = '/images/corporate/product-cylinder-12kg.jpg';
    } else if (cap.includes('5.5') || cap.includes('4.0') || cap.includes('4kg') || cap.includes('2kg') || name.includes('5.5') || name.includes('4.0')) {
      img = '/images/corporate/product-cylinder-5-5kg.jpg';
    } else if (name.includes('regulator') || name.includes('tubing') || name.includes('valve') || name.includes('safety')) {
      img = '/images/corporate/hero-safety-standards.jpg';
    }

    if (img !== p.imageUrl) {
      await prisma.product.update({
        where: { id: p.id },
        data: { imageUrl: img }
      });
      console.log(`Updated product: ${p.name} -> ${img}`);
    }
  }

  // Update gallery
  const gallery = await prisma.galleryImage.findMany();
  for (const g of gallery) {
    const title = (g.title || '').toLowerCase();
    let img = g.imageUrl;

    if (title.includes('regulator') || title.includes('hose') || title.includes('safety')) {
      img = '/images/corporate/hero-safety-standards.jpg';
    } else if (title.includes('33')) {
      img = '/images/corporate/product-cylinder-33kg.jpg';
    } else if (title.includes('21')) {
      img = '/images/corporate/product-cylinder-21kg.jpg';
    } else if (title.includes('17')) {
      img = '/images/corporate/product-cylinder-17kg.jpg';
    } else if (title.includes('15')) {
      img = '/images/corporate/product-cylinder-15kg.jpg';
    } else if (title.includes('12') || title.includes('domestic')) {
      img = '/images/corporate/product-cylinder-12kg.jpg';
    } else if (title.includes('geyser') || title.includes('water heater')) {
      img = '/images/corporate/product-gas-geyser.jpg';
    } else if (title.includes('bottling') || title.includes('fleet') || title.includes('operations')) {
      img = '/images/corporate/hero-bottling-plant.jpg';
    }

    if (img !== g.imageUrl) {
      await prisma.galleryImage.update({
        where: { id: g.id },
        data: { imageUrl: img }
      });
      console.log(`Updated gallery: ${g.title} -> ${img}`);
    }
  }

  console.log('✅ DB images successfully updated!');
}

updateDb()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
