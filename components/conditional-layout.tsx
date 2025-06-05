"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Footer } from "./footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  if (isAdminPage) {
    // Для админ-страниц показываем только children
    return <>{children}</>
  }

  // Для обычных страниц показываем с Header и Footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
