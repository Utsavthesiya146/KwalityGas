const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany();
  const withLogo = pages.filter(p => JSON.stringify(p).includes('logo'));
  console.log('Pages containing logo:', withLogo.map(p => ({ slug: p.slug, metaImage: p.metaImage })));

  const heroSlides = await prisma.heroSlide.findMany();
  console.log('Hero slides with logo:', heroSlides.filter(s => JSON.stringify(s).includes('logo')).length);

  const gallery = await prisma.galleryImage.findMany();
  console.log('Gallery with logo:', gallery.filter(g => JSON.stringify(g).includes('logo')).length);

  await prisma.$disconnect();
}

main().catch(console.error);
