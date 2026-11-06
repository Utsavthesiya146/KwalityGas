import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    });
    const categories = await prisma.productCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ products, categories });
  } catch (err: any) {
    return NextResponse.json({ products: [], categories: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        categoryId: data.categoryId,
        capacity: data.capacity,
        shortDesc: data.shortDesc,
        description: data.description,
        imageUrl: data.imageUrl,
        isDomestic: Boolean(data.isDomestic),
        isCommercial: Boolean(data.isCommercial),
        isIndustrial: Boolean(data.isIndustrial),
        features: typeof data.features === "object" ? JSON.stringify(data.features) : data.features,
        specifications: typeof data.specifications === "object" ? JSON.stringify(data.specifications) : data.specifications,
        displayOrder: data.displayOrder || 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug: data.slug,
        categoryId: data.categoryId,
        capacity: data.capacity,
        shortDesc: data.shortDesc,
        description: data.description,
        imageUrl: data.imageUrl,
        isDomestic: Boolean(data.isDomestic),
        isCommercial: Boolean(data.isCommercial),
        isIndustrial: Boolean(data.isIndustrial),
        features: typeof data.features === "object" ? JSON.stringify(data.features) : data.features,
        specifications: typeof data.specifications === "object" ? JSON.stringify(data.specifications) : data.specifications,
        displayOrder: data.displayOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

