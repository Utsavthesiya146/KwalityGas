import React from "react";
import { prisma } from "@/lib/prisma";
import PagesAdminClient from "./PagesAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPagesPage() {
  let pages: any[] = [];
  try {
    pages = await prisma.page.findMany({
      orderBy: { slug: "asc" },
    });
  } catch (err) {
    console.error("AdminPagesPage fetch error:", err);
  }

  return <PagesAdminClient initialPages={pages} />;
}

