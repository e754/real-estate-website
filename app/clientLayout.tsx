"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ThemeProvider } from "../components/theme-provider"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {!isAdminPage && <Header />}
          <main className={isAdminPage ? "" : "min-h-screen"}>{children}</main>
          {!isAdminPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  )
}
