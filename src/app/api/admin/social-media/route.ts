import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const links = await prisma.socialMediaLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, links });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch social media links" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.platform || !data.url) {
      return NextResponse.json({ error: "Platform name and URL are required" }, { status: 400 });
    }

    // Determine default icon slug from platform if not provided
    const platformSlug = data.platform.toLowerCase().trim();
    const icon = data.icon || platformSlug;

    // Get highest current sort order
    const maxOrder = await prisma.socialMediaLink.findFirst({
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });
    const nextOrder = (maxOrder?.sortOrder ?? 0) + 1;

    const link = await prisma.socialMediaLink.create({
      data: {
        platform: data.platform.trim(),
        url: data.url.trim(),
        icon,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
        sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : nextOrder,
      },
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create social media link" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    // Batch reorder support
    if (data.reorder && Array.isArray(data.items)) {
      for (const item of data.items) {
        if (item.id && typeof item.sortOrder === "number") {
          await prisma.socialMediaLink.update({
            where: { id: item.id },
            data: { sortOrder: item.sortOrder },
          });
        }
      }
      const updatedLinks = await prisma.socialMediaLink.findMany({
        orderBy: { sortOrder: "asc" },
      });
      return NextResponse.json({ success: true, links: updatedLinks });
    }

    if (!data.id) {
      return NextResponse.json({ error: "Link ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (data.platform !== undefined) updateData.platform = data.platform.trim();
    if (data.url !== undefined) updateData.url = data.url.trim();
    if (data.icon !== undefined) updateData.icon = data.icon.trim();
    if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);
    if (data.sortOrder !== undefined) updateData.sortOrder = Number(data.sortOrder);

    const link = await prisma.socialMediaLink.update({
      where: { id: data.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update social media link" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Link ID is required" }, { status: 400 });

    await prisma.socialMediaLink.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Social media link deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete link" }, { status: 500 });
  }
}

