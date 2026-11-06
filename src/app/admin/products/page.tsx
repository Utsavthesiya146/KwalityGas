import React from "react";
import { prisma } from "@/lib/prisma";
import ProductsAdminClient from "./ProductsAdminClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.productCategory.findMany({
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return <ProductsAdminClient initialProducts={products} categories={categories} />;
}

