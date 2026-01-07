import Link from "next/link"
import { Calendar } from "lucide-react"

interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
  category?: string
}

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="border-b pb-6">
      <div className="flex justify-between items-start mb-1">
        <h2 className="text-xl font-semibold">
          <Link href={`/blog/${post.slug}`} className="hover:underline text-gray-900">
            {post.title}
          </Link>
        </h2>
        {post.category && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">{post.category}</span>
        )}
      </div>
      <p className="text-gray-700 mb-3">{post.excerpt}</p>
      {post.date && (
        <div className="text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {post.date}
          </div>
        </div>
      )}
    </div>
  )
}
