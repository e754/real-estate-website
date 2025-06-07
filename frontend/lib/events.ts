import fs from "fs"
import path from "path"
import type { Event } from "@/types/event"

// В реальном приложении используйте базу данных вместо JSON файла
const DATA_FILE_PATH = path.join(process.cwd(), "data", "events.json")

// Генерация простого ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Убедиться, что директория data существует
const ensureDataDir = () => {
  const dir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Инициализация данных с примерами, если файл не существует
const initializeData = async () => {
  ensureDataDir()

  if (!fs.existsSync(DATA_FILE_PATH)) {
    const initialEvents: Event[] = [
      {
        id: "event1",
        title: "Luxury Home Open House",
        description:
          "Come tour this stunning 5-bedroom luxury home in the heart of Lakeside. Refreshments will be served, and our team will be available to answer any questions about the property and neighborhood.",
        date: "2025-06-15",
        time: "12:00 PM - 4:00 PM",
        location: "Lakefront Villa",
        address: "123 Lakeview Dr, Lakeside, MA",
        type: "open-house",
        image: "/placeholder.svg?height=300&width=400",
        images: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        featured: true,
        registrationRequired: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "event2",
        title: "First-Time Homebuyer Seminar",
        description:
          "Learn everything you need to know about buying your first home. Topics include financing, the buying process, what to look for in a home, and how to make competitive offers in today's market.",
        date: "2025-06-20",
        time: "6:00 PM - 8:00 PM",
        location: "Community Center",
        address: "456 Main St, Boston, MA",
        type: "seminar",
        image: "/placeholder.svg?height=300&width=400",
        images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
        featured: true,
        registrationRequired: true,
        registrationUrl: "https://example.com/register",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "event3",
        title: "Neighborhood BBQ - Maple Heights",
        description:
          "Join us for a fun community BBQ in the beautiful Maple Heights neighborhood. Meet your neighbors, learn about this wonderful community, and enjoy great food and company.",
        date: "2024-07-04",
        time: "11:00 AM - 3:00 PM",
        location: "Maple Heights Park",
        address: "789 Park Ave, Framingham, MA",
        type: "community",
        image: "/placeholder.svg?height=300&width=400",
        images: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        featured: false,
        registrationRequired: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "event4",
        title: "Holiday Home Tour 2024",
        description:
          "Take a tour of beautifully decorated homes in the historic downtown area. Each home showcases unique holiday decorating styles and architectural features.",
        date: "2024-12-15",
        time: "10:00 AM - 4:00 PM",
        location: "Historic Downtown",
        address: "Downtown Boston, MA",
        type: "neighborhood",
        image: "/placeholder.svg?height=300&width=400",
        images: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        featured: false,
        registrationRequired: true,
        registrationUrl: "https://example.com/holiday-tour",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(initialEvents, null, 2))
  }
}

// Чтение событий из JSON файла
export async function getEvents(): Promise<Event[]> {
  await initializeData()
  const data = await fs.promises.readFile(DATA_FILE_PATH, "utf8")
  return JSON.parse(data)
}

// Получение одного события по ID
export async function getEventById(id: string): Promise<Event | null> {
  const events = await getEvents()
  return events.find((event) => event.id === id) || null
}

// Создание нового события
export async function createEvent(eventData: Omit<Event, "id">): Promise<Event> {
  const events = await getEvents()

  const newEvent: Event = {
    id: generateId(),
    ...eventData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  events.push(newEvent)
  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(events, null, 2))

  return newEvent
}

// Обновление существующего события
export async function updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
  const events = await getEvents()
  const index = events.findIndex((event) => event.id === id)

  if (index === -1) {
    return null
  }

  const updatedEvent = {
    ...events[index],
    ...eventData,
    updatedAt: new Date().toISOString(),
  }

  events[index] = updatedEvent
  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(events, null, 2))

  return updatedEvent
}

// Удаление события
export async function deleteEvent(id: string): Promise<boolean> {
  const events = await getEvents()
  const filteredEvents = events.filter((event) => event.id !== id)

  if (filteredEvents.length === events.length) {
    return false
  }

  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(filteredEvents, null, 2))
  return true
}

// Получение предстоящих событий (события с датой >= сегодня)
export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getEvents()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

// Получение прошедших событий (события с датой < сегодня)
export async function getPastEvents(): Promise<Event[]> {
  const events = await getEvents()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return events
    .filter((event) => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Newest first
}

// Получение избранных событий
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return events
    .filter((event) => event.featured && new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
