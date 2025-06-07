import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { EVENT_TYPE_LABELS } from "@/types/event"
import type { Event } from "@/types/event"

interface PastEventCardProps {
  event: Event
}

export function PastEventCard({ event }: PastEventCardProps) {
  const photoCount = (event.images?.length || 0) + (event.image ? 1 : 0)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={event.image || "/placeholder.svg?height=300&width=400"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {EVENT_TYPE_LABELS[event.type]}
          </Badge>
        </div>
        {photoCount > 1 && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white flex items-center gap-1">
              <Users className="h-3 w-3" />
              {photoCount} photos
            </Badge>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-red-600 text-white">Past Event</Badge>
        </div>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <p className="line-clamp-3 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/events/${event.id}`}>View Event Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
