const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Live TiDB Cloud Database Audit ===\n');
  const models = [
    { name: 'Admin Users', model: 'adminUser' },
    { name: 'Pages', model: 'page' },
    { name: 'Page Sections', model: 'pageSection' },
    { name: 'Product Categories', model: 'productCategory' },
    { name: 'Products', model: 'product' },
    { name: 'Services', model: 'service' },
    { name: 'Price List States', model: 'priceListState' },
    { name: 'Price List Items', model: 'priceListItem' },
    { name: 'Gallery Categories', model: 'galleryCategory' },
    { name: 'Gallery Images', model: 'galleryImage' },
    { name: 'Testimonials', model: 'testimonial' },
    { name: 'Awards', model: 'award' },
    { name: 'Enquiries', model: 'enquiry' },
    { name: 'SEO Settings', model: 'sEOSettings' },
  ];

  for (const { name, model } of models) {
    const count = await prisma[model].count();
    console.log(`- ${name} (${model}): ${count}`);
  }
}

main()
  .catch((e) => {
    console.error('Audit Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

