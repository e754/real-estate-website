import { Suspense } from "react"
import { EventDetail } from "@/components/event-detail"
import { EventDetailLoading } from "@/components/event-detail-loading"
import { getEventById } from "@/lib/events"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)

  if (!event) {
    return {
      title: "Event Not Found | Jane Smith Real Estate",
      description: "The requested event could not be found",
    }
  }

  return {
    title: `${event.title} | Jane Smith Real Estate`,
    description: event.description.substring(0, 160),
  }
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<EventDetailLoading />}>
      <EventDetail id={params.id} />
    </Suspense>
  )
}
