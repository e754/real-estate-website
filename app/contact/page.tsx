import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-6">
            I'm here to help with all your real estate needs. Feel free to reach out with any questions or to schedule a
            consultation.
          </p>

          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start p-6">
                <Phone className="h-5 w-5 mr-4 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">617.800.6498</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <Mail className="h-5 w-5 mr-4 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">selina.macdonald@kw.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <Globe className="h-5 w-5 mr-4 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Website</h3>
                  <p className="text-muted-foreground">www.selinamacdonald.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <MapPin className="h-5 w-5 mr-4 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Office Address</h3>
                  <p className="text-muted-foreground">KELLER WILLIAMS® BOSTON METROWEST</p>
                  <p className="text-muted-foreground">161 Worcester Road, Suite 504</p>
                  <p className="text-muted-foreground">Framingham, MA 01701</p>
                  <p className="text-xs text-muted-foreground mt-2">Each office is independently owned and operated</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start p-6">
                <Clock className="h-5 w-5 mr-4 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Office Hours</h3>
                  <div className="grid grid-cols-2 gap-x-4 text-muted-foreground">
                    <p>Monday - Friday</p>
                    <p>9:00 AM - 6:00 PM</p>
                    <p>Saturday</p>
                    <p>10:00 AM - 4:00 PM</p>
                    <p>Sunday</p>
                    <p>By appointment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send Me a Message</h2>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="mt-8 aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
