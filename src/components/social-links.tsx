import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

interface SocialLinksProps {
  textColor?: string;
  hoverColor?: string;
}

export default function SocialLinks({
  textColor = "text-muted-foreground",
  hoverColor = "hover:text-foreground",
}: SocialLinksProps) {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="https://github.com/FranMBeron"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} transition-colors`}
      >
        <Github size={20} />
        <span className="sr-only">GitHub</span>
      </Link>

      <Link
        href="https://linkedin.com/in/francisco-mateo-beron/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} transition-colors`}
      >
        <Linkedin size={20} />
        <span className="sr-only">LinkedIn</span>
      </Link>

      <Link
        href="https://twitter.com/BFranROCK"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} transition-colors`}
      >
        <Twitter size={20} />
        <span className="sr-only">Twitter</span>
      </Link>
    </div>
  );
}
