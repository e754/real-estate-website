import { AuthGuard } from "@/components/auth-guard"
import { ListingLoader } from "@/components/listing-loader"

export default function EditListingPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Edit Listing</h1>
        <ListingLoader listingId={params.id} />
      </div>
    </AuthGuard>
  )
}
