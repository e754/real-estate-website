import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Globe } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-32 h-32">
                <Image src="/images/luxury-logo.avif" alt="Luxury Real Estate Logo" fill className="object-contain" />
              </div>
              <span className="font-bold">Selina Yin MacDonald</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional real estate services to help you buy, sell, or rent your perfect property.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-sm text-muted-foreground hover:text-foreground">
                  Property Listings
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Buying a Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Selling a Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Market Analysis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">617.800.6498</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">selina.macdonald@kw.com</span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">www.selinamacdonald.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  KELLER WILLIAMS® BOSTON METROWEST
                  <br />
                  161 Worcester Road, Suite 504
                  <br />
                  Framingham, MA 01701
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Selina Yin MacDonald, REALTOR®. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">Each office is independently owned and operated</p>
        </div>
      </div>
    </footer>
  )
}
