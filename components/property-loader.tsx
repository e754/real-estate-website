"use client"

import { useEffect, useState } from "react"
import { PropertyForm } from "@/components/property-form"
import type { Property } from "@/types/property"

interface PropertyLoaderProps {
  propertyId: string
}

export function PropertyLoader({ propertyId }: PropertyLoaderProps) {
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}`)
        if (!response.ok) {
          throw new Error("Property not found")
        }
        const data = await response.json()
        setProperty(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load property")
      } finally {
        setIsLoading(false)
      }
    }

    loadProperty()
  }, [propertyId])

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Property not found</p>
      </div>
    )
  }

  return <PropertyForm property={property} />
}
