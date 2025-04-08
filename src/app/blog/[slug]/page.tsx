import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

// This would typically be a database or CMS query
const getBlogPost = (slug: string) => {
  // Mock blog data
  const posts = [
    {
      id: "0",
      title: "Who am I?",
      content: `
        <p>Hello! I'm Francisco, a Software Engineer in Test with a passion for building robust testing frameworks and ensuring software quality. With over 5 years of experience in the industry, I specialize in automated testing, CI/CD pipelines, and quality assurance processes.</p>
        
        <p>My journey began as a manual tester, but I quickly developed an interest in automation and the technical aspects of testing. This led me to pursue a career that bridges the gap between development and quality assurance.</p>
        
        <p>When I'm not writing test code, you can find me contributing to open-source projects, exploring new technologies, or sharing my knowledge through blog posts and community events.</p>
        
        <p>I believe that quality is everyone's responsibility, and I'm passionate about creating a culture where testing is integrated into the development process from the beginning.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Skills</h2>
        <ul>
          <li>Test Automation (Selenium, Cypress, Playwright)</li>
          <li>CI/CD Pipeline Integration</li>
          <li>API Testing</li>
          <li>Performance Testing</li>
          <li>JavaScript/TypeScript</li>
          <li>Python</li>
          <li>Java</li>
        </ul>
        
        <h2>Experience</h2>
        <p><strong>Senior Software Engineer in Test</strong> | TechCorp Inc. | 2021-Present</p>
        <p><strong>Software Engineer in Test</strong> | InnovateSoft | 2019-2021</p>
        <p><strong>QA Engineer</strong> | WebSolutions | 2017-2019</p>
      `,
      date: "April 7, 2024",
      author: "Francisco Beron",
      slug: "who-am-i",
    },
  ];

  return posts.find((post) => post.slug === slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Francisco Beron's Blog`,
    description: post.content.substring(0, 150).replace(/<[^>]*>/g, ""),
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16 text-gray-600">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-gray-900" />
          Back to home
        </Link>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {post.date}
            </div>
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
