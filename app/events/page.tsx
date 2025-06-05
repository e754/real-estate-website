import { Suspense } from "react"
import { EventsList } from "@/components/events-list"
import { EventsLoading } from "@/components/events-loading"

export const metadata = {
  title: "Events | Jane Smith Real Estate",
  description: "Upcoming real estate events, open houses, and community gatherings",
}

export default function EventsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Upcoming Events</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        Join us for open houses, community events, and educational seminars. We love connecting with our community and
        helping you learn more about real estate.
      </p>

      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </div>
  )
}
