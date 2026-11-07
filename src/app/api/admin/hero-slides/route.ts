import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, slides });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch hero slides" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.title || !data.imageUrl || !data.ctaText || !data.ctaLink) {
      return NextResponse.json({ error: "Title, image URL, CTA text, and CTA link are required" }, { status: 400 });
    }

    const maxOrder = await prisma.heroSlide.findFirst({
      orderBy: { displayOrder: "desc" },
      select: { displayOrder: true },
    });
    const nextOrder = (maxOrder?.displayOrder ?? 0) + 1;

    const slide = await prisma.heroSlide.create({
      data: {
        slideKey: data.slideKey ? data.slideKey.trim() : null,
        title: data.title.trim(),
        subtitle: data.subtitle ? data.subtitle.trim() : null,
        description: data.description ? data.description.trim() : "",
        imageUrl: data.imageUrl.trim(),
        ctaText: data.ctaText.trim(),
        ctaLink: data.ctaLink.trim(),
        secondaryText: data.secondaryText ? data.secondaryText.trim() : null,
        secondaryLink: data.secondaryLink ? data.secondaryLink.trim() : null,
        proofPoint1: data.proofPoint1 ? data.proofPoint1.trim() : null,
        proofPoint2: data.proofPoint2 ? data.proofPoint2.trim() : null,
        proofPoint3: data.proofPoint3 ? data.proofPoint3.trim() : null,
        displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : nextOrder,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ success: true, slide });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create hero slide" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    // Check if reordering batch
    if (body.reorder && Array.isArray(body.reorder)) {
      for (const item of body.reorder) {
        if (item.id && typeof item.displayOrder === "number") {
          await prisma.heroSlide.update({
            where: { id: item.id },
            data: { displayOrder: item.displayOrder },
          });
        }
      }
      return NextResponse.json({ success: true, message: "Order updated successfully" });
    }

    // Single item update
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    const updated = await prisma.heroSlide.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        ...(data.subtitle !== undefined && { subtitle: data.subtitle ? data.subtitle.trim() : null }),
        ...(data.description !== undefined && { description: data.description ? data.description.trim() : "" }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl.trim() }),
        ...(data.ctaText !== undefined && { ctaText: data.ctaText.trim() }),
        ...(data.ctaLink !== undefined && { ctaLink: data.ctaLink.trim() }),
        ...(data.secondaryText !== undefined && { secondaryText: data.secondaryText ? data.secondaryText.trim() : null }),
        ...(data.secondaryLink !== undefined && { secondaryLink: data.secondaryLink ? data.secondaryLink.trim() : null }),
        ...(data.proofPoint1 !== undefined && { proofPoint1: data.proofPoint1 ? data.proofPoint1.trim() : null }),
        ...(data.proofPoint2 !== undefined && { proofPoint2: data.proofPoint2 ? data.proofPoint2.trim() : null }),
        ...(data.proofPoint3 !== undefined && { proofPoint3: data.proofPoint3 ? data.proofPoint3.trim() : null }),
        ...(data.displayOrder !== undefined && { displayOrder: Number(data.displayOrder) }),
        ...(data.isActive !== undefined && { isActive: Boolean(data.isActive) }),
      },
    });

    return NextResponse.json({ success: true, slide: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update hero slide" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Slide deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete slide" }, { status: 500 });
  }
}

