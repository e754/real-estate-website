import { type NextRequest, NextResponse } from "next/server"
import { getListings, createListing } from "@/lib/listings"

export async function GET() {
  try {
    const listings = await getListings()
    return NextResponse.json(listings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const listing = await createListing(body)
    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 })
  }
}
