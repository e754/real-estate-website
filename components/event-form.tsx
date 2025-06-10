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

// Add this helper function to upload a file
async function uploadImage(file: File): Promise<string | null> {
  const formData = new FormData()
  formData.append("file", file)
  
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
    
    if (res.ok) {
      const data = await res.json()
      return data.url // The URL returned by your upload API
    } else {
      console.error("Upload failed:", res.statusText)
      return null
    }
  } catch (error) {
    console.error("Upload error:", error)
    return null
  }
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
      image: "",
      images: [],
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

  // Handle array of images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    const updatedImages = [...(formData.images || [])]
    updatedImages[index] = value
    setFormData({ ...formData, images: updatedImages })
  }

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ""],
    }))
  }

  const removeImageField = (index: number) => {
    const updatedImages = [...(formData.images || [])]
    updatedImages.splice(index, 1)
    setFormData({ ...formData, images: updatedImages })
  }

  // Handle main image upload
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLoading(true)
      try {
        // For now, create a local URL for preview
        const localUrl = URL.createObjectURL(file)
        setFormData(prev => ({ ...prev, image: localUrl }))
        
        // Upload to server (you'll need to implement this endpoint)
        const uploadedUrl = await uploadImage(file)
        if (uploadedUrl) {
          // Replace with server URL when upload completes
          setFormData(prev => ({ ...prev, image: uploadedUrl }))
        } else {
          console.warn("Upload failed, keeping local preview")
        }
      } catch (error) {
        console.error("Error uploading main image:", error)
        // Keep the local preview even if upload fails
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Handle additional image upload
  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLoading(true)
      try {
        // Create local URL for immediate preview
        const localUrl = URL.createObjectURL(file)
        const updatedImages = [...(formData.images || [])]
        updatedImages[index] = localUrl
        setFormData(prev => ({ ...prev, images: updatedImages }))
        
        // Upload to server
        const uploadedUrl = await uploadImage(file)
        if (uploadedUrl) {
          // Replace with server URL when upload completes
          const finalImages = [...(formData.images || [])]
          finalImages[index] = uploadedUrl
          setFormData(prev => ({ ...prev, images: finalImages }))
        } else {
          console.warn("Upload failed, keeping local preview")
        }
      } catch (error) {
        console.error("Error uploading additional image:", error)
        // Keep the local preview even if upload fails
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Fixed the template literal syntax here
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
        alert("Failed to save event. Please try again.")
      }
    } catch (error) {
      console.error("Error saving event:", error)
      alert("Error saving event. Please try again.")
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
                  <Label htmlFor="image">Main Image (used for event cards)</Label>
                  <div className="relative inline-block">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-red-600 hover:text-white hover:border-red-700 transition-colors"
                      asChild
                    >
                      <label htmlFor="main-image-upload" className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-1" />
                        Choose File
                      </label>
                    </Button>
                    <input
                      id="main-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      disabled={isLoading}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Main Image Preview</h3>
                  <div className="relative w-48 h-48 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Event preview"
                        fill
                        className="object-contain rounded-md"
                      />
                    ) : (
                      <div className="text-gray-500 text-center">
                        <div className="text-4xl mb-2">📷</div>
                        <p>No image selected</p>
                      </div>
                    )}
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
                      id={`additional-image-upload-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleAdditionalImageUpload(e, index)}
                      disabled={isLoading}
                    />
                    <div className="relative w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      {image ? (
                        <Image
                          src={image}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-contain rounded-md"
                        />
                      ) : (
                        <div className="text-gray-500 text-center">
                          <div className="text-2xl mb-1">📷</div>
                          <p className="text-sm">No image selected</p>
                        </div>
                      )}
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