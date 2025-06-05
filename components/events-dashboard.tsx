"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, MoreHorizontal, Trash2, PlusCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { EVENT_TYPE_LABELS } from "@/types/event"
import type { Event } from "@/types/event"

export function EventsDashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } catch (error) {
        console.error("Failed to load events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/events/${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== deleteId))
      }
    } catch (error) {
      console.error("Failed to delete event:", error)
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <p className="mb-4 text-muted-foreground">No events found</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/admin/events/new" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Event
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Sort events by date (upcoming first)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Showing {events.length} events</p>
        <Button className="bg-red-600 hover:bg-red-700" asChild>
          <Link href="/admin/events/new" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="h-12 w-20 relative">
                    <Image
                      src={event.image || "/placeholder.svg?height=48&width=80"}
                      alt={event.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>{EVENT_TYPE_LABELS[event.type]}</TableCell>
                <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                <TableCell>{event.featured ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/events/${event.id}/edit`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                          setDeleteId(event.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
