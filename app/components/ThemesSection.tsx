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
    color2: "#dc2626",
  },
  {
    number: "02",
    title: "FINTECH",
    tagline: "Reinvent money.",
    description:
      "Payments, lending, and banking still lock people out. Build the rails that make money move faster, safer, and fairer for everyone.",
    icon: Landmark,
    color: "#fde047",
    color2: "#67e8f9",
  },
  {
    number: "03",
    title: "SPORTS",
    tagline: "Level up the game.",
    description:
      "From fan engagement to athlete performance, sport runs on data now. Build the tools that give players and fans an edge.",
    icon: Trophy,
    color: "#dc2626",
    color2: "#fde047",
  },
  {
    number: "04",
    title: "HEALTHTECH",
    tagline: "Heal smarter.",
    description:
      "Healthcare is slow, expensive, and hard to access. Build diagnostics, care tools, and platforms that put people first.",
    icon: HeartPulse,
    color: "#34d399",
    color2: "#67e8f9",
  },
  {
    number: "05",
    title: "SUSTAINABILITY",
    tagline: "Save the planet.",
    description:
      "Climate change won't wait. Build the clean energy, waste reduction, and conservation tech that buys us time.",
    icon: Leaf,
    color: "#67e8f9",
    color2: "#34d399",
  },
]

export default function ThemesSection() {
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
              style={{ top: `${72 + index * 10}px`, zIndex: index + 1 }}
            >
              <motion.div
                className="stackCardOuter"
                style={{ background: `linear-gradient(135deg, ${theme.color}, ${theme.color2})` }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="stackCard">
                  <div
                    className="stackIconGlow"
                    style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
                  />
                  <IconComp size={64} strokeWidth={1} style={{ color: theme.color }} className="stackIcon" />

                  <span className="stackNumber" style={{ WebkitTextStrokeColor: `${theme.color}88` }}>
                    {theme.number}
                  </span>
                  <h3 className="stackTitle">{theme.title}</h3>
                  <p className="stackTagline">{theme.tagline}</p>
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
          height: 74vh;
          min-height: 480px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-bottom: 6rem;
        }

        .stackItem:not(:last-child) {
          margin-bottom: 10vh;
        }

        .stackCardOuter {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 2px;
          border-radius: 2.5rem;
          box-shadow: 0 0 60px -20px rgba(0, 0, 0, 0.6);
        }

        .stackCard {
          position: relative;
          height: 100%;
          background: #000;
          border-radius: calc(2.5rem - 2px);
          padding: clamp(2rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.75rem;
          overflow: hidden;
        }

        .stackIconGlow {
          position: absolute;
          top: -10%;
          left: 50%;
          width: 60%;
          height: 60%;
          transform: translateX(-50%);
          filter: blur(40px);
          pointer-events: none;
        }

        .stackIcon {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .stackNumber {
          position: relative;
          font-family: var(--font-heading);
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          line-height: 0.85;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.35);
        }

        .stackTitle {
          position: relative;
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: white;
        }

        .stackTagline {
          position: relative;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.5rem;
        }

        .stackDesc {
          position: relative;
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.8);
          max-width: 55ch;
        }

        @media (max-width: 768px) {
          .stackItem {
            height: auto;
            min-height: 0;
            padding-bottom: 3rem;
          }

          .stackCard {
            padding: 1.75rem;
            gap: 0.6rem;
          }

          .stackNumber {
            font-size: 2.75rem;
          }

          .stackTitle {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  )
}
