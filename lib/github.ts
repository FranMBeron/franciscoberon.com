const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || ""
const GITHUB_REPO = process.env.GITHUB_REPO || ""
const BLOGS_PATH = "content/blogs"

interface GitHubFile {
  name: string
  path: string
  sha: string
  content?: string
}

interface BlogPostData {
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  content: string
}

async function githubFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`GitHub API error: ${response.status} - ${error}`)
  }

  return response.json()
}

function parseMarkdownFile(content: string): { frontmatter: Record<string, string>; body: string } {
  const lines = content.split("\n")
  const frontmatter: Record<string, string> = {}
  let body = ""
  let inFrontmatter = false
  let frontmatterEnd = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === "---") {
      if (!inFrontmatter) {
        inFrontmatter = true
      } else {
        frontmatterEnd = i + 1
        break
      }
    } else if (inFrontmatter) {
      const match = line.match(/^(\w+):\s*"?([^"]*)"?$/)
      if (match) {
        frontmatter[match[1]] = match[2]
      }
    }
  }

  body = lines.slice(frontmatterEnd).join("\n").trim()

  return { frontmatter, body }
}

function createMarkdownContent(data: BlogPostData): string {
  return `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${data.date}"
author: "${data.author}"
category: "${data.category}"
---

${data.content}`
}

export async function getAllPostsFromGitHub() {
  try {
    const files: GitHubFile[] = await githubFetch(`/contents/${BLOGS_PATH}`)

    const posts = await Promise.all(
      files
        .filter((file) => file.name.endsWith(".mdx"))
        .map(async (file) => {
          const fileData = await githubFetch(`/contents/${file.path}`)
          const content = Buffer.from(fileData.content, "base64").toString("utf-8")
          const { frontmatter } = parseMarkdownFile(content)
          const slug = file.name.replace(".mdx", "")

          return {
            slug,
            title: frontmatter.title || "",
            excerpt: frontmatter.excerpt || "",
            date: frontmatter.date || "",
            author: frontmatter.author || "",
            category: frontmatter.category || "",
          }
        })
    )

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error fetching posts from GitHub:", error)
    return []
  }
}

export async function getPostBySlugFromGitHub(slug: string) {
  try {
    const fileData = await githubFetch(`/contents/${BLOGS_PATH}/${slug}.mdx`)
    const content = Buffer.from(fileData.content, "base64").toString("utf-8")
    const { frontmatter, body } = parseMarkdownFile(content)

    return {
      slug,
      title: frontmatter.title || "",
      excerpt: frontmatter.excerpt || "",
      date: frontmatter.date || "",
      author: frontmatter.author || "",
      category: frontmatter.category || "",
      content: body,
      sha: fileData.sha,
    }
  } catch (error) {
    console.error(`Error fetching post ${slug} from GitHub:`, error)
    return null
  }
}

export async function createPostOnGitHub(data: {
  title: string
  excerpt: string
  category: string
  content: string
}): Promise<string> {
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  const date = new Date().toISOString().split("T")[0]
  const author = "Francisco Beron"

  const fileContent = createMarkdownContent({
    ...data,
    date,
    author,
  })

  const encodedContent = Buffer.from(fileContent).toString("base64")

  await githubFetch(`/contents/${BLOGS_PATH}/${slug}.mdx`, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add blog post: ${data.title}`,
      content: encodedContent,
    }),
  })

  return slug
}

export async function updatePostOnGitHub(
  slug: string,
  data: {
    title: string
    excerpt: string
    category: string
    content: string
  }
): Promise<boolean> {
  try {
    // Get current file to get SHA
    const currentFile = await getPostBySlugFromGitHub(slug)
    if (!currentFile) return false

    const fileContent = createMarkdownContent({
      ...data,
      date: currentFile.date,
      author: currentFile.author,
    })

    const encodedContent = Buffer.from(fileContent).toString("base64")

    await githubFetch(`/contents/${BLOGS_PATH}/${slug}.mdx`, {
      method: "PUT",
      body: JSON.stringify({
        message: `Update blog post: ${data.title}`,
        content: encodedContent,
        sha: currentFile.sha,
      }),
    })

    return true
  } catch (error) {
    console.error(`Error updating post ${slug} on GitHub:`, error)
    return false
  }
}

export async function deletePostOnGitHub(slug: string): Promise<boolean> {
  try {
    const currentFile = await getPostBySlugFromGitHub(slug)
    if (!currentFile) return false

    await githubFetch(`/contents/${BLOGS_PATH}/${slug}.mdx`, {
      method: "DELETE",
      body: JSON.stringify({
        message: `Delete blog post: ${slug}`,
        sha: currentFile.sha,
      }),
    })

    return true
  } catch (error) {
    console.error(`Error deleting post ${slug} from GitHub:`, error)
    return false
  }
}

export function isGitHubConfigured(): boolean {
  return !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO)
}
