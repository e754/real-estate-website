import { AuthGuard } from "@/components/auth-guard"
import { PropertyLoader } from "@/components/property-loader"

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Edit Property</h1>
        <PropertyLoader propertyId={params.id} />
      </div>
    </AuthGuard>
  )
}
