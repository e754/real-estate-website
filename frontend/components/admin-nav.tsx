"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, LogOut, Calendar } from "lucide-react"
import { logout } from "@/lib/auth"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push("/admin/login")
  }

  // Don't show nav on login page
  if (pathname === "/admin/login") {
    return null
  }

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-xl font-bold text-red-700">
            Real Estate Admin
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors hover:text-red-700 ${
                pathname === "/admin" ? "text-red-700" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/listings/new"
              className={`text-sm font-medium transition-colors hover:text-red-700 ${
                pathname === "/admin/listings/new" ? "text-red-700" : "text-muted-foreground"
              }`}
            >
              Add Listing
            </Link>
            <Link
              href="/admin/events"
              className={`text-sm font-medium transition-colors hover:text-red-700 ${
                pathname === "/admin/events" || pathname.startsWith("/admin/events/")
                  ? "text-red-700"
                  : "text-muted-foreground"
              }`}
            >
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Events
              </span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Go to website</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
