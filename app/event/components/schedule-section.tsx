"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Mousewheel } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Clock, Users, Trophy, Coffee } from "lucide-react"

export default function ScheduleSection() {
  const schedule = [
    {
      time: "9:00 AM",
      title: "Registration & Check-in",
      description: "Welcome participants and distribute event materials",
      icon: Users,
    },
    {
      time: "9:30 AM",
      title: "Opening Ceremony",
      description: "Welcome address and event overview",
      icon: Trophy,
    },
    {
      time: "10:00 AM",
      title: "Hacking Begins!",
      description: "Teams start working on their projects",
      icon: Clock,
    },
    {
      time: "12:00 PM",
      title: "Lunch Break",
      description: "Networking lunch and refreshments",
      icon: Coffee,
    },
    {
      time: "3:00 PM",
      title: "Mentoring Round 1",
      description: "Final guidance and project refinement",
      icon: Users,
    },
    {
      time: "5:00 PM",
      title: "Project Submission",
      description: "Final submissions and preparation for judging",
      icon: Clock,
    },
    {
      time: "5:30 PM",
      title: "Judging & Presentations",
      description: "Teams present their projects to judges",
      icon: Trophy,
    },
    {
      time: "6:00 PM",
      title: "Closing Ceremony",
      description: "Prize distribution and closing remarks",
      icon: Trophy,
    },
  ]

  return (
    <section id="schedule" className="py-20 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Event Schedule
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            An 8-hour coding journey from ideation to implementation
          </p>
        </div>

        <div className="roadmap-wrap max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Mousewheel]}
            slidesPerView={1.15}
            spaceBetween={20}
            centeredSlides={false}
            navigation
            pagination={{ clickable: true }}
            mousewheel={{ forceToAxis: true }}
            grabCursor
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3.4, spaceBetween: 28 },
            }}
            className="roadmapSwiper !pb-14"
          >
            {schedule.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                  className="roadmap-node"
                >
                  <div className="node-dot">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="step-index">{String(index + 1).padStart(2, "0")}</div>

                  <div className="roadmap-card">
                    <span className="time-chip">{item.time}</span>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .roadmap-wrap {
          position: relative;
        }

        .roadmapSwiper {
          padding-top: 2.5rem;
        }

        .roadmapSwiper::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: calc(2.5rem + 24px);
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(220, 38, 38, 0.05),
            rgba(220, 38, 38, 0.55) 15%,
            rgba(253, 224, 71, 0.55) 50%,
            rgba(220, 38, 38, 0.55) 85%,
            rgba(220, 38, 38, 0.05)
          );
          z-index: 0;
        }

        .roadmap-node {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .node-dot {
          position: relative;
          z-index: 2;
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 30% 30%, rgba(220, 38, 38, 0.9), rgba(153, 27, 27, 0.9));
          border: 2px solid rgba(253, 224, 71, 0.7);
          color: #fffffe;
          box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.12), 0 8px 20px -6px rgba(220, 38, 38, 0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .step-index {
          position: absolute;
          top: 0;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(253, 224, 71, 0.85);
        }

        .roadmap-card {
          margin-top: 20px;
          width: 100%;
          flex: 1;
          background: rgba(34, 37, 52, 0.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .time-chip {
          align-self: flex-start;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #fde047;
          background: rgba(253, 224, 71, 0.12);
          border: 1px solid rgba(253, 224, 71, 0.35);
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fffffe;
        }

        .card-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.4;
        }

        .roadmap-node:hover .node-dot {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 0 0 8px rgba(220, 38, 38, 0.18), 0 10px 26px -6px rgba(220, 38, 38, 0.75);
        }

        .roadmap-node:hover .roadmap-card {
          transform: translateY(-4px);
          border-color: rgba(220, 38, 38, 0.45);
          box-shadow: 0 20px 45px -20px rgba(220, 38, 38, 0.45);
        }

        .roadmapSwiper .swiper-button-next,
        .roadmapSwiper .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.55);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          top: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .roadmapSwiper .swiper-button-next:hover,
        .roadmapSwiper .swiper-button-prev:hover {
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          box-shadow: 0 12px 28px -12px rgba(220, 38, 38, 0.6);
          transform: translateY(-2px);
        }
        .roadmapSwiper .swiper-button-next:after,
        .roadmapSwiper .swiper-button-prev:after {
          font-size: 15px !important;
        }
        .roadmapSwiper .swiper-button-disabled {
          opacity: 0.25 !important;
        }

        .roadmapSwiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
        }
        .roadmapSwiper .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #dc2626, #fde047);
        }

        @media (prefers-reduced-motion: reduce) {
          .roadmap-card,
          .node-dot {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}
