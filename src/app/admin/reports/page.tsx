import React from "react";
import { Metadata } from "next";
import ReportsAdminClient from "./ReportsAdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reports & Business Analytics | Kwality Gas Admin",
  description: "Comprehensive business reports, cylinder order analytics, and dealer performance metrics.",
};

export default function AdminReportsPage() {
  return <ReportsAdminClient />;
}

