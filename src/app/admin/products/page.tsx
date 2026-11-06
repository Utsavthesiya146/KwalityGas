import React from "react";
import { prisma } from "@/lib/prisma";
import ProductsAdminClient from "./ProductsAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];
  try {
    const results = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.productCategory.findMany({
        orderBy: { displayOrder: "asc" },
      }),
    ]);
    products = results[0];
    categories = results[1];
  } catch (err) {
    console.error("AdminProductsPage fetch error:", err);
  }

  return <ProductsAdminClient initialProducts={products} categories={categories} />;
}

