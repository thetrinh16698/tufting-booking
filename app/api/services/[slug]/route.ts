import { NextRequest, NextResponse } from "next/server"
import { getServiceBySlug } from "@app/lib/services"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const service = await getServiceBySlug(params.slug)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}
