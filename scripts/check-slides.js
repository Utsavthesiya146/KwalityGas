const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slides = await prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } });
  for (let i = 0; i < slides.length; i++) {
    console.log(`Slide ${i}: id=${slides[i].id}, slideKey=${slides[i].slideKey}, image=${slides[i].imageUrl}, title=${slides[i].title}`);
  }
  await prisma.$disconnect();
}

main().catch(console.error);
