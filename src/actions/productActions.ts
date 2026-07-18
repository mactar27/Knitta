"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { INITIAL_PRODUCTS } from "@/data/initialData";

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
    let products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (products.length === 0) {
      // Seed database with INITIAL_PRODUCTS
      console.log("Database is empty, seeding INITIAL_PRODUCTS...");
      for (const p of INITIAL_PRODUCTS) {
        await prisma.product.create({
          data: {
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            size: p.size,
            brand: p.brand,
            condition: p.condition,
            inStock: p.inStock,
            isNewArrival: p.isNewArrival,
            isBestSeller: p.isBestSeller,
            target: p.target,
            images: p.images,
            details: p.details,
          }
        });
      }
      products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

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
