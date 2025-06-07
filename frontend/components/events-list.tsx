import { getUpcomingEvents } from "@/lib/events"
import { EventCard } from "@/components/event-card"

export async function EventsList() {
  const events = await getUpcomingEvents()

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No upcoming events</h2>
        <p className="text-muted-foreground">Check back soon for new events!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
