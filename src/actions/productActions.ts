"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Type based on Prisma schema
type ProductData = {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  brand: string;
  condition: string;
  inStock?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  target: string;
  images: any;
  details: any;
};

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function addProductAction(data: ProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: "Failed to add product" };
  }
}

export async function updateProductAction(id: string, data: Partial<ProductData>) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath(`/product/${id}`);
    return { success: true, product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
