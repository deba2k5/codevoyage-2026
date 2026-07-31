'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Trophy, Coffee, MapPin } from 'lucide-react';
import CyberNavbar from '../components/CyberNavbar';
import styles from './Timeline.module.css';

export default function TimelinePage() {
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
          <MapPin size={18} /> MISSION TIMELINE
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          Timeline
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          The complete 8-hour hackathon schedule, from check-in to closing ceremony.
        </motion.p>

        <div className={styles.timelineWrap}>
          {schedule.map((item, index) => {
            const IconComp = item.icon;
            const isLeft = index % 2 === 0;
            const card = (
              <div className={styles.timelineCard}>
                <span className={styles.timelineTime}>{item.time}</span>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            );
            return (
              <div key={index} className={styles.timelineRow}>
                <motion.div
                  className={styles.timelineSlotLeft}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  {isLeft ? card : null}
                </motion.div>

                <div className={styles.timelineDot}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <IconComp size={22} />
                </div>

                <motion.div
                  className={styles.timelineSlotRight}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  {isLeft ? null : card}
                </motion.div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
