import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Trophy, Coffee } from "lucide-react"


export default function ScheduleSection() {
  const schedule = [
    {
      time: "9:00 AM",
      title: "Registration & Check-in",
      description: "Welcome participants and distribute event materials",
      icon: Users,
    },
    {
      time: "9:30 AM",
      title: "Opening Ceremony",
      description: "Welcome address and event overview",
      icon: Trophy,
    },
    {
      time: "10:00 AM",
      title: "Hacking Begins!",
      description: "Teams start working on their projects",
      icon: Clock,
    },
    {
      time: "12:00 PM",
      title: "Lunch Break",
      description: "Networking lunch and refreshments",
      icon: Coffee,
    },
    {
      time: "3:00 PM",
      title: "Mentoring Round 1",
      description: "Final guidance and project refinement",
      icon: Users,
    },
    {
      time: "5:00 PM",
      title: "Project Submission",
      description: "Final submissions and preparation for judging",
      icon: Clock,
    },
    {
      time: "5:30 PM",
      title: "Judging & Presentations",
      description: "Teams present their projects to judges",
      icon: Trophy,
    },
    {
      time: "6:00 PM",
      title: "Closing Ceremony",
      description: "Prize distribution and closing remarks",
      icon: Trophy,
    },
  ]

  return (
    <section id="schedule" className="py-20 bg-secondary/20">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 `}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Event Schedule
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            An 8-hour coding journey from ideation to implementation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {schedule.map((item, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                        <span className="text-primary font-semibold tracking-wide">{item.time}</span>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
