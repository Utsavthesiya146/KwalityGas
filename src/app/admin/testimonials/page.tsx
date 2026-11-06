import React from "react";
import { prisma } from "@/lib/prisma";
import TestimonialsAdminClient from "./TestimonialsAdminClient";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <TestimonialsAdminClient initialTestimonials={testimonials} />;
}

