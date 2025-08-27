"use client"

import { Calendar, MapPin } from "lucide-react"

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Software Engineer in Test",
      company: "Paper Street Media",
      location: "Miami, Florida, Estados Unidos · En remoto",
      period: "dic. 2024 - actualidad · 9 meses",
      description:
        "Led the end-to-end testing strategy and framework creation from scratch for the streaming platform — designed and implemented a robust testing infrastructure with 300+ Playwright tests in TypeScript, targeting the platform's most critical and edge-case workflows. Enabled reliable cross-platform coverage through LambdaTest integration. Automated the whole pipeline with GitHub Actions, turning testing and deployment into a smooth, hands-off process. Built a custom metrics system to track and visualize current test coverage, and adapted the entire suite to run against a locally dockerized version of the platform for faster, isolated development and debugging.",
      achievements: [
        "Built automated testing framework used by development teams",
        "Implemented 300+ Playwright tests with TypeScript",
        "Achieved cross-platform coverage through LambdaTest integration",
        "Created custom metrics system for test coverage tracking",
        "Established CI/CD pipeline with GitHub Actions",
      ],
      skills: ["TypeScript", "Playwright", "GitHub Actions", "Docker", "LambdaTest"],
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 py-20 px-4 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Work
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Current and most relevant work experience.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-500 dark:from-gray-500 dark:to-gray-600 opacity-40 dark:opacity-30 transition-colors duration-300" />
              )}

              {/* Experience Card */}
              <div className="relative flex gap-8">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 mt-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 transition-colors duration-300" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-gray-500 dark:to-gray-600 blur-md opacity-50 group-hover:opacity-75 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-slate-600/30 hover:bg-gray-100/80 dark:hover:bg-slate-700/70 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/10 dark:group-hover:shadow-purple-500/10">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-gray-500/10 dark:to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <p className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3 transition-colors duration-300">
                            {exp.company}
                          </p>
                          {exp.client && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-3 transition-colors duration-300">
                              <span>🏢</span>
                              <span>Client: {exp.client}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col lg:items-end gap-2 mt-4 lg:mt-0">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <Calendar size={16} />
                            <span className="font-medium">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg transition-colors duration-300">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      {exp.achievements && (
                        <div className="mb-6">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg transition-colors duration-300">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-600 dark:text-gray-400 transition-colors duration-300"
                              >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-500 dark:to-gray-600 mt-2.5 flex-shrink-0 transition-all duration-300" />
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skills */}
                      {exp.skills && (
                        <div className="pt-6 border-t border-gray-200/50 dark:border-slate-600/30">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                              Skills:
                            </span>
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium transition-colors duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}