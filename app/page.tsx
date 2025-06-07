import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import { PropertyCard } from "../components/property-card"
import { AgentProfile } from "../components/agent-profile"
import { TestimonialCard } from "../components/testimonial-card"
import { ContactForm } from "../components/contact-form"
import { createClient } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

async function fetchEvents() {
  const { data, error } = await supabase
    .from('Events') // <-- table name (case-sensitive)
    .select('*')    // or select specific columns like 'id, title, date'
  console.log(data)
  if (error) {
    console.error('Error fetching events:', error)
  } else {
    console.log('Events:', data)
  }
}

async function uploadNewEvent() {
  const { data, error } = await supabase
    .from('Events') // table name
    .insert([
      {
        title: 'My First Event',
        date: '2025-06-06',
        location: 'Boston'
      }
    ]);

  if (error) {
    console.error('Error uploading event:', error);
  } else {
    console.log('Uploaded event:', data);
  }
}

fetchEvents()
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px]">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Beautiful home exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Find Your Dream Home</h1>
          <p className="mt-6 max-w-md text-lg">
            Professional real estate services to help you buy, sell, or rent your perfect property
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
              <Link href="/listings">View Listings</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Agent Introduction */}
      <section className="py-16 bg-red-50">
        <div className="container">
          <AgentProfile
            name="Selina Yin MacDonald"
            title="REALTOR®"
            phone="617.800.6498"
            email="selina.macdonald@kw.com"
            bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel nibh cursus nunc vehicula ultrices ac eu diam. Nunc ullamcorper lacus fringilla purus rutrum porta. Praesent non turpis tortor."
            imageSrc="/images/selina-photo.jpeg"
          />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-red-700">Featured Listings</h2>
              <p className="mt-2 text-muted-foreground">
                Explore my selection of premium properties currently on the market
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0 text-red-600 hover:text-red-700 hover:bg-red-50" asChild>
              <Link href="/listings" className="flex items-center">
                View all listings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-red-50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10 text-red-700">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Selina helped us find our dream home in just two weeks! Her knowledge of the local market is unmatched."
              author="Michael & Sarah Johnson"
              imageSrc="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Selling our home was stress-free with Selina's expertise. We got more than our asking price!"
              author="Robert Chen"
              imageSrc="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="As first-time homebuyers, we needed guidance. Selina was patient and found us the perfect starter home."
              author="Emily & David Rodriguez"
              imageSrc="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-red-100 rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-red-700">Ready to Make a Move?</h2>
                <p className="mt-4 text-muted-foreground">
                  Whether you're looking to buy, sell, or just have questions about the market, I'm here to help.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-red-600" />
                    <span>617.800.6498</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-red-600" />
                    <span>selina.macdonald@kw.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-red-600" />
                    <span>161 Worcester Road, Suite 504, Framingham, MA 01701</span>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
