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
    <section id="tracks" className="relative">
      <div className="stackWrap">
        {themes.map((theme, index) => {
          const IconComp = theme.icon
          return (
            <div key={theme.title} className="stackItem" style={{ zIndex: index + 1 }}>
              <motion.div
                className="stackCardOuter"
                style={{ background: `linear-gradient(135deg, ${theme.color}, ${theme.color2})` }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <div className="stackCard">
                  {index === 0 && (
                    <div className="stackSectionHeading">
                      <h2 className="stackSectionTitle">Themes</h2>
                      <p className="stackSectionSub">Five domains. Pick your battlefield.</p>
                    </div>
                  )}

                  <div className="stackHeader">
                    <span className="stackNumber" style={{ WebkitTextStrokeColor: `${theme.color}88` }}>
                      {theme.number}
                    </span>
                    <div className="stackHeaderText">
                      <h3 className="stackTitle">{theme.title}</h3>
                      <p className="stackTagline">{theme.tagline}</p>
                    </div>
                  </div>

                  <div className="stackBody">
                    <div className="stackVisual">
                      <div
                        className="stackVisualGlow"
                        style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
                      />
                      <IconComp size={110} strokeWidth={1} style={{ color: theme.color }} />
                    </div>

                    <div className="stackTextCol">
                      <p className="stackDesc">{theme.description}</p>
                    </div>
                  </div>
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
          top: 88px;
          height: calc(100vh - 88px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem clamp(1rem, 4vw, 3rem) 3rem;
        }

        .stackCardOuter {
          width: 100%;
          max-width: 1500px;
          height: 100%;
          margin: 0 auto;
          padding: 2px;
          border-radius: 2.5rem;
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8);
        }

        .stackCard {
          position: relative;
          height: 100%;
          background: #000;
          border-radius: calc(2.5rem - 2px);
          padding: clamp(2rem, 4vw, 3.5rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          overflow: hidden;
        }

        .stackSectionHeading {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .stackSectionTitle {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: white;
        }

        .stackSectionSub {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.35rem;
        }

        .stackHeader {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
        }

        .stackNumber {
          font-family: var(--font-heading);
          font-size: clamp(3.5rem, 6vw, 6rem);
          line-height: 0.85;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.35);
        }

        .stackHeaderText {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stackTitle {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3.2vw, 2.5rem);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: white;
        }

        .stackTagline {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .stackBody {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 45%) 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
          min-height: 0;
        }

        .stackVisual {
          position: relative;
          height: 100%;
          min-height: 200px;
          border-radius: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .stackVisualGlow {
          position: absolute;
          inset: -20%;
          filter: blur(40px);
        }

        .stackTextCol {
          display: flex;
          align-items: center;
        }

        .stackDesc {
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
          max-width: 50ch;
        }

        @media (max-width: 768px) {
          .stackItem {
            position: relative;
            top: auto;
            height: auto;
            min-height: 100vh;
            padding: 5.5rem 1rem 2rem;
          }

          .stackCard {
            padding: 1.5rem;
            gap: 1.25rem;
          }

          .stackBody {
            grid-template-columns: 1fr;
          }

          .stackVisual {
            min-height: 160px;
          }

          .stackNumber {
            font-size: 2.75rem;
          }

          .stackTitle {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </section>
  )
}
