"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { SlidersHorizontal, MapPin, Building, Hash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

export function PropertyFilter() {
  const [priceRange, setPriceRange] = useState([500000, 1500000])
  const [sqftRange, setSqftRange] = useState([1000, 3000])
  const [showFilters, setShowFilters] = useState(false)
  const [searchType, setSearchType] = useState("location")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="location" className="w-full" onValueChange={setSearchType}>
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="location" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>City/Town</span>
            </TabsTrigger>
            <TabsTrigger value="address" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>Address</span>
            </TabsTrigger>
            <TabsTrigger value="zipcode" className="flex items-center gap-1">
              <Hash className="h-4 w-4" />
              <span>Zip Code</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="location" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter city or town name..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Within 5 miles</SelectItem>
                  <SelectItem value="10">Within 10 miles</SelectItem>
                  <SelectItem value="15">Within 15 miles</SelectItem>
                  <SelectItem value="20">Within 20 miles</SelectItem>
                  <SelectItem value="25">Within 25 miles</SelectItem>
                </SelectContent>
              </Select>
              <Button className="whitespace-nowrap">Search</Button>
            </div>
          </TabsContent>

          <TabsContent value="address" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter street address..." className="pl-9" />
              </div>
              <Button className="whitespace-nowrap">Search</Button>
            </div>
          </TabsContent>

          <TabsContent value="zipcode" className="mt-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter ZIP code..."
                  className="pl-9"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Within 5 miles</SelectItem>
                  <SelectItem value="10">Within 10 miles</SelectItem>
                  <SelectItem value="15">Within 15 miles</SelectItem>
                  <SelectItem value="20">Within 20 miles</SelectItem>
                  <SelectItem value="25">Within 25 miles</SelectItem>
                </SelectContent>
              </Select>
              <Button className="whitespace-nowrap">Search</Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            <div>
              <Label htmlFor="min-price">Min Price</Label>
              <Select>
                <SelectTrigger id="min-price">
                  <SelectValue placeholder="No Min" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Min</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="200000">$200,000</SelectItem>
                  <SelectItem value="300000">$300,000</SelectItem>
                  <SelectItem value="400000">$400,000</SelectItem>
                  <SelectItem value="500000">$500,000</SelectItem>
                  <SelectItem value="750000">$750,000</SelectItem>
                  <SelectItem value="1000000">$1,000,000</SelectItem>
                  <SelectItem value="1500000">$1,500,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-price">Max Price</Label>
              <Select>
                <SelectTrigger id="max-price">
                  <SelectValue placeholder="No Max" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Max</SelectItem>
                  <SelectItem value="300000">$300,000</SelectItem>
                  <SelectItem value="400000">$400,000</SelectItem>
                  <SelectItem value="500000">$500,000</SelectItem>
                  <SelectItem value="750000">$750,000</SelectItem>
                  <SelectItem value="1000000">$1,000,000</SelectItem>
                  <SelectItem value="1500000">$1,500,000</SelectItem>
                  <SelectItem value="2000000">$2,000,000</SelectItem>
                  <SelectItem value="3000000">$3,000,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="beds">Beds</Label>
              <Select>
                <SelectTrigger id="beds">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="baths">Baths</Label>
              <Select>
                <SelectTrigger id="baths">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "More Filters"}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-red-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="mb-2 block">Property Type</Label>
              <RadioGroup defaultValue="any" className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any" className="cursor-pointer">
                    Any
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="house" id="house" />
                  <Label htmlFor="house" className="cursor-pointer">
                    House
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="condo" id="condo" />
                  <Label htmlFor="condo" className="cursor-pointer">
                    Condo
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="townhouse" id="townhouse" />
                  <Label htmlFor="townhouse" className="cursor-pointer">
                    Townhouse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi" id="multi" />
                  <Label htmlFor="multi" className="cursor-pointer">
                    Multi-Family
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="land" id="land" />
                  <Label htmlFor="land" className="cursor-pointer">
                    Land
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Square Footage</Label>
                  <span className="text-sm text-muted-foreground">
                    {sqftRange[0]} - {sqftRange[1]} sq ft
                  </span>
                </div>
                <Slider defaultValue={sqftRange} min={500} max={5000} step={100} onValueChange={setSqftRange} />
              </div>

              <div>
                <Label className="mb-2 block">Year Built</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Min Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1950">1950</SelectItem>
                      <SelectItem value="1970">1970</SelectItem>
                      <SelectItem value="1990">1990</SelectItem>
                      <SelectItem value="2000">2000</SelectItem>
                      <SelectItem value="2010">2010</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Max Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1970">1970</SelectItem>
                      <SelectItem value="1990">1990</SelectItem>
                      <SelectItem value="2000">2000</SelectItem>
                      <SelectItem value="2010">2010</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="garage">Garage/Parking</Label>
                <Switch id="garage" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="waterfront">Waterfront</Label>
                <Switch id="waterfront" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="new-construction">New Construction</Label>
                <Switch id="new-construction" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pool">Pool</Label>
                <Switch id="pool" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline">Reset Filters</Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  )
}
