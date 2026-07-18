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
            product: true
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
