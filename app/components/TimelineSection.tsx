'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { JetBrains_Mono } from 'next/font/google';
import { Clock, Users, Trophy, Coffee, MapPin } from 'lucide-react';
import styles from './TimelineSection.module.css';

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700', '800'] });

const ROW_HEIGHT = 260;

export default function TimelineSection() {
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

  const totalHeight = schedule.length * ROW_HEIGHT;

  const nodeXs = schedule.map((_, i) => (i % 2 === 0 ? 64 : 36));

  const pathD = nodeXs
    .map((x, i) => {
      const y = i * ROW_HEIGHT + ROW_HEIGHT / 2;
      if (i === 0) return `M ${x} ${y}`;
      const prevX = nodeXs[i - 1];
      const prevY = (i - 1) * ROW_HEIGHT + ROW_HEIGHT / 2;
      const midY = (prevY + y) / 2;
      return `C ${prevX} ${midY}, ${x} ${midY}, ${x} ${y}`;
    })
    .join(' ');

  return (
    <section id="timeline" className={styles.container}>
      <div className={styles.bgGrid} />
      <div className={styles.glowRed} />
      <div className={styles.glowCyan} />
      <div className={styles.glowYellow} />

      <div className={styles.mainContent}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <MapPin size={18} /> MISSION TIMELINE
        </motion.div>

        <motion.h2
          className={`${styles.title} ${mono.className}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          TIMELINE
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          The complete 8-hour hackathon schedule, from check-in to closing ceremony.
        </motion.p>

        <div className={styles.pathWrap}>
          <svg
            className={styles.pathSvg}
            viewBox={`0 0 100 ${totalHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="timelinePathGradient" x1="0" y1="0" x2="0" y2={totalHeight} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke="url(#timelinePathGradient)"
              strokeWidth="0.6"
              strokeDasharray="2.4 2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {schedule.map((item, index) => {
            const IconComp = item.icon;
            const x = nodeXs[index];
            const isRightNode = x > 50;

            return (
              <div key={index} className={styles.pathItem} style={{ height: ROW_HEIGHT }}>
                <motion.div
                  className={styles.pathNode}
                  style={{ left: `${x}%` }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <IconComp size={20} />
                </motion.div>

                <motion.div
                  className={`${styles.pathCard} ${isRightNode ? styles.pathCardLeft : styles.pathCardRight}`}
                  initial={{ opacity: 0, x: isRightNode ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <span className={`${styles.pathNumber} ${mono.className}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.pathCardBody}>
                    <span className={`${styles.timelineTime} ${mono.className}`}>{item.time}</span>
                    <h3 className={`${styles.timelineTitle} ${mono.className}`}>{item.title}</h3>
                    <p className={styles.timelineDesc}>{item.description}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
