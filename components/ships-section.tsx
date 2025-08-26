"use client"

import { Ship, Construction, ArrowRight, Code, Rocket } from "lucide-react"

export default function ShipsSection() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-800 transition-colors duration-500">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <section className="w-full mt-12 mb-8">
          <div className="w-full h-[200px] md:h-[250px] relative overflow-hidden rounded-2xl transition-all duration-300 shadow-2xl">
            {/* Inner shadow overlay for border darkening effect */}
            <div className="absolute inset-0 rounded-2xl shadow-inner-strong pointer-events-none z-20"></div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 20px)`,
                    backgroundSize: "28px 28px",
                  }}
                ></div>
              </div>
            </div>

            {/* Content container */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 dark:bg-white/10 rounded-full backdrop-blur-sm">
                  <Ship size={32} className="text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-300 drop-shadow-lg">
                  Ship's
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/90 max-w-xl transition-colors duration-300 drop-shadow-md">
                Projects I've built and shipped to production
              </p>
            </div>
          </div>
        </section>

        {/* Under Construction Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-8 transition-colors duration-300">
              <Construction size={48} className="text-amber-600 dark:text-amber-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Under Construction
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              I'm currently documenting and showcasing the projects I've successfully shipped to production. This
              portfolio will highlight my technical achievements and contributions.
            </p>

            <div className="bg-gray-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-slate-600/30 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Project Categories Coming Soon:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-slate-600/30 rounded-xl transition-all duration-300">
                  <Code size={32} className="text-indigo-600 dark:text-indigo-400 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Testing Frameworks</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Automated testing solutions and CI/CD integrations
                  </p>
                </div>

                <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-slate-600/30 rounded-xl transition-all duration-300">
                  <Rocket size={32} className="text-purple-600 dark:text-purple-400 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Web Applications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Full-stack applications and tools I've developed
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Project descriptions and tech stacks</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Live demos and GitHub repositories</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Impact metrics and user feedback</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Lessons learned and best practices</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
