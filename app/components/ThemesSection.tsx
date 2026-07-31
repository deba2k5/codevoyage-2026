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

export default function ThemesSection() {
  return (
    <section id="tracks" className="relative">
      <div className="stackWrap">
        {themes.map((theme, index) => {
          const IconComp = theme.icon
          return (
            <div
              key={theme.title}
              className="stackItem"
              style={{ zIndex: index + 1 }}
            >
              <motion.div
                className="stackCard"
                style={{ borderTopColor: theme.color }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                {index === 0 && (
                  <div className="stackHeading">
                    <h2 className="stackHeadingTitle">Themes</h2>
                    <p className="stackHeadingSub">Five domains. Pick your battlefield.</p>
                  </div>
                )}

                <div
                  className="stackIconGlow"
                  style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
                />
                <IconComp size={72} strokeWidth={1} style={{ color: theme.color }} className="stackIcon" />

                <span className="stackNumber" style={{ WebkitTextStrokeColor: `${theme.color}88` }}>
                  {theme.number}
                </span>
                <h3 className="stackTitle">{theme.title}</h3>
                <p className="stackTagline">{theme.tagline}</p>
                <p className="stackDesc">{theme.description}</p>
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
          top: 0;
          height: 100vh;
        }

        .stackCard {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
          border-top: 4px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.75rem;
          padding: clamp(2rem, 5vw, 4rem);
          overflow: hidden;
        }

        .stackHeading {
          position: absolute;
          top: clamp(1.5rem, 4vw, 3rem);
          left: 0;
          right: 0;
          text-align: center;
        }

        .stackHeadingTitle {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: white;
        }

        .stackHeadingSub {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.5rem;
        }

        .stackIconGlow {
          position: absolute;
          top: 30%;
          left: 50%;
          width: 50vw;
          height: 50vw;
          max-width: 500px;
          max-height: 500px;
          transform: translate(-50%, -50%);
          filter: blur(60px);
          pointer-events: none;
        }

        .stackIcon {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .stackNumber {
          position: relative;
          font-family: var(--font-heading);
          font-size: clamp(4rem, 8vw, 7rem);
          line-height: 0.85;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.35);
        }

        .stackTitle {
          position: relative;
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: white;
        }

        .stackTagline {
          position: relative;
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.5rem;
        }

        .stackDesc {
          position: relative;
          font-size: clamp(1.05rem, 1.8vw, 1.35rem);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.8);
          max-width: 55ch;
        }

        @media (max-width: 768px) {
          .stackCard {
            padding: 1.75rem;
            gap: 0.6rem;
          }

          .stackNumber {
            font-size: 3rem;
          }

          .stackTitle {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
