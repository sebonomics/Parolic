import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "SiteSmith has completely transformed how our marketing team creates landing pages. What used to take weeks now takes hours.",
    author: "Sarah Johnson",
    title: "Marketing Director, TechCorp",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The collaboration features are game-changing. Our design and development teams are now working together more efficiently than ever.",
    author: "Michael Chen",
    title: "Product Manager, InnovateCo",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "We've cut our website development costs by 60% while improving quality. SiteSmith is now an essential part of our tech stack.",
    author: "Jessica Williams",
    title: "CTO, StartupX",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Customers Say</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their web development process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-slate-50 border">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-12 w-32 bg-slate-200 rounded flex items-center justify-center text-sm font-medium"
              >
                Company {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

