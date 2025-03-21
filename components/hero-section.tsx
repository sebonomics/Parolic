import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build better websites{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">faster</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              SiteSmith helps teams create, deploy, and manage beautiful websites without the complexity. Streamline
              your workflow and focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gray-200 flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ companies worldwide</p>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SiteSmith dashboard preview"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Average time saved</p>
              <p className="text-3xl font-bold">40%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

