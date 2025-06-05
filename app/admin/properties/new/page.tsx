import { PropertyForm } from "@/components/property-form"
import { AuthGuard } from "@/components/auth-guard"

export default function NewPropertyPage() {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Add New Property</h1>
        <PropertyForm />
      </div>
    </AuthGuard>
  )
}
