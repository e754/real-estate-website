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
import type { Listing } from "@/types/listing"

interface ListingFormProps {
  listing?: Listing
}

export function ListingForm({ listing }: ListingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Listing>>(
    listing || {
      title: "",
      price: "",
      address: "",
      description: "",
      beds: 0,
      baths: 0,
      sqft: 0,
      yearBuilt: new Date().getFullYear(),
      lotSize: "",
      garage: "",
      type: "Single Family Home",
      features: [],
      imageSrc: "/placeholder.svg?height=300&width=400",
      images: ["/placeholder.svg?height=600&width=800"],
      featured: false,
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
      const url = listing ? `/api/listings/${listing.id}` : "/api/listings"
      const method = listing ? "PUT" : "POST"

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
        console.error("Failed to save listing")
      }
    } catch (error) {
      console.error("Error saving listing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Обработка массива изображений
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    const updatedImages = [...(formData.images || [])]
    updatedImages[index] = value
    setFormData({ ...formData, images: updatedImages })
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), "/placeholder.svg?height=600&width=800"],
    })
  }

  const removeImageField = (index: number) => {
    const updatedImages = [...(formData.images || [])]
    updatedImages.splice(index, 1)
    setFormData({ ...formData, images: updatedImages })
  }

  // Обработка массива особенностей
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    const updatedFeatures = [...(formData.features || [])]
    updatedFeatures[index] = value
    setFormData({ ...formData, features: updatedFeatures })
  }

  const addFeatureField = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), ""],
    })
  }

  const removeFeatureField = (index: number) => {
    const updatedFeatures = [...(formData.features || [])]
    updatedFeatures.splice(index, 1)
    setFormData({ ...formData, features: updatedFeatures })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Listing Details</TabsTrigger>
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    name="yearBuilt"
                    type="number"
                    value={formData.yearBuilt}
                    onChange={handleNumberChange}
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lotSize">Lot Size</Label>
                  <Input
                    id="lotSize"
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleChange}
                    placeholder="0.5 acres"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="garage">Garage</Label>
                  <Input
                    id="garage"
                    name="garage"
                    value={formData.garage}
                    onChange={handleChange}
                    placeholder="2-car attached"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange as any}
                  className="w-full border rounded-md p-2"
                >
                  <option value="Single Family Home">Single Family Home</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Multi-Family">Multi-Family</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
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
                <Label htmlFor="featured">Featured Listing</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageSrc">Main Image URL (used for listings page)</Label>
                <Input
                  id="imageSrc"
                  name="imageSrc"
                  value={formData.imageSrc}
                  onChange={handleChange}
                  placeholder="/images/listing.jpg"
                />
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Main Image Preview</h3>
                <div className="relative h-[200px] w-full">
                  <Image
                    src={formData.imageSrc || "/placeholder.svg?height=200&width=400"}
                    alt="Listing preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Additional Images (for detail page)</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                    Add Image
                  </Button>
                </div>

                {(formData.images || []).map((image, index) => (
                  <div key={index} className="space-y-2 border-b pb-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`image-${index}`}>Image {index + 1}</Label>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => removeImageField(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Input
                      id={`image-${index}`}
                      value={image}
                      onChange={(e) => handleImageChange(e, index)}
                      placeholder="/images/listing-detail.jpg"
                    />
                    <div className="relative h-[100px] w-full">
                      <Image
                        src={image || "/placeholder.svg?height=100&width=200"}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>For production use, you would implement an image upload feature here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Features & Amenities</h3>
                <Button type="button" variant="outline" size="sm" onClick={addFeatureField}>
                  Add Feature
                </Button>
              </div>

              {(formData.features || []).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(e, index)}
                    placeholder="Feature name"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => removeFeatureField(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {(formData.features || []).length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No features added yet. Click "Add Feature" to add features like "Hardwood Floors", "Swimming Pool",
                  etc.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
          {isLoading ? "Saving..." : listing ? "Update Listing" : "Add Listing"}
        </Button>
      </div>
    </form>
  )
}
