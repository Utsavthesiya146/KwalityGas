import React from "react";
import { prisma } from "@/lib/prisma";
import AwardsAdminClient from "./AwardsAdminClient";

export const revalidate = 0;

export default async function AdminAwardsPage() {
  const awards = await prisma.award.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <AwardsAdminClient initialAwards={awards} />;
}

