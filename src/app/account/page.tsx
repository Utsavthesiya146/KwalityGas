import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentCustomer, getFullCurrentCustomer } from "@/lib/customer-auth";
import CustomerDashboardClient from "./CustomerDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My LPG Account & Bookings | Kwality Gas Bottlers",
  description: "View your Kwality Gas cylinder bookings, track delivery status, and update profile details.",
};

export default async function CustomerAccountPage() {
  const customer = await getFullCurrentCustomer();

  if (!customer) {
    redirect("/account/login");
  }

  return <CustomerDashboardClient customer={customer} />;
}

