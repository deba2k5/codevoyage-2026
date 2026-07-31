'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Users, Trophy, Coffee, Bell, Calendar } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CyberNavbar from '../components/CyberNavbar';
import styles from './News.module.css';

export default function NewsPage() {
  const newsBulletins = [
    {
      date: "LATEST BULLETIN // SEPTEMBER 2025",
      title: "Code Voyage 2026 Registrations Open",
      description: "Registration is completely free and open to all undergraduate college students. Form teams of 2 to 4 developers across different colleges and prepare for an 8-hour hackathon.",
    },
    {
      date: "POLICY UPDATE // PROTOCOL",
      title: "On-Spot Problem Statements Revealed Day-Of",
      description: "To ensure a fair and competitive environment, all problem statements across AI/ML, Blockchain, Sustainable Tech, and CyberSecurity will be revealed at exactly 10:00 AM on the day of the hackathon.",
    },
    {
      date: "ANNOUNCEMENT // BOUNTY POOL",
      title: "₹20,000 Total Prize Pool Split Announced",
      description: "The top three teams will take home massive cash prizes: 1st Place receives ₹10,000, 2nd Place receives ₹6,000, and 3rd Place receives ₹4,000, along with certificates and internship opportunities.",
    },
  ];

  const schedule = [
    {
      time: "9:00 AM",
      title: "Registration & Check-in",
      description: "Welcome participants and distribute event materials and swag",
      icon: Users,
    },
    {
      time: "9:30 AM",
      title: "Opening Ceremony",
      description: "Welcome address, sponsor introductions, and event overview",
      icon: Trophy,
    },
    {
      time: "10:00 AM",
      title: "Hacking Begins!",
      description: "Problem statements revealed; teams start working on their prototypes",
      icon: Clock,
    },
    {
      time: "12:00 PM",
      title: "Lunch Break",
      description: "Networking lunch and energy refreshments for all participants",
      icon: Coffee,
    },
    {
      time: "3:00 PM",
      title: "Mentoring Round 1",
      description: "Final guidance, code reviews, and project refinement with expert mentors",
      icon: Users,
    },
    {
      time: "5:00 PM",
      title: "Project Submission",
      description: "Final code commits, repository freeze, and preparation for judging",
      icon: Clock,
    },
    {
      time: "5:30 PM",
      title: "Judging & Presentations",
      description: "Teams present and demo their working prototypes to the expert panel",
      icon: Trophy,
    },
    {
      time: "6:00 PM",
      title: "Closing Ceremony",
      description: "Prize distribution, winner announcements, and closing remarks",
      icon: Trophy,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Professional Tech Background */}
      <div className={styles.bgGrid} />
      <div className={styles.glowRed} />
      <div className={styles.glowCyan} />
      <div className={styles.glowYellow} />

      <CyberNavbar />

      <main className={styles.mainContent}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Bell size={18} /> LIVE DISPATCH // NEWS & TIMELINE
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          News & Updates
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stay updated with official bulletins, event protocols, and the complete 8-hour hackathon schedule.
        </motion.p>

        <section className={styles.newsSection}>
          <h2 className={styles.sectionHeader}>
            <Zap size={32} /> Latest Announcements
          </h2>
          <div className={styles.newsGrid}>
            {newsBulletins.map((item, index) => (
              <motion.div
                key={index}
                className={styles.newsCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className={styles.newsDate}>{item.date}</div>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsDesc}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={styles.sectionHeader} style={{ color: 'var(--primary)' }}>
            <Calendar size={32} /> Event Schedule
          </h2>
          <div className={styles.roadmapWrap}>
            <Swiper
              modules={[Navigation, Pagination, Mousewheel]}
              slidesPerView={1.15}
              spaceBetween={20}
              navigation
              pagination={{ clickable: true }}
              mousewheel={{ forceToAxis: true }}
              grabCursor
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 3.4, spaceBetween: 28 },
              }}
              className={styles.roadmapSwiper}
            >
              {schedule.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <SwiperSlide key={index} style={{ height: 'auto' }}>
                    <motion.div
                      className={styles.roadmapNode}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                    >
                      <div className={styles.nodeDot}>
                        <IconComp size={20} />
                      </div>
                      <div className={styles.stepIndex}>{String(index + 1).padStart(2, '0')}</div>

                      <div className={styles.timelineCard}>
                        <span className={styles.timelineTime}>{item.time}</span>
                        <h3 className={styles.timelineTitle}>{item.title}</h3>
                        <p className={styles.timelineDesc}>{item.description}</p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      </main>
    </div>
  );
}
