"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(bookingId: string, status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED") {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status }
  });
  
  // Create a notification for the client
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (booking) {
    await prisma.notification.create({
      data: {
        userId: booking.clientId,
        title: "Booking Status Updated",
        message: `Your booking status has been updated to ${status}.`,
      }
    });
  }

  revalidatePath(`/dashboard/bookings/${bookingId}`);
  revalidatePath(`/dashboard`);
}

export async function assignStaffToBooking(bookingId: string, staffId: string, startDate: Date, endDate: Date) {
  const existing = await prisma.schedule.findFirst({
    where: {
      staffId: staffId,
      OR: [
        { startTime: { lte: endDate }, endTime: { gte: startDate } }
      ]
    }
  });

  if (existing) {
    return { error: "Staff member is already booked during this timeframe." };
  }
  await prisma.schedule.create({
    data: {
      bookingId,
      staffId,
      startTime: startDate,
      endTime: endDate,
    }
  });

  // Notify staff
  await prisma.notification.create({
    data: {
      userId: staffId,
      title: "New Schedule Assigned",
      message: `You have been assigned a new schedule for a booking.`,
    }
  });

  revalidatePath(`/dashboard/bookings/${bookingId}`);
  revalidatePath(`/dashboard/schedule`);
  return { success: true };
}
