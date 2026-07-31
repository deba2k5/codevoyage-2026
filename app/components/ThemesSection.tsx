"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { GraduationCap, Landmark, Trophy, HeartPulse, Leaf, LucideIcon } from "lucide-react"
import styles from "./ThemesSection.module.css"

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
    <div className={styles.cardSticky} style={{ top: `${96 + index * 44}px`, zIndex: index + 1 }}>
      <motion.div className={styles.cardOuter} style={{ scale, willChange: "transform" }}>
        <div
          className={styles.borderSpin}
          style={
            {
              "--c1": theme.color,
              "--c2": theme.color2,
            } as React.CSSProperties
          }
        />
        <div className={styles.cardInner}>
          {index === 0 && (
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>Themes</h2>
              <p className={styles.sectionSub}>Five domains. Pick your battlefield.</p>
            </div>
          )}

          <div className={styles.cardHeader}>
            <span className={styles.cardNumber} style={{ WebkitTextStrokeColor: `${theme.color}88` }}>
              {theme.number}
            </span>
            <div className={styles.cardHeaderText}>
              <h3 className={styles.cardTitle}>{theme.title}</h3>
              <p className={styles.cardTagline}>{theme.tagline}</p>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.cardVisual}>
              <div
                className={styles.cardVisualGlow}
                style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
              />
              <IconComp size={110} strokeWidth={1} style={{ color: theme.color }} />
            </div>

            <div className={styles.cardTextCol}>
              <p className={styles.cardDesc}>{theme.description}</p>
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
      className={styles.stackSection}
      style={{ height: `${themes.length * 100}vh` }}
    >
      {themes.map((theme, index) => (
        <ThemeCard key={theme.title} theme={theme} index={index} total={themes.length} progress={scrollYProgress} />
      ))}
    </section>
  )
}
