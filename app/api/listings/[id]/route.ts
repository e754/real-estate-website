import { type NextRequest, NextResponse } from "next/server"
import { getListingById, updateListing, deleteListing } from "@/lib/listings"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listing = await getListingById(params.id)
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }
    return NextResponse.json(listing)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const listing = await updateListing(params.id, body)
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }
    return NextResponse.json(listing)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteListing(params.id)
    if (!success) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Listing deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 })
  }
}
