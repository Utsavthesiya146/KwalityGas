import React from "react";
import AdminLayoutClient from "./AdminLayoutClient";
import { getCurrentAdmin } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <AdminLayoutClient admin={admin}>
      {children}
    </AdminLayoutClient>
  );
}

