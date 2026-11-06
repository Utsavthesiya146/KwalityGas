import React from "react";
import { prisma } from "@/lib/prisma";
import EnquiriesAdminClient from "./EnquiriesAdminClient";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = enquiries.map((enq) => ({
    ...enq,
    createdAt: enq.createdAt.toISOString(),
    updatedAt: enq.updatedAt.toISOString(),
  }));

  return <EnquiriesAdminClient initialEnquiries={serialized} />;
}

