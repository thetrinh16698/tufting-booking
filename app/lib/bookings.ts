import { prisma } from "./db"
import { addDays, format, startOfDay, endOfDay } from "date-fns"

export interface AvailabilitySlot {
  id: string
  date: string
  startTime: string
  endTime: string
  isBooked: boolean
}

export interface BookingInfo {
  id: string
  userId: string
  serviceId: string
  availabilityId?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  notes?: string
  totalPrice: number
  createdAt: Date
  service: {
    name: string
    duration: number
  }
  availability?: {
    date: string
    startTime: string
    endTime: string
  }
}

export const getServiceAvailability = async (
  serviceId: string,
  from: Date,
  to: Date
): Promise<AvailabilitySlot[]> => {
  const availability = await prisma.availability.findMany({
    where: {
      serviceId,
      date: {
        gte: startOfDay(from),
        lte: endOfDay(to),
      },
    },
    orderBy: [
      { date: 'asc' },
      { startTime: 'asc' },
    ],
  })

  return availability.map(slot => ({
    id: slot.id,
    date: format(slot.date, 'yyyy-MM-dd'),
    startTime: slot.startTime,
    endTime: slot.endTime,
    isBooked: slot.isBooked,
  }))
}

export const createBooking = async (
  userId: string,
  serviceId: string,
  availabilityId: string,
  notes?: string
): Promise<BookingInfo> => {
  // Get service details for pricing
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  })

  if (!service) {
    throw new Error('Service not found')
  }

  // Check if slot is available
  const availability = await prisma.availability.findUnique({
    where: { id: availabilityId },
  })

  if (!availability || availability.isBooked) {
    throw new Error('Time slot is not available')
  }

  // Create booking and mark slot as booked
  const result = await prisma.$transaction(async (tx) => {
    // Mark availability as booked
    await tx.availability.update({
      where: { id: availabilityId },
      data: { isBooked: true },
    })

    // Create booking
    const booking = await tx.booking.create({
      data: {
        userId,
        serviceId,
        availabilityId,
        notes,
        totalPrice: service.price,
        status: 'PENDING',
      },
      include: {
        service: {
          select: {
            name: true,
            duration: true,
          },
        },
        availability: {
          select: {
            date: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    })

    return booking
  })

  return {
    id: result.id,
    userId: result.userId,
    serviceId: result.serviceId,
    availabilityId: result.availabilityId || undefined,
    status: result.status as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
    notes: result.notes || undefined,
    totalPrice: Number(result.totalPrice),
    createdAt: result.createdAt,
    service: {
      name: result.service.name,
      duration: result.service.duration,
    },
    availability: result.availability ? {
      date: format(result.availability.date, 'yyyy-MM-dd'),
      startTime: result.availability.startTime,
      endTime: result.availability.endTime,
    } : undefined,
  }
}

export const getUserBookings = async (userId: string): Promise<BookingInfo[]> => {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      service: {
        select: {
          name: true,
          duration: true,
        },
      },
      availability: {
        select: {
          date: true,
          startTime: true,
          endTime: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return bookings.map(booking => ({
    id: booking.id,
    userId: booking.userId,
    serviceId: booking.serviceId,
    availabilityId: booking.availabilityId || undefined,
    status: booking.status as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
    notes: booking.notes || undefined,
    totalPrice: Number(booking.totalPrice),
    createdAt: booking.createdAt,
    service: {
      name: booking.service.name,
      duration: booking.service.duration,
    },
    availability: booking.availability ? {
      date: format(booking.availability.date, 'yyyy-MM-dd'),
      startTime: booking.availability.startTime,
      endTime: booking.availability.endTime,
    } : undefined,
  }))
}

export const cancelBooking = async (bookingId: string, userId: string): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
    })

    if (!booking || booking.userId !== userId) {
      throw new Error('Booking not found or unauthorized')
    }

    // Update booking status
    await tx.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    })

    // Free up the availability slot if it exists
    if (booking.availabilityId) {
      await tx.availability.update({
        where: { id: booking.availabilityId },
        data: { isBooked: false },
      })
    }
  })
}

// Helper function to generate availability slots for a service
export const generateAvailabilitySlots = async (
  serviceId: string,
  startDate: Date,
  endDate: Date,
  workingHours: { start: string; end: string } = { start: '09:00', end: '17:00' },
  slotDuration: number = 60 // minutes
): Promise<void> => {
  const slots: Array<{
    serviceId: string
    date: Date
    startTime: string
    endTime: string
  }> = []

  let currentDate = startOfDay(startDate)
  const finalDate = endOfDay(endDate)

  while (currentDate <= finalDate) {
    const startHour = parseInt(workingHours.start.split(':')[0])
    const startMinute = parseInt(workingHours.start.split(':')[1])
    const endHour = parseInt(workingHours.end.split(':')[0])
    const endMinute = parseInt(workingHours.end.split(':')[1])

    let currentHour = startHour
    let currentMinute = startMinute

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const startTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
      
      // Calculate end time
      let endHourCalc = currentHour
      let endMinuteCalc = currentMinute + slotDuration
      
      while (endMinuteCalc >= 60) {
        endMinuteCalc -= 60
        endHourCalc += 1
      }
      
      const endTime = `${endHourCalc.toString().padStart(2, '0')}:${endMinuteCalc.toString().padStart(2, '0')}`

      // Only create slot if it doesn't exceed working hours
      if (endHourCalc < endHour || (endHourCalc === endHour && endMinuteCalc <= endMinute)) {
        slots.push({
          serviceId,
          date: currentDate,
          startTime,
          endTime,
        })
      }

      // Move to next slot
      currentMinute += slotDuration
      while (currentMinute >= 60) {
        currentMinute -= 60
        currentHour += 1
      }
    }

    currentDate = addDays(currentDate, 1)
  }

  // Insert all slots (SQLite doesn't support skipDuplicates)
  for (const slot of slots) {
    try {
      await prisma.availability.create({
        data: slot,
      })
    } catch (error) {
      // Skip if slot already exists
      console.log(`Slot already exists for ${slot.date} ${slot.startTime}`)
    }
  }
}
