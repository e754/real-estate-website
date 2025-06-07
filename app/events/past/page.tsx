import { Suspense } from "react"
import { PastEventsList } from "@/components/past-events-list"
import { EventsLoading } from "@/components/events-loading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"

export const metadata = {
  title: "Past Events | Jane Smith Real Estate",
  description: "Browse our past real estate events, open houses, and community gatherings",
}

export default function PastEventsPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/events" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-8 w-8 text-red-600" />
        <div>
          <h1 className="text-4xl font-bold">Past Events</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Take a look at our previous events and see what we've been up to in the community.
          </p>
        </div>
      </div>

      <Suspense fallback={<EventsLoading />}>
        <PastEventsList />
      </Suspense>
    </div>
  )
}
