"use client"

import { BookOpen, Construction, ArrowRight } from "lucide-react"

export default function BooksSection() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-800 transition-colors duration-500">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <section className="w-full mt-12 mb-8">
          <div className="w-full h-[200px] md:h-[250px] relative overflow-hidden rounded-2xl transition-all duration-300 shadow-2xl">
            {/* Inner shadow overlay for border darkening effect */}
            <div className="absolute inset-0 rounded-2xl shadow-inner-strong pointer-events-none z-20"></div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>
            </div>

            {/* Content container */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 dark:bg-white/10 rounded-full backdrop-blur-sm">
                  <BookOpen size={32} className="text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-300 drop-shadow-lg">
                  Books List
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/90 max-w-xl transition-colors duration-300 drop-shadow-md">
                My reading journey and book recommendations
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
              I'm currently curating my book collection and reading recommendations. This section will feature books
              that have influenced my career in software testing and development.
            </p>

            <div className="bg-gray-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-slate-600/30 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Coming Soon:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Technical books on software testing</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Programming and development guides</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Personal development reads</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <ArrowRight size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Book reviews and ratings</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
