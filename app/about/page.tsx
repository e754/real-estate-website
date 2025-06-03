import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">About Selina Yin MacDonald</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose max-w-none">
            <p className="text-xl leading-relaxed">
              With over 15 years of experience in the real estate industry, I've helped hundreds of clients find their
              dream homes and sell their properties at the best possible prices.
            </p>

            <p>
              My approach to real estate is centered on understanding my clients' unique needs and providing
              personalized service that exceeds expectations. Whether you're a first-time homebuyer, looking to upgrade
              to a larger home, or ready to downsize, I'm committed to making your real estate journey smooth and
              successful.
            </p>

            <p>
              Born and raised in the Boston MetroWest area, I have an intimate knowledge of the local neighborhoods,
              schools, amenities, and market trends. This local expertise, combined with my professional network of
              lenders, inspectors, and contractors, ensures that my clients have all the resources they need throughout
              the buying or selling process.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">My Approach</h2>

            <p>
              I believe that buying or selling a home is more than just a transaction—it's a significant life event.
              That's why I take the time to listen to my clients' goals, address their concerns, and provide honest,
              expert advice every step of the way.
            </p>

            <p>
              My commitment to clear communication, attention to detail, and tireless advocacy has earned me a
              reputation for excellence in the real estate community. I'm proud that much of my business comes from
              repeat clients and referrals—a testament to the trust and relationships I've built over the years.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Professional Credentials</h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Licensed REALTOR® since 2008</li>
              <li>Certified Residential Specialist (CRS)</li>
              <li>Accredited Buyer's Representative (ABR)</li>
              <li>Seller Representative Specialist (SRS)</li>
              <li>Member of the National Association of Realtors</li>
              <li>Member of the Greater Boston Association of Realtors</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Areas I Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Framingham", "Natick", "Wellesley", "Newton", "Brookline", "Boston"].map((area) => (
                <Badge key={area} variant="outline" className="py-2 px-4 text-center">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <Image
                src="/images/selina-photo.jpeg"
                alt="Selina Yin MacDonald"
                width={400}
                height={500}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold">Selina Yin MacDonald</h2>
                <p className="text-muted-foreground">REALTOR®</p>

                <div className="mt-4 space-y-2">
                  <p className="flex items-center">
                    <span className="font-medium w-20">Phone:</span>
                    <span>617.800.6498</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-20">Email:</span>
                    <span>selina.macdonald@kw.com</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium w-20">Website:</span>
                    <span>www.selinamacdonald.com</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-20">Office:</span>
                    <span>
                      161 Worcester Road, Suite 504
                      <br />
                      Framingham, MA 01701
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link href="/contact">Contact Me</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Recent Sales</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Property"
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">456 Park Ave, Framingham</p>
                    <p className="text-sm text-muted-foreground">Sold for $875,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Property"
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">789 Lake View, Natick</p>
                    <p className="text-sm text-muted-foreground">Sold for $1,200,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Property"
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">321 Forest Hills, Wellesley</p>
                    <p className="text-sm text-muted-foreground">Sold for $950,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
