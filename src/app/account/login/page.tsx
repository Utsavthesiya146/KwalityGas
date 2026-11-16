import React from "react";
import { Metadata } from "next";
import CustomerLoginClient from "./CustomerLoginClient";

export const metadata: Metadata = {
  title: "Customer Login & Registration | Kwality Gas Bottlers",
  description:
    "Log in or register your Kwality Gas customer account to manage LPG bookings, save delivery addresses, and track cylinder refills.",
};

export default function CustomerLoginPage() {
  return <CustomerLoginClient />;
}

