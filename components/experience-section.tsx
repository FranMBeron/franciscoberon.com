"use client"

import { Calendar, MapPin } from "lucide-react"

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Software Engineer in Test",
      company: "TechCorp Inc.",
      location: "Remote",
      period: "2021 - Present",
      description:
        "Leading test automation initiatives and establishing quality standards across multiple product teams. Implemented comprehensive CI/CD testing pipelines that reduced deployment time by 60%.",
      achievements: [
        "Built automated testing framework used by 15+ development teams",
        "Reduced bug escape rate by 40% through improved testing strategies",
        "Mentored 5 junior QA engineers in test automation best practices",
      ],
    },
    {
      title: "Software Engineer in Test",
      company: "InnovateSoft",
      location: "Buenos Aires, Argentina",
      period: "2019 - 2021",
      description:
        "Developed and maintained automated test suites for web and mobile applications. Collaborated with development teams to integrate testing into the development lifecycle.",
      achievements: [
        "Implemented API testing framework covering 200+ endpoints",
        "Achieved 85% test automation coverage for critical user journeys",
        "Established performance testing standards and monitoring",
      ],
    },
    {
      title: "QA Engineer",
      company: "WebSolutions",
      location: "Buenos Aires, Argentina",
      period: "2017 - 2019",
      description:
        "Started as a manual tester and quickly transitioned to automation. Focused on web application testing and quality assurance processes.",
      achievements: [
        "Designed comprehensive test plans for 10+ web applications",
        "Introduced automated regression testing reducing testing time by 50%",
        "Collaborated with UX team to improve user experience quality",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 py-20 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Experience
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            My journey in software testing and quality assurance, building robust systems and leading teams.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-500 dark:from-gray-500 dark:to-gray-600 opacity-40 dark:opacity-30 transition-colors duration-300" />
              )}

              {/* Experience Card */}
              <div className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-lg transition-all duration-300">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 transition-colors duration-300" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-gray-500 dark:to-gray-600 blur-md opacity-50 group-hover:opacity-75 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-gray-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/30 hover:bg-gray-100/80 dark:hover:bg-slate-700/70 transition-all duration-300 group-hover:shadow-2xl">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-gray-500/10 dark:to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                    <div className="relative">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-blue-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end gap-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <Calendar size={14} />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <MapPin size={14} />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-300">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-300">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-500 dark:to-gray-600 mt-2 flex-shrink-0 transition-all duration-300" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
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
