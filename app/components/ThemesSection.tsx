"use client"

import { motion } from "framer-motion"
import { GraduationCap, Landmark, Trophy, HeartPulse, Leaf } from "lucide-react"

const themes = [
  {
    number: "01",
    title: "EDTECH",
    tagline: "Fix education.",
    description:
      "Learning is broken in a hundred small ways. Build platforms, tools, and experiences that make education work for every student, everywhere.",
    icon: GraduationCap,
    color: "#67e8f9",
  },
  {
    number: "02",
    title: "FINTECH",
    tagline: "Reinvent money.",
    description:
      "Payments, lending, and banking still lock people out. Build the rails that make money move faster, safer, and fairer for everyone.",
    icon: Landmark,
    color: "#fde047",
  },
  {
    number: "03",
    title: "SPORTS",
    tagline: "Level up the game.",
    description:
      "From fan engagement to athlete performance, sport runs on data now. Build the tools that give players and fans an edge.",
    icon: Trophy,
    color: "#dc2626",
  },
  {
    number: "04",
    title: "HEALTHTECH",
    tagline: "Heal smarter.",
    description:
      "Healthcare is slow, expensive, and hard to access. Build diagnostics, care tools, and platforms that put people first.",
    icon: HeartPulse,
    color: "#34d399",
  },
  {
    number: "05",
    title: "SUSTAINABILITY",
    tagline: "Save the planet.",
    description:
      "Climate change won't wait. Build the clean energy, waste reduction, and conservation tech that buys us time.",
    icon: Leaf,
    color: "#67e8f9",
  },
]

export default function TracksSection() {
  return (
    <section id="tracks" className="relative py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">Themes</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            Five domains. Pick your battlefield.
          </p>
        </div>
      </div>

      <div className="stackWrap">
        {themes.map((theme, index) => {
          const IconComp = theme.icon
          return (
            <div
              key={theme.title}
              className="stackItem"
              style={{ top: `${88 + index * 18}px`, zIndex: index + 1 }}
            >
              <motion.div
                className="stackCard"
                style={{ borderTopColor: theme.color }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="stackNumberCol">
                  <span className="stackNumber" style={{ WebkitTextStrokeColor: `${theme.color}55` }}>
                    {theme.number}
                  </span>
                  <h3 className="stackTitle">{theme.title}</h3>
                  <p className="stackTagline">{theme.tagline}</p>
                </div>

                <div className="stackVisual">
                  <div className="stackIconGlow" style={{ background: `radial-gradient(circle, ${theme.color}33, transparent 70%)` }} />
                  <div className="stackIconRing" style={{ borderColor: theme.color, color: theme.color }}>
                    <IconComp size={56} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="stackTextCol">
                  <p className="stackDesc">{theme.description}</p>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .stackWrap {
          position: relative;
        }

        .stackItem {
          position: sticky;
          height: 62vh;
          min-height: 420px;
          display: flex;
          align-items: flex-start;
          padding-bottom: 6rem;
        }

        .stackItem:not(:last-child) {
          margin-bottom: 8vh;
        }

        .stackCard {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem clamp(1.5rem, 5vw, 3.5rem);
          border-radius: 1.5rem;
          background: rgba(15, 17, 26, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 3px solid;
          box-shadow: 0 30px 70px -25px rgba(0, 0, 0, 0.7);
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto auto;
          gap: 1rem 2.5rem;
          align-items: center;
        }

        .stackNumberCol {
          grid-column: 1;
          grid-row: 1 / span 2;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          min-width: 180px;
        }

        .stackNumber {
          font-family: var(--font-heading);
          font-size: 5rem;
          line-height: 0.85;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
        }

        .stackTitle {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: white;
          margin-top: 0.5rem;
        }

        .stackTagline {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.15rem;
        }

        .stackVisual {
          grid-column: 2;
          grid-row: 1;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 90px;
        }

        .stackIconGlow {
          position: absolute;
          inset: -40px;
          border-radius: 9999px;
          filter: blur(20px);
        }

        .stackIconRing {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 9999px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
        }

        .stackTextCol {
          grid-column: 2;
          grid-row: 2;
        }

        .stackDesc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
          max-width: 60ch;
        }

        @media (max-width: 768px) {
          .stackItem {
            height: auto;
            min-height: 0;
            padding-bottom: 3rem;
          }

          .stackCard {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            padding: 1.75rem;
            gap: 1rem;
          }

          .stackNumberCol {
            grid-column: 1;
            grid-row: 1;
            min-width: 0;
          }

          .stackNumber {
            font-size: 3.25rem;
          }

          .stackTitle {
            font-size: 1.5rem;
          }

          .stackVisual {
            grid-column: 1;
            grid-row: 2;
            justify-content: flex-start;
            height: 70px;
          }

          .stackIconRing {
            width: 70px;
            height: 70px;
          }

          .stackTextCol {
            grid-column: 1;
            grid-row: 3;
          }
        }
      `}</style>
    </section>
  )
}
