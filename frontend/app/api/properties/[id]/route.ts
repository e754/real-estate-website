import { type NextRequest, NextResponse } from "next/server"
import { getPropertyById, updateProperty, deleteProperty } from "@/lib/properties"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const property = await getPropertyById(params.id)
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const property = await updateProperty(params.id, body)
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteProperty(params.id)
    if (!success) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Property deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
  }
}
