import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const awards = await prisma.award.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ awards });
  } catch (err: any) {
    return NextResponse.json({ awards: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const award = await prisma.award.create({
      data: {
        title: data.title,
        year: data.year,
        issuingBody: data.issuingBody,
        certificateImg: data.certificateImg,
        trophyImg: data.trophyImg,
        description: data.description,
        displayOrder: data.displayOrder || 0,
      },
    });
    return NextResponse.json({ success: true, award });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create award" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Award ID required" }, { status: 400 });

    const award = await prisma.award.update({
      where: { id: data.id },
      data: {
        title: data.title,
        year: data.year,
        issuingBody: data.issuingBody,
        certificateImg: data.certificateImg,
        trophyImg: data.trophyImg,
        description: data.description,
        displayOrder: data.displayOrder ?? 0,
      },
    });
    return NextResponse.json({ success: true, award });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update award" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Award ID required" }, { status: 400 });

  await prisma.award.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

