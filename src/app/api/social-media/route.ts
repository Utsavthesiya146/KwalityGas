import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const links = await prisma.socialMediaLink.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        platform: true,
        url: true,
        icon: true,
        sortOrder: true,
      },
    });

    return NextResponse.json({ success: true, links });
  } catch (error: any) {
    console.error("Failed to fetch public social media links:", error.message);
    // Graceful fallback to default verified company channels if database is offline
    const fallbackLinks = [
      {
        id: "fallback-whatsapp",
        platform: "WhatsApp",
        url: "https://wa.me/917899787101",
        icon: "whatsapp",
        sortOrder: 1,
      },
      {
        id: "fallback-linkedin",
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/kwality-gas-bottlers-private-limited",
        icon: "linkedin",
        sortOrder: 2,
      },
    ];
    return NextResponse.json({ success: true, links: fallbackLinks, fallback: true });
  }
}

