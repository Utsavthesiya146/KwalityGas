import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const status = url.searchParams.get("status");

  const where: any = {};
  if (type) where.enquiryType = type;
  if (status) where.status = status;

  let dbEnquiries: any[] = [];
  try {
    dbEnquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (err: any) {
    console.error("Failed to query enquiries from DB:", err.message);
  }

  // Also read any pending offline queued enquiries
  let offlineEnquiries: any[] = [];
  try {
    const storageFile = path.join(process.cwd(), "storage", "offline_enquiries.jsonl");
    if (fs.existsSync(storageFile)) {
      const content = fs.readFileSync(storageFile, "utf8");
      const lines = content.split("\n").filter((l) => l.trim().length > 0);
      offlineEnquiries = lines.map((l) => JSON.parse(l));
    }
  } catch (err: any) {
    console.error("Failed to read offline enquiries file:", err.message);
  }

  const combined = [...offlineEnquiries, ...dbEnquiries];

  return NextResponse.json({
    enquiries: combined,
    dbCount: dbEnquiries.length,
    offlineQueueCount: offlineEnquiries.length,
  });
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, status, adminNotes } = body;

  if (!id) return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });

  const updated = await prisma.enquiry.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(adminNotes !== undefined ? { adminNotes } : {}),
    },
  });

  return NextResponse.json({ success: true, enquiry: updated });
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });

  await prisma.enquiry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
