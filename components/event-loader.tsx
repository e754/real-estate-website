"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { EventForm } from "@/components/event-form"
import type { Event } from "@/types/event"

interface EventLoaderProps {
  eventId: string
}

export function EventLoader({ eventId }: EventLoaderProps) {
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (!response.ok) {
          throw new Error("Event not found")
        }
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event")
      } finally {
        setIsLoading(false)
      }
    }

    loadEvent()
  }, [eventId])

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Error: {error}</p>
        <button onClick={() => router.push("/admin/events")} className="mt-4 text-red-600 hover:underline">
          Return to events dashboard
        </button>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Event not found</p>
        <button onClick={() => router.push("/admin/events")} className="mt-4 text-red-600 hover:underline">
          Return to events dashboard
        </button>
      </div>
    )
  }

  return <EventForm event={event} />
}
