import fs from "fs"
import path from "path"
import type { Listing } from "@/types/listing"

// В реальном приложении используйте базу данных вместо JSON файла
const DATA_FILE_PATH = path.join(process.cwd(), "data", "listings.json")

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
    const initialListings: Listing[] = [
      {
        id: "prop1",
        title: "Modern Lakefront Villa",
        price: "$1,250,000",
        address: "123 Lakeview Dr, Lakeside, MA",
        description:
          "This stunning lakefront villa offers breathtaking views and luxury living. With 4 bedrooms, 3 bathrooms, and over 2,800 square feet of living space, this home provides ample room for family and guests.",
        beds: 4,
        baths: 3,
        sqft: 2800,
        yearBuilt: 2018,
        lotSize: "0.5 acres",
        garage: "2-car attached",
        type: "Single Family Home",
        features: ["Lakefront Property", "Private Dock", "Gourmet Kitchen", "Hardwood Floors"],
        imageSrc: "/placeholder.svg?height=300&width=400",
        images: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "prop2",
        title: "Downtown Luxury Condo",
        price: "$750,000",
        address: "456 Urban Ave, Boston, MA",
        description: "Luxury condo in the heart of downtown with amazing city views.",
        beds: 2,
        baths: 2,
        sqft: 1500,
        yearBuilt: 2020,
        type: "Condo",
        features: ["City Views", "Concierge Service", "Fitness Center", "Rooftop Deck"],
        imageSrc: "/placeholder.svg?height=300&width=400",
        images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "prop3",
        title: "Suburban Family Home",
        price: "$950,000",
        address: "789 Maple St, Framingham, MA",
        description: "Spacious family home in a quiet suburban neighborhood with excellent schools.",
        beds: 5,
        baths: 3.5,
        sqft: 3200,
        yearBuilt: 2015,
        lotSize: "0.3 acres",
        garage: "2-car attached",
        type: "Single Family Home",
        features: ["Finished Basement", "Large Backyard", "Updated Kitchen", "Home Office"],
        imageSrc: "/placeholder.svg?height=300&width=400",
        images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(initialListings, null, 2))
  }
}

// Чтение объектов из JSON файла
export async function getListings(): Promise<Listing[]> {
  await initializeData()
  const data = await fs.promises.readFile(DATA_FILE_PATH, "utf8")
  return JSON.parse(data)
}

// Получение одного объекта по ID
export async function getListingById(id: string): Promise<Listing | null> {
  const listings = await getListings()
  return listings.find((listing) => listing.id === id) || null
}

// Создание нового объекта
export async function createListing(listingData: Omit<Listing, "id">): Promise<Listing> {
  const listings = await getListings()

  const newListing: Listing = {
    id: generateId(),
    ...listingData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  listings.push(newListing)
  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(listings, null, 2))

  return newListing
}

// Обновление существующего объекта
export async function updateListing(id: string, listingData: Partial<Listing>): Promise<Listing | null> {
  const listings = await getListings()
  const index = listings.findIndex((listing) => listing.id === id)

  if (index === -1) {
    return null
  }

  const updatedListing = {
    ...listings[index],
    ...listingData,
    updatedAt: new Date().toISOString(),
  }

  listings[index] = updatedListing
  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(listings, null, 2))

  return updatedListing
}

// Удаление объекта
export async function deleteListing(id: string): Promise<boolean> {
  const listings = await getListings()
  const filteredListings = listings.filter((listing) => listing.id !== id)

  if (filteredListings.length === listings.length) {
    return false
  }

  await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(filteredListings, null, 2))
  return true
}
