// Простая система аутентификации без NextAuth
export interface User {
 id: string
 email: string
 name: string
 role: string
}

// В реальном приложении используйте базу данных и хеширование паролей
const ADMIN_EMAIL = "admin@example.com"
const ADMIN_PASSWORD = "password123"

export async function authenticateUser(email: string, password: string): Promise<User | null> {
 // Простая проверка учетных данных
 if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
   return {
     id: "1",
     email: ADMIN_EMAIL,
     name: "Admin User",
     role: "admin",
   }
 }

 return null
}

export function isAuthenticated(): boolean {
 if (typeof window === "undefined") return false
 return localStorage.getItem("admin_authenticated") === "true"
}

export function login(): void {
 if (typeof window !== "undefined") {
   localStorage.setItem("admin_authenticated", "true")
 }
}

export function logout(): void {
 if (typeof window !== "undefined") {
   localStorage.removeItem("admin_authenticated")
 }
}
