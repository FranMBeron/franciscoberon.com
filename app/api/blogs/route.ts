import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getAllPosts, createPost } from "@/lib/mdx"
import { getAllPostsFromGitHub, createPostOnGitHub, isGitHubConfigured } from "@/lib/github"

const useGitHub = process.env.USE_GITHUB_API === "true" && isGitHubConfigured()

export async function GET() {
  try {
    const posts = useGitHub ? await getAllPostsFromGitHub() : getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, excerpt, category, content } = body

    if (!title || !excerpt || !category || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const slug = useGitHub
      ? await createPostOnGitHub({ title, excerpt, category, content })
      : createPost({ title, excerpt, category, content })

    return NextResponse.json({ slug }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    )
  }
}
