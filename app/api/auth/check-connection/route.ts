import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Try to reach GitHub API with a short timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch("https://api.github.com", {
      signal: controller.signal,
      cache: "no-store",
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      return NextResponse.json({ online: true, method: "github" })
    }

    return NextResponse.json({ online: false, method: "local" })
  } catch {
    // If fetch fails (no internet, timeout, etc.), use local auth
    return NextResponse.json({ online: false, method: "local" })
  }
}
