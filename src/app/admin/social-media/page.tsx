import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SocialMediaClient from "./SocialMediaClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Social Media Management | Kwality Gas Admin",
  description: "Configure and manage public social media profiles and footer channels.",
};

export default async function AdminSocialMediaPage() {
  let initialLinks: any[] = [];
  try {
    initialLinks = await prisma.socialMediaLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch (err: any) {
    console.error("Failed to load social media links for admin:", err.message);
  }

  return <SocialMediaClient initialLinks={initialLinks} />;
}

