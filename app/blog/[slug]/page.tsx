import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts, getPostWithHtml } from "@/lib/mdx"

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Francisco Beron's Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostWithHtml(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-gray-900" />
          Back to home
        </Link>

        <article>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">{post.title}</h1>
            {post.category && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full mt-2">{post.category}</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formattedDate}
            </div>
          </div>

          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </div>
  )
}
