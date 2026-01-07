import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getPostBySlug, updatePost, deletePost } from "@/lib/mdx"
import {
  getPostBySlugFromGitHub,
  updatePostOnGitHub,
  deletePostOnGitHub,
  isGitHubConfigured,
} from "@/lib/github"

const useGitHub = process.env.USE_GITHUB_API === "true" && isGitHubConfigured()

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = useGitHub
      ? await getPostBySlugFromGitHub(params.slug)
      : getPostBySlug(params.slug)

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
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

    const success = useGitHub
      ? await updatePostOnGitHub(params.slug, { title, excerpt, category, content })
      : updatePost(params.slug, { title, excerpt, category, content })

    if (!success) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const success = useGitHub
      ? await deletePostOnGitHub(params.slug)
      : deletePost(params.slug)

    if (!success) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
}
