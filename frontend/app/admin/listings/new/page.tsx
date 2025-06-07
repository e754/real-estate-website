import { ListingForm } from "@/components/listing-form"
import { AuthGuard } from "@/components/auth-guard"

export default function NewListingPage() {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Add New Listing</h1>
        <ListingForm />
      </div>
    </AuthGuard>
  )
}
