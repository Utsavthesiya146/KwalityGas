import React from "react";
import { prisma } from "@/lib/prisma";
import TestimonialsAdminClient from "./TestimonialsAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("AdminTestimonialsPage fetch error:", err);
  }

  return <TestimonialsAdminClient initialTestimonials={testimonials} />;
}

