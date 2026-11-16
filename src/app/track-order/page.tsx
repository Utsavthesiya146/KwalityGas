import React from "react";
import { Metadata } from "next";
import TrackOrderClient from "./TrackOrderClient";

export const metadata: Metadata = {
  title: "Track LPG Cylinder Order | Kwality Gas Bottlers",
  description:
    "Check live delivery status, WhatsApp dispatch coordination, and payment confirmation for your Kwality Gas LPG cylinder order.",
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}

