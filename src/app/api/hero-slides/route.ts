import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, slides });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch hero slides" }, { status: 500 });
  }
}

