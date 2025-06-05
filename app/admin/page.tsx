import { DashboardHeader } from "@/components/dashboard-header"
import { ListingList } from "@/components/listing-list"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <div className="container py-10">
        <DashboardHeader />
        <div className="mt-8">
          <ListingList />
        </div>
      </div>
    </AuthGuard>
  )
}
