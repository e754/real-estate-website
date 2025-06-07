export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  address: string
  type: EventType
  image?: string
  images?: string[] 
  featured?: boolean
  registrationRequired?: boolean
  registrationUrl?: string
  createdAt?: string
  updatedAt?: string
}

export type EventType = "open-house" | "seminar" | "community" | "virtual-tour" | "neighborhood" | "other"

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  "open-house": "Open House",
  seminar: "Seminar",
  community: "Community Event",
  "virtual-tour": "Virtual Tour",
  neighborhood: "Neighborhood Event",
  other: "Other Event",
}
