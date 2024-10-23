"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}
export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) throw new Error("Usuário não autenticado")

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
}