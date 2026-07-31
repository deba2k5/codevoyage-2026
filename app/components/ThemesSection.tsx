"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { GraduationCap, Landmark, Trophy, HeartPulse, Leaf, LucideIcon } from "lucide-react"

type Theme = {
  number: string
  title: string
  tagline: string
  description: string
  icon: LucideIcon
  color: string
  color2: string
}

const themes: Theme[] = [
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

function ThemeCard({
  theme,
  index,
  total,
  progress,
}: {
  theme: Theme
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = Math.max(0.85, 1 - (total - 1 - index) * 0.045)
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const IconComp = theme.icon

  return (
    <div className="cardSticky" style={{ top: `${96 + index * 44}px`, zIndex: index + 1 }}>
      <motion.div className="cardOuter" style={{ scale, willChange: "transform" }}>
        <div
          className="borderSpin"
          style={
            {
              "--c1": theme.color,
              "--c2": theme.color2,
            } as React.CSSProperties
          }
        />
        <div className="cardInner">
          {index === 0 && (
            <div className="sectionHeading">
              <h2 className="sectionTitle">Themes</h2>
              <p className="sectionSub">Five domains. Pick your battlefield.</p>
            </div>
          )}

          <div className="cardHeader">
            <span className="cardNumber" style={{ WebkitTextStrokeColor: `${theme.color}88` }}>
              {theme.number}
            </span>
            <div className="cardHeaderText">
              <h3 className="cardTitle">{theme.title}</h3>
              <p className="cardTagline">{theme.tagline}</p>
            </div>
          </div>

          <div className="cardBody">
            <div className="cardVisual">
              <div
                className="cardVisualGlow"
                style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
              />
              <IconComp size={110} strokeWidth={1} style={{ color: theme.color }} />
            </div>

            <div className="cardTextCol">
              <p className="cardDesc">{theme.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ThemesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section
      id="tracks"
      ref={containerRef}
      className="stackSection"
      style={{ height: `${themes.length * 100}vh` }}
    >
      {themes.map((theme, index) => (
        <ThemeCard key={theme.title} theme={theme} index={index} total={themes.length} progress={scrollYProgress} />
      ))}

      <style jsx>{`
        .stackSection {
          position: relative;
        }

        .cardSticky {
          position: sticky;
          height: 88vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(1rem, 4vw, 3rem);
        }

        .cardOuter {
          position: relative;
          width: 100%;
          max-width: 1500px;
          height: 84vh;
          border-radius: 56px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.8);
        }

        .borderSpin {
          position: absolute;
          inset: -60%;
          background: conic-gradient(from 0deg, var(--c1), var(--c2), var(--c1));
          animation: spin 7s linear infinite;
          will-change: transform;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .cardInner {
          position: absolute;
          inset: 3px;
          background: #000;
          border-radius: 53px;
          padding: clamp(2rem, 4vw, 3.5rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          overflow: hidden;
        }

        .sectionHeading {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .sectionTitle {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: white;
        }

        .sectionSub {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.35rem;
        }

        .cardHeader {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
        }

        .cardNumber {
          font-family: var(--font-heading);
          font-size: clamp(3.5rem, 6vw, 6rem);
          line-height: 0.85;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.35);
        }

        .cardHeaderText {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cardTitle {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3.2vw, 2.5rem);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: white;
        }

        .cardTagline {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .cardBody {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 45%) 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
          min-height: 0;
        }

        .cardVisual {
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

        .cardVisualGlow {
          position: absolute;
          inset: -20%;
          filter: blur(40px);
        }

        .cardTextCol {
          display: flex;
          align-items: center;
        }

        .cardDesc {
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
          max-width: 50ch;
        }

        @media (prefers-reduced-motion: reduce) {
          .borderSpin {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .stackSection {
            height: auto !important;
          }

          .cardSticky {
            position: relative;
            top: auto !important;
            height: auto;
            min-height: 100vh;
            padding: 5.5rem 1rem 2rem;
          }

          .cardOuter {
            height: auto;
            min-height: 80vh;
            border-radius: 32px;
          }

          .cardInner {
            position: relative;
            inset: auto;
            margin: 3px;
            width: auto;
            border-radius: 29px;
            padding: 1.5rem;
            gap: 1.25rem;
          }

          .cardBody {
            grid-template-columns: 1fr;
          }

          .cardVisual {
            min-height: 160px;
          }

          .cardNumber {
            font-size: 2.75rem;
          }

          .cardTitle {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </section>
  )
}
