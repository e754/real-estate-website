import { getPastEvents } from "@/lib/events"
import { PastEventCard } from "@/components/past-event-card"

export async function PastEventsList() {
  const events = await getPastEvents()

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No past events</h2>
        <p className="text-muted-foreground">We haven't hosted any events yet, but stay tuned for upcoming ones!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Group events by year */}
      {Object.entries(
        events.reduce(
          (acc, event) => {
            const year = new Date(event.date).getFullYear()
            if (!acc[year]) acc[year] = []
            acc[year].push(event)
            return acc
          },
          {} as Record<number, typeof events>,
        ),
      )
        .sort(([a], [b]) => Number(b) - Number(a)) // Sort years descending
        .map(([year, yearEvents]) => (
          <div key={year}>
            <h2 className="text-2xl font-bold mb-6 text-red-700 border-b pb-2">{year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yearEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
