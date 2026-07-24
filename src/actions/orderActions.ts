"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type OrderData = {
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  date: string;
  status: string;
  total: number;
  items: { productId: string; quantity: number }[];
};

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                category: true,
                size: true,
                brand: true,
                condition: true,
                target: true,
                inStock: true,
                stockCount: true,
                isNewArrival: true,
                isBestSeller: true,
                rating: true,
                createdAt: true,
                updatedAt: true,
                // OMitting images and details to save bandwidth!
              }
            }
          }
        }
      }
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function placeOrderAction(data: OrderData) {
  try {
    const { items, ...orderData } = data;
    const order = await prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Decrement stockCount for each item
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (product) {
        const newStock = Math.max(0, product.stockCount - item.quantity);
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stockCount: newStock,
            inStock: newStock > 0
          }
        });
      }
    }

    revalidatePath("/admin");
    return { success: true, order };
  } catch (error) {
    console.error("Error placing order:", error);
    return { success: false, error: "Failed to place order" };
  }
}

export async function updateOrderStatusAction(id: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true, order };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
