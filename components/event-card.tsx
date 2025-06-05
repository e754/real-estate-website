import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { EVENT_TYPE_LABELS } from "@/types/event"
import type { Event } from "@/types/event"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={event.image || "/placeholder.svg?height=300&width=400"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2" variant={event.type === "open-house" ? "default" : "secondary"}>
          {EVENT_TYPE_LABELS[event.type]}
        </Badge>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
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
            <span>{event.location}</span>
          </div>
        </div>
        <p className="line-clamp-2">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
