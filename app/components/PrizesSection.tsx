import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"


export default function PrizesSection() {
  // Split total ₹20,000 across the top 3
  // 1st: ₹10,000, 2nd: ₹6,000, 3rd: ₹4,000
  const prizes = [
    {
      icon: Trophy,
      title: "Overall Winner",
      prize: "₹10,000",
      description: "Best overall project across all tracks",
      color: "from-yellow-400 to-yellow-600",
      rank: "1st",
    },
    {
      icon: Medal,
      title: "First Runner-up",
      prize: "₹6,000",
      description: "Second best project overall",
      color: "from-gray-300 to-gray-500",
      rank: "2nd",
    },
    {
      icon: Award,
      title: "Second Runner-up",
      prize: "₹4,000",
      description: "Third best project overall",
      color: "from-orange-400 to-orange-600",
      rank: "3rd",
    },
  ]

  return (
    <section id="prizes" className="py-20 bg-secondary/20">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 `}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white glow-text">
            Prizes & Recognition
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            ₹20,000 total prize pool split across top three teams
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 max-w-4xl mx-auto">
          {prizes.map((prize, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prize.color}`} />
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${prize.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <prize.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{prize.rank} Place</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{prize.title}</h3>
                <div className="text-2xl font-bold cyber-text mb-3">{prize.prize}</div>
                <p className="text-sm text-muted-foreground">{prize.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
