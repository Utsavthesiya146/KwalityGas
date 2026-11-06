import React from "react";
import { prisma } from "@/lib/prisma";
import PagesAdminClient from "./PagesAdminClient";

export const revalidate = 0;

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({
    orderBy: { slug: "asc" },
  });

  return <PagesAdminClient initialPages={pages} />;
}

