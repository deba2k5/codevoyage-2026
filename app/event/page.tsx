import type { Metadata } from "next"

import ThreeBackground from "./components/three-background"
import Navigation from "./components/navigation"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import ScheduleSection from "./components/schedule-section"
import TracksSection from "./components/tracks-section"
import PrizesSection from "./components/prizes-section"
import JudgesSection from "./components/judges-section"
import FlashbackSection from "./components/flashback-section"
import StatsChart from "./components/stats-chart"
import SponsorsSection from "./components/sponsors-section"
import FAQSection from "./components/faq-section"
import Footer from "./components/footer"

export const metadata: Metadata = {
  title: "CodeVoyage — Hackathon",
  description:
    "CodeVoyage is an 8 hour hackathon. Build real world prototypes across AI/ML, Web & App, AR/VR, IoT and Cybersecurity.",
}

export default function EventPage() {
  return (
    <div className="cv-event relative min-h-screen">
      <ThreeBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <TracksSection />
        <PrizesSection />
        <JudgesSection />
        <FlashbackSection />
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <StatsChart />
          </div>
        </section>
        <SponsorsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
