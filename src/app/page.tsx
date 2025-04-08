import BlogCard from "@/components/blog-card";
import SocialLinks from "@/components/social-links";
import Image from "next/image";

export default function Home() {
  const posts = [
    {
      id: "0",
      title: "Who am I?",
      excerpt:
        "Software Engineer in Test with a passion for building robust testing frameworks and ensuring software quality.",
      date: "2025-04-07",
      slug: "who-am-i",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Hero Banner */}
        <section className="w-full mt-12 mb-16">
          <div className="w-full h-[250px] md:h-[300px] relative overflow-hidden rounded-2xl">
            {/* Background background */}
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src="/banner-image.jpg"
                alt="Banner Image"
                fill
                priority
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Francisco Mateo Beron
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-2 max-w-xl">
                Software Engineer in Test
              </p>

              {/* Social Links */}
              <div className="mt-6 flex justify-start">
                <SocialLinks
                  textColor="text-white"
                  hoverColor="hover:text-gray-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="max-w-2xl mx-auto px-4 pb-16">
          <div className="space-y-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
