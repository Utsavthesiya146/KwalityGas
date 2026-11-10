const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });
  console.log('=== PRODUCTS IN DB ===');
  products.forEach(p => {
    console.log(`ID: ${p.id} | Name: ${p.name} | Capacity: ${p.capacity} | Image: ${p.imageUrl} | Category: ${p.category?.name}`);
    console.log(`  Desc: ${p.description?.slice(0, 80)}...`);
  });

  const gallery = await prisma.galleryImage.findMany({
    include: { category: true }
  });
  console.log('\n=== GALLERY IN DB ===');
  gallery.forEach(g => {
    console.log(`ID: ${g.id} | Title: ${g.title} | Category: ${g.category?.name} | Image: ${g.imageUrl}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
