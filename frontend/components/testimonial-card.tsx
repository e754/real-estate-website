import Image from "next/image"
import { Card, CardContent } from "../components/ui/card"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  imageSrc: string
}

export function TestimonialCard({ quote, author, imageSrc }: TestimonialCardProps) {
  return (
    <Card className="testimonial-card overflow-hidden">
      <CardContent className="p-6">
        <QuoteIcon className="h-8 w-8 text-red-300 mb-4" />
        <p className="italic mb-6">{quote}</p>
        <div className="flex items-center">
          <div className="relative w-12 h-12 mr-4">
            <Image src={imageSrc || "/placeholder.svg"} alt={author} fill className="object-cover" />
          </div>
          <span className="font-medium">{author}</span>
        </div>
      </CardContent>
    </Card>
  )
}
