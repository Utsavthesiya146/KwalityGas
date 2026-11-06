import React from "react";
import { prisma } from "@/lib/prisma";
import EnquiriesAdminClient from "./EnquiriesAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  let serialized: any[] = [];
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    serialized = enquiries.map((enq) => ({
      ...enq,
      createdAt: enq.createdAt.toISOString(),
      updatedAt: enq.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("AdminEnquiriesPage fetch error:", err);
  }

  return <EnquiriesAdminClient initialEnquiries={serialized} />;
}

