import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SignJWT } from "jose"

const LOCAL_ADMIN_PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || ""
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || ""

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (!LOCAL_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Local auth not configured" },
        { status: 500 }
      )
    }

    if (password !== LOCAL_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      )
    }

    // Create a JWT token similar to NextAuth
    const secret = new TextEncoder().encode(NEXTAUTH_SECRET)
    const token = await new SignJWT({
      name: process.env.ADMIN_GITHUB_USERNAME || "Admin",
      email: "admin@local",
      sub: "local-admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret)

    // Set the session cookie (same name as NextAuth uses)
    const cookieStore = await cookies()
    cookieStore.set("next-auth.session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Local auth error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}
