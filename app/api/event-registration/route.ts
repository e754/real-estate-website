import { NextRequest, NextResponse } from "next/server"

// Make.com webhook URL - replace with your actual webhook URL
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "https://hook.eu2.make.com/your-webhook-url-here"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received payload:", JSON.stringify(body, null, 2))

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "eventId"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Prepare data for Make.com webhook
    const webhookData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || "",
      message: body.message || "",
      eventId: body.eventId,
    }

    // Send data to Make.com webhook
    console.log("Sending to Make.com:", JSON.stringify(webhookData, null, 2))
    const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    })

    if (!webhookResponse.ok) {
      console.error("Make.com webhook error:", webhookResponse.status, webhookResponse.statusText)
      throw new Error("Failed to send registration to Make.com")
    }

    // Log successful registration
    console.log("Event registration successful:", {
      eventId: body.eventId,
      eventTitle: body.eventTitle,
      registrant: `${body.firstName} ${body.lastName}`,
      email: body.email,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      data: {
        registrantName: `${body.firstName} ${body.lastName}`,
        eventId: body.eventId,
      },
    })

  } catch (error) {
    console.error("Event registration error:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.toString() : "Registration failed",
      },
      { status: 500 }
    )
  }
}