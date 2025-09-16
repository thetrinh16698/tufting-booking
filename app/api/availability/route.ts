import { NextRequest, NextResponse } from "next/server"
import { getServiceAvailability } from "@app/lib/bookings"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    if (!serviceId || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters: serviceId, from, to' },
        { status: 400 }
      )
    }

    const availability = await getServiceAvailability(
      serviceId,
      new Date(from),
      new Date(to)
    )
    
    return NextResponse.json({ availability })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
