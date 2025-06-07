import Link from "next/link"
import { getFeaturedEvents } from "@/lib/events"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"

export async function FeaturedEvents() {
  const events = await getFeaturedEvents()

  if (events.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-red-50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-red-700">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground">
              Join us for open houses, community events, and educational seminars
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 text-red-600 hover:text-red-700 hover:bg-red-50" asChild>
            <Link href="/events" className="flex items-center">
              View all events
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
