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
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import type { Listing } from "@/types/listing"

export function ListingList() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const loadListings = async () => {
      try {
        const response = await fetch("/api/listings")
        if (response.ok) {
          const data = await response.json()
          setListings(data)
        }
      } catch (error) {
        console.error("Failed to load listings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadListings()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/listings/${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setListings(listings.filter((listing) => listing.id !== deleteId))
      }
    } catch (error) {
      console.error("Failed to delete listing:", error)
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

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <p className="mb-4 text-muted-foreground">No listings found</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/admin/listings/new">Add Your First Listing</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <div className="h-12 w-20 relative">
                    <Image
                      src={listing.imageSrc || "/placeholder.svg?height=48&width=80"}
                      alt={listing.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell className="hidden md:table-cell">{listing.address}</TableCell>
                <TableCell>{listing.featured ? "Yes" : "No"}</TableCell>
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
                        <Link href={`/admin/listings/${listing.id}/edit`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                          setDeleteId(listing.id)
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
              This action cannot be undone. This will permanently delete the listing.
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
