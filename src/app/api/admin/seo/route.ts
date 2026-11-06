import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const seoList = await prisma.sEOSettings.findMany({
      orderBy: { pageSlug: "asc" },
    });
    return NextResponse.json({ seoList });
  } catch (err: any) {
    return NextResponse.json({ seoList: [], error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.pageSlug) return NextResponse.json({ error: "pageSlug is required" }, { status: 400 });

    const seo = await prisma.sEOSettings.upsert({
      where: { pageSlug: data.pageSlug },
      update: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        ogTitle: data.ogTitle || data.metaTitle,
        ogDescription: data.ogDescription || data.metaDescription,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl,
      },
      create: {
        pageSlug: data.pageSlug,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        ogTitle: data.ogTitle || data.metaTitle,
        ogDescription: data.ogDescription || data.metaDescription,
        ogImage: data.ogImage,
        canonicalUrl: data.canonicalUrl,
      },
    });

    return NextResponse.json({ success: true, seo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update SEO" }, { status: 500 });
  }
}

