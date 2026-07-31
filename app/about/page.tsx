'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CyberNavbar from '../components/CyberNavbar';
import styles from './About.module.css';

function TypewriterText({ text, active, speed = 110 }: { text: string; active: boolean; speed?: number }) {
  const words = text.split(' ');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || count >= words.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [active, count, words.length, speed]);

  const done = count >= words.length;

  return (
    <p className={styles.cardDesc}>
      {words.slice(0, count).join(' ')}
      <span className={`${styles.cursor} ${done ? styles.cursorIdle : ''}`}>|</span>
    </p>
  );
}

export default function AboutPage() {
  const router = useRouter();

  const features = [
    {
      icon: Users,
      title: "Collaboration",
      description: "Work with talented individuals from diverse backgrounds and skill sets.",
    },
    {
      icon: Trophy,
      title: "Competition",
      description: "Compete for exciting prizes and recognition in the tech community.",
    },
    {
      icon: Lightbulb,
      title: "Learning",
      description: "Gain hands-on experience and learn from industry experts and mentors.",
    },
  ];

  const [activeCards, setActiveCards] = useState<boolean[]>(() => features.map(() => false));

  const activateCard = (index: number) => {
    setActiveCards((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

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
          <Zap size={18} /> MISSION BRIEFING // ABOUT US
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          About Code Voyage
        </motion.h1>

        <motion.div
          className={styles.descriptionBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className={styles.description}>
            CodeVoyage 2026 is the flagship 8-hour hackathon organized by the Department of
            Information Technology and the Department of Computer Science &amp; Engineering at the
            Institute of Engineering and Management (IEM), Kolkata. Inspired by the spirit of the
            Avengers, the event unites brilliant minds to assemble, innovate, and build impactful
            technology solutions for real-world challenges. More than a competition, CodeVoyage is a
            battlefield of creativity, collaboration, and coding excellence where every participant
            becomes a hero. From AI to web and app development, teams will push their limits, forge
            powerful ideas, and shape the future through innovation and teamwork.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onViewportEnter={() => activateCard(index)}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className={styles.iconWrapper}>
                  <IconComponent size={32} />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <TypewriterText text={feature.description} active={activeCards[index]} />
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
