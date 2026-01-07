"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import BlogCard from "@/components/blog-card"
import SocialLinks from "@/components/social-links"
import { ChevronDown } from "lucide-react"

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blogs")
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Hero Banner with Buenos Aires cityscape */}
        <section className="w-full mt-12 mb-8">
          <div className="w-full h-[250px] md:h-[300px] relative overflow-hidden rounded-2xl">
            {/* Buenos Aires cityscape background */}
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src="/banner-image.png"
                alt="City skyline at night"
                fill
                priority
                className="object-cover opacity-80"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </div>

            {/* Content container */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">Francisco Beron</h1>
              <p className="text-lg md:text-xl text-gray-300 mt-2 max-w-xl">A bunch of scattered and optimistic thoughts</p>

              {/* Social Links - aligned left */}
              <div className="mt-6 flex justify-start">
                <SocialLinks textColor="text-white" hoverColor="hover:text-gray-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Category filter dropdown */}
        <div className="max-w-2xl mx-auto px-4 mb-6 flex justify-between items-center">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <span>{selectedCategory || "All Categories"}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setIsDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Categories
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("Tech")
                      setIsDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Tech
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("General Interest")
                      setIsDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    General Interest
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Blog Posts as a vertical list */}
        <section className="max-w-2xl mx-auto px-4 pb-16">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
              <p className="text-gray-500">New content is on the way. Stay tuned!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={{ ...post, id: post.slug }} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
