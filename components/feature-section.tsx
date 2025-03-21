import { Code, Zap, Globe, Shield, Users, Layers } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Lightning Fast",
    description:
      "Build and deploy websites in minutes, not days. Our intuitive interface makes website creation a breeze.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "No-Code Editor",
    description:
      "Powerful visual editor that lets you create professional websites without writing a single line of code.",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global CDN",
    description:
      "Your websites are automatically deployed to our global CDN, ensuring fast load times for users worldwide.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Enterprise Security",
    description: "Bank-level security with automatic SSL, DDoS protection, and regular security audits.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time editing, commenting, and version control.",
  },
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: "Integrations",
    description: "Connect with your favorite tools and services through our extensive integration marketplace.",
  },
]

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create, manage, and grow your web presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-lg border hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

