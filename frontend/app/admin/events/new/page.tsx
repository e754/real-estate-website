import { EventForm } from "@/components/event-form"
import { AuthGuard } from "@/components/auth-guard"

export default function NewEventPage() {
  return (
    <AuthGuard>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight text-red-700 mb-6">Add New Event</h1>
        <EventForm />
      </div>
    </AuthGuard>
  )
}
