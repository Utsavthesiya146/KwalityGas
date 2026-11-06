import React from "react";
import { prisma } from "@/lib/prisma";
import AwardsAdminClient from "./AwardsAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminAwardsPage() {
  let awards: any[] = [];
  try {
    awards = await prisma.award.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("AdminAwardsPage fetch error:", err);
  }

  return <AwardsAdminClient initialAwards={awards} />;
}

