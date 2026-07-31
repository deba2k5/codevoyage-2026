"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./ThemesSection.module.css"

type Theme = {
  number: string
  title: string
  tagline: string
  description: string
  heroName: string
  heroImage: string
  color: string
  color2: string
}

const themes: Theme[] = [
  {
    number: "01",
    title: "EDTECH",
    tagline: "Wisdom of Asgard.",
    description:
      "Thor learned worthiness through humility, not raw power. Build the platforms and tools that teach the same lesson—patiently, personally—for every student chasing their own hammer.",
    heroName: "Thor",
    heroImage: "/heroes/thor.jpg",
    color: "#67e8f9",
    color2: "#dc2626",
  },
  {
    number: "02",
    title: "FINTECH",
    tagline: "Genius. Billionaire. Fintech.",
    description:
      "Tony Stark turned an arms fortune into clean energy and a one-man economy. Build the rails that move money as fast as an Iron Man suit assembles.",
    heroName: "Iron Man",
    heroImage: "/heroes/ironman.jpg",
    color: "#fde047",
    color2: "#67e8f9",
  },
  {
    number: "03",
    title: "SPORTS",
    tagline: "Spider-sense for the game.",
    description:
      "Peter Parker's reflexes read a fight before it happens. Build the analytics and fan tools that give athletes—and audiences—that same split-second edge.",
    heroName: "Spider-Man",
    heroImage: "/heroes/spiderman.jpg",
    color: "#dc2626",
    color2: "#fde047",
  },
  {
    number: "04",
    title: "HEALTHTECH",
    tagline: "Gamma-grade healing.",
    description:
      "Bruce Banner is a world-class scientist trapped inside unstoppable power. Build the diagnostics and care tools that turn raw force into precision healing.",
    heroName: "Hulk",
    heroImage: "/heroes/hulk.jpg",
    color: "#34d399",
    color2: "#67e8f9",
  },
  {
    number: "05",
    title: "SUSTAINABILITY",
    tagline: "The shield the planet needs.",
    description:
      "Steve Rogers never fights for himself. Build the clean energy and conservation tech that protects the world for people who aren't born yet.",
    heroName: "Captain America",
    heroImage: "/heroes/captainamerica.jpg",
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
        {themes.map((theme) => (
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

                <div className={styles.cardVisual} style={{ borderColor: `${theme.color}55` }}>
                  <div
                    className={styles.cardVisualGlow}
                    style={{ background: `radial-gradient(circle, ${theme.color}44, transparent 70%)` }}
                  />
                  <img
                    src={theme.heroImage}
                    alt={theme.heroName}
                    className={styles.cardHeroImage}
                  />
                  <span className={styles.cardHeroName} style={{ color: theme.color }}>
                    {theme.heroName}
                  </span>
                </div>

                <p className={styles.cardDesc}>{theme.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
