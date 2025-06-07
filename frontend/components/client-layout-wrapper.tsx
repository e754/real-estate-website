"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Проверяем, находимся ли мы на админ-страницах
  const isAdminPage = pathname?.startsWith("/admin")

  if (isAdminPage) {
    // Для админ-страниц возвращаем только children без header/footer
    return <>{children}</>
  }

  // Для обычных страниц возвращаем с header и footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
