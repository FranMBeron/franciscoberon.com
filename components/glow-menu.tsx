"use client"
import { useState, useEffect } from "react"
import { Moon, Sun, User, Briefcase, BookOpen, Ship, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

interface GlowMenuProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function GlowMenu({ activeSection, onSectionChange }: GlowMenuProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu when section changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeSection])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "experience", label: "Work", icon: Briefcase },
    { id: "books", label: "Books List", icon: BookOpen },
    { id: "ships", label: "Ship's", icon: Ship },
  ]

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  if (!mounted) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 md:block">
        <div className="flex items-center gap-2 p-2 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-2xl">
          <div className="w-48 h-10 bg-gray-200/50 rounded-full animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-l border-gray-200/60 dark:border-gray-700/50 shadow-2xl z-50 md:hidden
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/60 dark:border-gray-700/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/50 transition-all duration-300"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-left
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-700 dark:to-gray-800 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/50"
                  }
                `}
              >
                {/* Glow effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-600 dark:to-gray-700 blur-md opacity-40 dark:opacity-30 -z-10 animate-pulse" />
                )}

                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}

          {/* Mobile Theme Toggle */}
          <div className="pt-4 mt-4 border-t border-gray-200/60 dark:border-gray-700/50">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/50 transition-all duration-300 text-left"
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun size={20} />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileMenu}
        className={`
          fixed top-6 right-6 z-50 md:hidden p-3 rounded-full transition-all duration-300
          ${
            isMobileMenuOpen
              ? "bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-lg"
              : "bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 shadow-2xl hover:shadow-xl"
          }
          backdrop-blur-md border border-gray-200/60 dark:border-gray-700/50
        `}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative w-5 h-5">
          <Menu
            size={20}
            className={`absolute inset-0 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            size={20}
            className={`absolute inset-0 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-75"
            }`}
          />
        </div>
      </button>

      {/* Desktop Menu (Hidden on Mobile) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="flex items-center gap-1 p-2 rounded-full bg-white/95 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/50 shadow-2xl transition-all duration-300">
          {/* Desktop Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 group text-xs sm:text-sm
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-700 dark:to-gray-800 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/50"
                  }
                `}
              >
                {/* Glow effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-600 dark:to-gray-700 blur-md opacity-40 dark:opacity-30 -z-10 animate-pulse" />
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-gray-400 dark:to-gray-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10" />

                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="font-medium hidden sm:inline">{item.label}</span>
                <span className="font-medium sm:hidden">{item.label.split(" ")[0]}</span>
              </button>
            )
          })}

          {/* Desktop Divider */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 transition-colors duration-300" />

          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/50 transition-all duration-300 group"
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 dark:from-blue-400 dark:to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10" />

            {resolvedTheme === "dark" ? (
              <Sun size={18} className="transition-transform duration-300 group-hover:rotate-12" />
            ) : (
              <Moon size={18} className="transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </>
  )
}
