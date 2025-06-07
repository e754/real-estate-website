"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent } from "../../../components/ui/card"
import { Bed, Bath, Square, MapPin, Calendar, Home, ArrowLeft, QrCode } from "lucide-react"
import { ContactForm } from "../../../components/contact-form"
import { AgentProfile } from "../../../components/agent-profile"
import type { Listing } from "../../../types/listing"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setListing(data)
        } else {
          console.error("Failed to fetch listing")
        }
      } catch (error) {
        console.error("Error fetching listing:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="mt-4">The listing you are looking for does not exist or has been removed.</p>
        <Link href="/listings" className="text-red-600 hover:underline mt-4 inline-block">
          Return to listings
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10 relative">
      <Link href="/listings" className="flex items-center text-muted-foreground mb-6 hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{listing.title}</h1>
                  <div className="flex items-center mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{listing.address}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">{listing.price}</div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                  <Bed className="h-4 w-4" />
                  {listing.beds} Beds
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                  <Bath className="h-4 w-4" />
                  {listing.baths} Baths
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                  <Square className="h-4 w-4" />
                  {listing.sqft} sq ft
                </Badge>
                {listing.yearBuilt && (
                  <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                    <Calendar className="h-4 w-4" />
                    Built {listing.yearBuilt}
                  </Badge>
                )}
                {listing.type && (
                  <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                    <Home className="h-4 w-4" />
                    {listing.type}
                  </Badge>
                )}
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={listing.images?.[0] || listing.imageSrc || "/placeholder.svg"}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>

            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {listing.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${listing.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Property Details</h2>
                  <p className="text-muted-foreground">{listing.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <div>
                      <h3 className="font-medium">Bedrooms</h3>
                      <p>{listing.beds}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Bathrooms</h3>
                      <p>{listing.baths}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Square Feet</h3>
                      <p>{listing.sqft}</p>
                    </div>
                    {listing.lotSize && (
                      <div>
                        <h3 className="font-medium">Lot Size</h3>
                        <p>{listing.lotSize}</p>
                      </div>
                    )}
                    {listing.yearBuilt && (
                      <div>
                        <h3 className="font-medium">Year Built</h3>
                        <p>{listing.yearBuilt}</p>
                      </div>
                    )}
                    {listing.garage && (
                      <div>
                        <h3 className="font-medium">Garage</h3>
                        <p>{listing.garage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Features & Amenities</h2>
                  {listing.features && listing.features.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {listing.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No features listed for this property.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="map" className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Location</h2>
                  <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map would be displayed here</p>
                  </div>
                  <p className="text-muted-foreground">{listing.address}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
              <ContactForm property={listing.title} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Listed by:</h2>
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

      {/* QR Code Area - Fixed position in bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-32 h-32 shadow-lg border-2 border-red-200">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <QrCode className="h-8 w-8 text-red-600 mb-2" />
            <p className="text-xs text-center text-muted-foreground font-medium">QR Code</p>
            <p className="text-xs text-center text-muted-foreground">Scan for details</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
