import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    include: { category: true },
    orderBy: { displayOrder: "asc" },
  });
  const categories = await prisma.galleryCategory.findMany();
  return NextResponse.json({ images, categories });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const image = await prisma.galleryImage.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        isFeatured: data.isFeatured ?? false,
        displayOrder: data.displayOrder || 0,
      },
    });
    return NextResponse.json({ success: true, image });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create image" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Image ID required" }, { status: 400 });

  await prisma.galleryImage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

