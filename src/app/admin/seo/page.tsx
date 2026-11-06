import React from "react";
import { prisma } from "@/lib/prisma";
import SeoAdminClient from "./SeoAdminClient";

export const revalidate = 0;

export default async function AdminSeoPage() {
  const seoList = await prisma.sEOSettings.findMany({
    orderBy: { pageSlug: "asc" },
  });

  return <SeoAdminClient initialSeoList={seoList} />;
}

