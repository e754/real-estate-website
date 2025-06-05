import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-red-700">Listing Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage your property listings</p>
      </div>
      <Button className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700" asChild>
        <Link href="/admin/listings/new" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Listing
        </Link>
      </Button>
    </div>
  )
}
