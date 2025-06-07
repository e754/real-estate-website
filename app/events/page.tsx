import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EventsList } from "@/components/events-list"
import { EventsLoading } from "@/components/events-loading"
import { History } from "lucide-react"

export const metadata = {
  title: "Events | Jane Smith Real Estate",
  description: "Upcoming real estate events, open houses, and community gatherings",
}

export default function EventsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Join us for open houses, community events, and educational seminars. We love connecting with our community
            and helping you learn more about real estate.
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0" asChild>
          <Link href="/events/past" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            View Past Events
          </Link>
        </Button>
      </div>

      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </div>
  )
}
