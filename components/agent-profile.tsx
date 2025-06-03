import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

interface AgentProfileProps {
  name: string
  title: string
  phone: string
  email: string
  bio: string
  imageSrc: string
  compact?: boolean
}

export function AgentProfile({ name, title, phone, email, bio, imageSrc, compact = false }: AgentProfileProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex gap-4 mt-2">
            <Link href={`tel:${phone.replace(/[^0-9]/g, "")}`} className="text-sm text-primary hover:underline">
              {phone}
            </Link>
            <Link href={`mailto:${email}`} className="text-sm text-primary hover:underline">
              {email}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
      <div className="relative w-40 h-40 mx-auto md:w-full md:h-auto md:aspect-square">
        <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-muted-foreground">{title}</p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <Link href={`tel:${phone.replace(/[^0-9]/g, "")}`} className="hover:underline">
              {phone}
            </Link>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-primary" />
            <Link href={`mailto:${email}`} className="hover:underline">
              {email}
            </Link>
          </div>
        </div>

        <p className="mt-4 text-muted-foreground">{bio}</p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
