import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (email === adminEmail && password === adminPassword) {
    // Set admin_authenticated cookie on successful login
    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_authenticated", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // Optionally set secure: true in production
    })
    return response
  } else {
    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
  }
}
