"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Bold, Italic, List, ListOrdered, Heading1, Heading2 } from "lucide-react"

interface Props {
  params: { slug: string }
}

export default function EditArticlePage({ params }: Props) {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Tech")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`)
        if (response.ok) {
          const post = await response.json()
          setTitle(post.title)
          setExcerpt(post.excerpt)
          setContent(post.content)
          setCategory(post.category)
        } else {
          setError("Post not found")
        }
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("Failed to load post")
      } finally {
        setIsFetching(false)
      }
    }
    fetchPost()
  }, [params.slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/blogs/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
        }),
      })

      if (response.ok) {
        router.push("/admin")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update post")
      }
    } catch (err) {
      console.error("Error updating article:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "h1":
        formattedText = `\n# ${selectedText}\n`
        break
      case "h2":
        formattedText = `\n## ${selectedText}\n`
        break
      case "ul":
        formattedText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n")
        break
      case "ol":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        break
      default:
        formattedText = selectedText
    }

    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
    setContent(newContent)

    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + formattedText.length
      textarea.selectionEnd = start + formattedText.length
    }, 0)
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-gray-900" />
            Back to dashboard
          </Link>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !title || !excerpt || !content}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Update Article"}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter article title"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Short Description (Excerpt)
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Brief description for the homepage"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              <option value="Tech">Tech</option>
              <option value="Culture">Culture</option>
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-2 border-b border-gray-300 flex space-x-2">
                <button
                  type="button"
                  onClick={() => insertFormatting("bold")}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("italic")}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("h1")}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("h2")}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("ul")}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("ol")}
                  className="p-1 rounded hover:bg-gray-200"
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={15}
                className="w-full p-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Write your article content here... Use the formatting buttons above or Markdown syntax."
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You can use Markdown syntax for formatting. Bold: **text**, Italic: *text*, Headings: # Heading
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
