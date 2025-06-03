import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bed, Bath, Square, MapPin } from "lucide-react"

interface PropertyCardProps {
  id: string
  title: string
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  imageSrc: string
  featured?: boolean
}

export function PropertyCard({
  id,
  title,
  price,
  address,
  beds,
  baths,
  sqft,
  imageSrc,
  featured = false,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden feature-card">
      <div className="relative">
        <Link href={`/listings/${id}`}>
          <div className="aspect-[4/3] relative">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
        {featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <Link href={`/listings/${id}`} className="hover:underline">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          </Link>
          <span className="font-bold text-primary">{price}</span>
        </div>
        <div className="flex items-center mt-2 text-muted-foreground text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{address}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-sm">
        <div className="flex items-center">
          <Bed className="h-4 w-4 mr-1 text-red-600" />
          <span>
            {beds} {beds === 1 ? "Bed" : "Beds"}
          </span>
        </div>
        <div className="flex items-center">
          <Bath className="h-4 w-4 mr-1 text-red-600" />
          <span>
            {baths} {baths === 1 ? "Bath" : "Baths"}
          </span>
        </div>
        <div className="flex items-center">
          <Square className="h-4 w-4 mr-1 text-red-600" />
          <span>{sqft} sqft</span>
        </div>
      </CardFooter>
    </Card>
  )
}
