import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Trophy, Lightbulb } from "lucide-react"


export default function AboutSection() {
  const features = [
    {
      icon: Code,
      title: "Innovation",
      description: "Push the boundaries of technology and create groundbreaking solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Work with talented individuals from diverse backgrounds and skill sets.",
    },
    {
      icon: Trophy,
      title: "Competition",
      description: "Compete for exciting prizes and recognition in the tech community.",
    },
    {
      icon: Lightbulb,
      title: "Learning",
      description: "Gain hands-on experience and learn from industry experts and mentors.",
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 `}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              About Code Voyage
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Code Voyage is an inter and intra college hackathon, an 8 hour hackathon
            where teams of 2 to 4 build real world prototypes across AI and ML, Web and App, AR and VR,
            IoT, and Cybersecurity. Open to all undergraduate colleges, with on-spot problem statements,
            expert mentoring, certificates, prizes, internship opportunities, and networking.
            Limited seats — register now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <feature.icon className="w-12 h-12 mx-auto text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
