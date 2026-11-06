import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ testimonials });
  } catch (err: any) {
    return NextResponse.json({ testimonials: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: data.clientName,
        designation: data.designation,
        companyName: data.companyName,
        quote: data.quote,
        location: data.location,
        avatarUrl: data.avatarUrl,
        rating: data.rating ? parseInt(data.rating, 10) : 5,
        isVerified: data.isVerified ?? true,
        displayOrder: data.displayOrder || 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Testimonial ID required" }, { status: 400 });

    const testimonial = await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        clientName: data.clientName,
        designation: data.designation,
        companyName: data.companyName,
        quote: data.quote,
        location: data.location,
        avatarUrl: data.avatarUrl,
        rating: data.rating ? parseInt(data.rating, 10) : 5,
        isVerified: data.isVerified ?? true,
        displayOrder: data.displayOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Testimonial ID required" }, { status: 400 });

  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

