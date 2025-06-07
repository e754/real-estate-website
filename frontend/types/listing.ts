export interface Listing {
  id: string
  title: string
  price: string
  address: string
  description?: string
  beds: number
  baths: number
  sqft: number
  yearBuilt?: number
  lotSize?: string
  garage?: string
  type?: string
  features?: string[]
  imageSrc: string
  images?: string[]
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}
