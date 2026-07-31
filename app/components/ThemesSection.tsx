"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
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

export default function ThemesSection() {
  return (
    <section id="tracks" className={styles.themesSection}>
      <div className={styles.header}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Themes
        </motion.h2>
        <p className={styles.subheading}>Five domains. Pick your battlefield.</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        loop
        centeredSlides
        slidesPerView={1.15}
        spaceBetween={24}
        breakpoints={{
          768: { slidesPerView: 1.6, spaceBetween: 32 },
          1100: { slidesPerView: 2.2, spaceBetween: 40 },
        }}
        className={styles.swiper}
      >
        {themes.map((theme) => {
          const IconComp = theme.icon
          return (
            <SwiperSlide key={theme.title} className={styles.slide}>
              <div
                className={styles.cardOuter}
                style={{ background: `linear-gradient(135deg, ${theme.color}, ${theme.color2})` }}
              >
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNumber} style={{ WebkitTextStrokeColor: `${theme.color}88` }}>
                      {theme.number}
                    </span>
                    <div className={styles.cardHeaderText}>
                      <h3 className={styles.cardTitle}>{theme.title}</h3>
                      <p className={styles.cardTagline}>{theme.tagline}</p>
                    </div>
                  </div>

                  <div className={styles.cardVisual}>
                    <div
                      className={styles.cardVisualGlow}
                      style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
                    />
                    <IconComp size={72} strokeWidth={1} style={{ color: theme.color }} />
                  </div>

                  <p className={styles.cardDesc}>{theme.description}</p>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
