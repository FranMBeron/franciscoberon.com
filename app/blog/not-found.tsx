import Link from "next/link"

export default function BlogNotFound() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Post Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, the blog post you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
