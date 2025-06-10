import { Suspense } from "react"
import { EventDetail } from "@/components/event-detail"
import { EventDetailLoading } from "@/components/event-detail-loading"
import { getEventById } from "@/lib/events"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEventById(id)

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

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <Suspense fallback={<EventDetailLoading />}>
      <EventDetail id={id} />
    </Suspense>
  )
}