import React from "react";
import { Metadata } from "next";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WhatsApp Helpline Settings | Kwality Gas Admin",
  description: "Configure dynamic WhatsApp customer support helpline number for the public website.",
};

export default function AdminSettingsPage() {
  return <SettingsClient />;
}

