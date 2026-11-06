import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      include: { sections: true, seo: true },
      orderBy: { slug: "asc" },
    });
    return NextResponse.json({ pages });
  } catch (err: any) {
    return NextResponse.json({ pages: [], error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Page ID is required" }, { status: 400 });

    const page = await prisma.page.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        isPublished: data.isPublished ?? true,
      },
    });

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update page" }, { status: 500 });
  }
}

