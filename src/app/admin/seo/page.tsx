import React from "react";
import { prisma } from "@/lib/prisma";
import SeoAdminClient from "./SeoAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSeoPage() {
  let seoList: any[] = [];
  try {
    seoList = await prisma.sEOSettings.findMany({
      orderBy: { pageSlug: "asc" },
    });
  } catch (err) {
    console.error("AdminSeoPage fetch error:", err);
  }

  return <SeoAdminClient initialSeoList={seoList} />;
}

