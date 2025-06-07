import { PropertyCard } from "@/components/property-card"
import { PropertyFilter } from "@/components/property-filter"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ListingsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Property Listings</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <PropertyFilter />
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Showing 1-6 of 24 properties</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Newest</option>
            <option>Price (Low to High)</option>
            <option>Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PropertyCard
          id="prop1"
          title="Modern Lakefront Villa"
          price="$1,250,000"
          address="123 Lakeview Dr, Lakeside, MA"
          beds={4}
          baths={3}
          sqft={2800}
          imageSrc="/placeholder.svg?height=300&width=400"
          featured={true}
        />
        <PropertyCard
          id="prop2"
          title="Downtown Luxury Condo"
          price="$750,000"
          address="456 Urban Ave, Boston, MA"
          beds={2}
          baths={2}
          sqft={1500}
          imageSrc="/placeholder.svg?height=300&width=400"
        />
        <PropertyCard
          id="prop3"
          title="Suburban Family Home"
          price="$950,000"
          address="789 Maple St, Framingham, MA"
          beds={5}
          baths={3.5}
          sqft={3200}
          imageSrc="/placeholder.svg?height=300&width=400"
        />
        <PropertyCard
          id="prop4"
          title="Beachfront Cottage"
          price="$875,000"
          address="101 Ocean View, Gloucester, MA 01930"
          beds={3}
          baths={2}
          sqft={1800}
          imageSrc="/placeholder.svg?height=300&width=400"
        />
        <PropertyCard
          id="prop5"
          title="Mountain Retreat"
          price="$1,100,000"
          address="555 Mountain Pass, Lenox, MA 01240"
          beds={4}
          baths={3}
          sqft={2600}
          imageSrc="/placeholder.svg?height=300&width=400"
        />
        <PropertyCard
          id="prop6"
          title="Historic Townhouse"
          price="$925,000"
          address="222 Heritage Lane, Salem, MA 01970"
          beds={3}
          baths={2.5}
          sqft={2200}
          imageSrc="/placeholder.svg?height=300&width=400"
        />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
