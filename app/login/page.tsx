"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, ArrowLeft, Wifi, WifiOff, Lock } from "lucide-react"

type AuthMethod = "checking" | "github" | "local"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [authMethod, setAuthMethod] = useState<AuthMethod>("checking")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin")
    }
  }, [status, router])

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const response = await fetch("/api/auth/check-connection")
      const data = await response.json()
      setAuthMethod(data.online ? "github" : "local")
    } catch {
      setAuthMethod("local")
    }
  }

  const handleGitHubSignIn = async () => {
    setIsLoading(true)
    setError("")
    try {
      const result = await signIn("github", {
        callbackUrl: "/admin",
        redirect: false
      })
      if (result?.error) {
        setError("Access denied. Only authorized users can sign in.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocalSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || "Invalid password")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMethod = () => {
    setAuthMethod(authMethod === "github" ? "local" : "github")
    setError("")
  }

  if (status === "loading" || authMethod === "checking") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Admin Login
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          {authMethod === "github" ? (
            <span className="flex items-center gap-1 text-green-600">
              <Wifi className="h-4 w-4" />
              Online - Using GitHub
            </span>
          ) : (
            <span className="flex items-center gap-1 text-orange-600">
              <WifiOff className="h-4 w-4" />
              Offline - Using local password
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {authMethod === "github" ? (
            <button
              onClick={handleGitHubSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Github className="h-5 w-5" />
              {isLoading ? "Signing in..." : "Sign in with GitHub"}
            </button>
          ) : (
            <form onSubmit={handleLocalSignIn} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Local Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    placeholder="Enter your local password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-transparent rounded-md shadow-sm bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Lock className="h-5 w-5" />
                {isLoading ? "Signing in..." : "Sign in with Password"}
              </button>
            </form>
          )}

          <div className="mt-4">
            <button
              onClick={toggleAuthMethod}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {authMethod === "github"
                ? "Use local password instead"
                : "Use GitHub instead"}
            </button>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
