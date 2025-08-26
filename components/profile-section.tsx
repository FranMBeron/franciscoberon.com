"use client"

import Image from "next/image"
import SocialLinks from "@/components/social-links"

export default function ProfileSection() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-800 transition-colors duration-500">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Hero Banner with Buenos Aires cityscape */}
        <section className="w-full mt-12 mb-8">
          <div className="w-full h-[250px] md:h-[300px] relative overflow-hidden rounded-2xl transition-all duration-300 shadow-2xl">
            {/* Inner shadow overlay for border darkening effect */}
            <div className="absolute inset-0 rounded-2xl shadow-inner-strong pointer-events-none z-20"></div>

            {/* Buenos Aires cityscape background - no color effects */}
            <div className="absolute inset-0">
              <Image
                src="/placeholder.svg?height=300&width=800&text=Buenos Aires Cityscape"
                alt="City skyline at night"
                fill
                priority
                className="object-cover transition-all duration-300"
              />
            </div>

            {/* Subtle gradient overlay only for text readability - minimal impact on image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent transition-all duration-300"></div>

            {/* Content container */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-300 drop-shadow-lg">
                Francisco Beron
              </h1>
              <p className="text-lg md:text-xl text-white/90 mt-2 max-w-xl transition-colors duration-300 drop-shadow-md">
                Software Engineer in Test
              </p>

              {/* Social Links - aligned left */}
              <div className="mt-6 flex justify-start">
                <SocialLinks textColor="text-white" hoverColor="hover:text-white/80" />
              </div>
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="max-w-2xl mx-auto px-4 pb-16">
          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Passionate about building robust testing frameworks and ensuring software quality. With expertise in
              automated testing, CI/CD pipelines, and quality assurance processes, I help teams deliver reliable
              software that users can trust.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
