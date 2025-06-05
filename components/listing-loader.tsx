"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ListingForm } from "@/components/listing-form"
import type { Listing } from "@/types/listing"

interface ListingLoaderProps {
  listingId: string
}

export function ListingLoader({ listingId }: ListingLoaderProps) {
  const router = useRouter()
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadListing = async () => {
      try {
        const response = await fetch(`/api/listings/${listingId}`)
        if (!response.ok) {
          throw new Error("Listing not found")
        }
        const data = await response.json()
        setListing(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load listing")
      } finally {
        setIsLoading(false)
      }
    }

    loadListing()
  }, [listingId])

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
        <button onClick={() => router.push("/admin")} className="mt-4 text-red-600 hover:underline">
          Return to dashboard
        </button>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Listing not found</p>
        <button onClick={() => router.push("/admin")} className="mt-4 text-red-600 hover:underline">
          Return to dashboard
        </button>
      </div>
    )
  }

  return <ListingForm listing={listing} />
}
