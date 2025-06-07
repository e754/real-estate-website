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
import { Plus, X } from "lucide-react"
import { EVENT_TYPE_LABELS } from "@/types/event"
import type { Event } from "@/types/event"

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Event>>(
    event || {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "12:00 PM - 2:00 PM",
      location: "",
      address: "",
      type: "open-house",
      image: "/placeholder.svg?height=300&width=400",
      images: ["/placeholder.svg?height=600&width=800"],
      featured: false,
      registrationRequired: false,
      registrationUrl: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = event ? `/api/events/${event.id}` : "/api/events"
      const method = event ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/events")
        router.refresh()
      } else {
        console.error("Failed to save event")
      }
    } catch (error) {
      console.error("Error saving event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="media">Media & Photos</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="12:00 PM - 2:00 PM"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location Name</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Community Center, Property Address, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, Boston, MA 02108"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleCheckboxChange("featured", !!checked)}
                />
                <Label htmlFor="featured">Featured Event (shown on homepage)</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Main Image */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Main Image URL (used for event cards)</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/images/event.jpg"
                  />
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Main Image Preview</h3>
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={formData.image || "/placeholder.svg?height=200&width=400"}
                      alt="Event preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Additional Photos</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Photo
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Add multiple photos to showcase your event. These will be displayed in a gallery on the event detail
                  page.
                </p>

                {(formData.images || []).map((image, index) => (
                  <div key={index} className="space-y-2 border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`image-${index}`}>Photo {index + 1}</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => removeImageField(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      id={`image-${index}`}
                      value={image}
                      onChange={(e) => handleImageChange(e, index)}
                      placeholder="/images/event-photo.jpg"
                    />
                    <div className="relative h-[120px] w-full">
                      <Image
                        src={image || "/placeholder.svg?height=120&width=200"}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>
                ))}

                {(formData.images || []).length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
                    <p className="text-muted-foreground">No additional photos added yet.</p>
                    <p className="text-sm text-muted-foreground">Click "Add Photo" to add event photos.</p>
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-md">
                <p className="font-medium mb-1">💡 Pro Tip:</p>
                <p>
                  For production use, you would implement an image upload feature here using services like Vercel Blob
                  or Cloudinary.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="registrationRequired"
                  checked={formData.registrationRequired}
                  onCheckedChange={(checked) => handleCheckboxChange("registrationRequired", !!checked)}
                />
                <Label htmlFor="registrationRequired">Registration Required</Label>
              </div>

              {formData.registrationRequired && (
                <div className="space-y-2">
                  <Label htmlFor="registrationUrl">Registration URL</Label>
                  <Input
                    id="registrationUrl"
                    name="registrationUrl"
                    value={formData.registrationUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/register"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the URL where visitors can register for this event.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/events")} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
          {isLoading ? "Saving..." : event ? "Update Event" : "Add Event"}
        </Button>
      </div>
    </form>
  )
}
