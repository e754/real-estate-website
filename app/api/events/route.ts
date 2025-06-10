import { type NextRequest, NextResponse } from "next/server"
import { getEvents, createEvent } from "@/lib/events"

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Check for admin authentication cookie
  const cookie = request.cookies.get("admin_authenticated")
  if (!cookie || cookie.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await request.json()
    const event = await createEvent(body)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
