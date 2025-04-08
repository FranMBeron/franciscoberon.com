import Link from "next/link";
import { Calendar } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="border-b pb-6">
      <h2 className="text-x1 font-semibold mb-2">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:underline text-gray-900"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-700 mb-3">{post.excerpt}</p>
      <div className="text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="mr-4 h-4 w-4" />
          {post.date}
        </div>
      </div>
    </div>
  );
}
