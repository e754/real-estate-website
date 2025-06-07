export interface Property {
  id: string
  title: string
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  description?: string
  imageSrc: string
  featured: boolean
  amenities?: string[]
  createdAt?: string
  updatedAt?: string
}
