"use client"

import { useState } from "react"
import GlowMenu from "@/components/glow-menu"
import ProfileSection from "@/components/profile-section"
import ExperienceSection from "@/components/experience-section"
import BooksSection from "@/components/books-section"
import ShipsSection from "@/components/ships-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile")

  return (
    <div className="min-h-screen">
      {/* Glow Menu */}
      <GlowMenu activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Content Sections */}
      <div className="relative">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "experience" && <ExperienceSection />}
        {activeSection === "books" && <BooksSection />}
        {activeSection === "ships" && <ShipsSection />}
      </div>
    </div>
  )
}
