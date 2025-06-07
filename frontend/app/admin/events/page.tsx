import { EventsDashboard } from "@/components/events-dashboard"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminEventsPage() {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Events Management</h1>
        <EventsDashboard />
      </div>
    </AuthGuard>
  )
}
