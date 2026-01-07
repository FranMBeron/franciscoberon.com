import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const BLOGS_PATH = path.join(process.cwd(), "content/blogs")

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
}

function ensureBlogsDirectory() {
  if (!fs.existsSync(BLOGS_PATH)) {
    fs.mkdirSync(BLOGS_PATH, { recursive: true })
  }
}

export function getAllPosts(): BlogPostMeta[] {
  ensureBlogsDirectory()

  const files = fs.readdirSync(BLOGS_PATH)
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "")
      const filePath = path.join(BLOGS_PATH, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)

      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
        author: data.author || "",
        category: data.category || "",
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureBlogsDirectory()

  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "",
    category: data.category || "",
    content,
  }
}

export interface CreatePostData {
  title: string
  excerpt: string
  category: string
  content: string
  author?: string
}

export function createPost(data: CreatePostData): string {
  ensureBlogsDirectory()

  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  const date = new Date().toISOString().split("T")[0]
  const author = data.author || "Francisco Beron"

  const frontmatter = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${date}"
author: "${author}"
category: "${data.category}"
---`

  const fileContent = `${frontmatter}\n\n${data.content}`
  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`)

  fs.writeFileSync(filePath, fileContent, "utf-8")

  return slug
}

export interface UpdatePostData {
  title: string
  excerpt: string
  category: string
  content: string
  date?: string
  author?: string
}

export function updatePost(slug: string, data: UpdatePostData): boolean {
  ensureBlogsDirectory()

  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return false
  }

  const existingContent = fs.readFileSync(filePath, "utf-8")
  const { data: existingData } = matter(existingContent)

  const date = data.date || existingData.date || new Date().toISOString().split("T")[0]
  const author = data.author || existingData.author || "Francisco Beron"

  const frontmatter = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${date}"
author: "${author}"
category: "${data.category}"
---`

  const fileContent = `${frontmatter}\n\n${data.content}`

  fs.writeFileSync(filePath, fileContent, "utf-8")

  return true
}

export function deletePost(slug: string): boolean {
  ensureBlogsDirectory()

  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return false
  }

  fs.unlinkSync(filePath)

  return true
}

export function postExists(slug: string): boolean {
  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`)
  return fs.existsSync(filePath)
}

export async function getPostWithHtml(slug: string) {
  const post = getPostBySlug(slug)
  if (!post) return null

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()

  return {
    ...post,
    contentHtml,
  }
}
