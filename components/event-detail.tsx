import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, MapPin, ArrowLeft, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { getEventById } from "@/lib/events"
import { EVENT_TYPE_LABELS } from "@/types/event"
import { AgentProfile } from "@/components/agent-profile"

interface EventDetailProps {
  id: string
}

export async function EventDetail({ id }: EventDetailProps) {
  const event = await getEventById(id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container py-10">
      <Link href="/events" className="flex items-center text-muted-foreground mb-6 hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{event.title}</h1>
                  <div className="flex items-center mt-2">
                    <Badge variant={event.type === "open-house" ? "default" : "secondary"}>
                      {EVENT_TYPE_LABELS[event.type]}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={event.image || "/placeholder.svg?height=600&width=800"}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Calendar className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Date</h3>
                <p>{formatDate(event.date)}</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Clock className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Time</h3>
                <p>{event.time}</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <MapPin className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Location</h3>
                <p>{event.location}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="whitespace-pre-line">{event.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="mb-4">{event.address}</p>
              <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {event.registrationRequired ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Registration Required</h2>
                <p className="mb-4">Please register to attend this event.</p>
                <Button className="w-full" asChild>
                  <a href={event.registrationUrl || "#"} target="_blank" rel="noopener noreferrer">
                    Register Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">No Registration Required</h2>
                <p>Just show up! We look forward to seeing you there.</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Hosted by:</h2>
              <AgentProfile
                name="Selina Yin MacDonald"
                title="REALTOR®"
                phone="617.800.6498"
                email="selina.macdonald@kw.com"
                bio="With over 15 years of experience in the local market, I help my clients find their perfect home."
                imageSrc="/images/selina-photo.jpeg"
                compact={true}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
