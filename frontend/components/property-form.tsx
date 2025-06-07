"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Property } from "@/types/property"

interface PropertyFormProps {
  property?: Property
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Property>>(
    property || {
      title: "",
      price: "",
      address: "",
      beds: 0,
      baths: 0,
      sqft: 0,
      description: "",
      imageSrc: "/placeholder.svg?height=300&width=400",
      featured: false,
      amenities: [],
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: Number.parseFloat(value) || 0 })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, featured: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = property ? `/api/properties/${property.id}` : "/api/properties"
      const method = property ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        console.error("Failed to save property")
      }
    } catch (error) {
      console.error("Error saving property:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="features">Features & Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="$000,000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beds">Bedrooms</Label>
                  <Input
                    id="beds"
                    name="beds"
                    type="number"
                    value={formData.beds}
                    onChange={handleNumberChange}
                    min="0"
                    step="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baths">Bathrooms</Label>
                  <Input
                    id="baths"
                    name="baths"
                    type="number"
                    value={formData.baths}
                    onChange={handleNumberChange}
                    min="0"
                    step="0.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sqft">Square Feet</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    type="number"
                    value={formData.sqft}
                    onChange={handleNumberChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="featured" checked={formData.featured} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="featured">Featured Property</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageSrc">Image URL</Label>
                <Input
                  id="imageSrc"
                  name="imageSrc"
                  value={formData.imageSrc}
                  onChange={handleChange}
                  placeholder="/images/property.jpg"
                />
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Image Preview</h3>
                <div className="relative h-[200px] w-full">
                  <Image
                    src={formData.imageSrc || "/placeholder.svg?height=200&width=400"}
                    alt="Property preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>For production use, you would implement an image upload feature here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  In a complete implementation, you would add checkboxes for common amenities like:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Air Conditioning</li>
                  <li>Swimming Pool</li>
                  <li>Garage</li>
                  <li>Fireplace</li>
                  <li>Garden/Backyard</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
          {isLoading ? "Saving..." : property ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  )
}
