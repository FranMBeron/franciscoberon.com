import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

interface SocialLinksProps {
  size?: "default" | "sm"
  textColor?: string
  hoverColor?: string
}

export default function SocialLinks({
  size = "default",
  textColor = "text-muted-foreground",
  hoverColor = "hover:text-foreground",
}: SocialLinksProps) {
  const iconSize = size === "sm" ? 16 : 20
  const containerClass = size === "sm" ? "space-x-2" : "space-x-4"

  return (
    <div className={`flex items-center ${containerClass}`}>
      <Link
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} transition-colors`}
      >
        <Github size={iconSize} />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} transition-colors`}
      >
        <Twitter size={iconSize} />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} transition-colors`}
      >
        <Linkedin size={iconSize} />
        <span className="sr-only">LinkedIn</span>
      </Link>
    </div>
  )
}
