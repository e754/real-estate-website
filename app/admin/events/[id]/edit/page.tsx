import { AuthGuard } from "@/components/auth-guard"
import { EventLoader } from "@/components/event-loader"

export default function EditEventPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Edit Event</h1>
        <EventLoader eventId={params.id} />
      </div>
    </AuthGuard>
  )
}
