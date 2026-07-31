'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import CyberNavbar from '../components/CyberNavbar';
import styles from './About.module.css';

const MISSION_TEXT =
  "CodeVoyage 2026 is the flagship 8-hour hackathon organized by the Department of " +
  "Information Technology and the Department of Computer Science & Engineering at the " +
  "Institute of Engineering and Management (IEM), Kolkata. Inspired by the spirit of the " +
  "Avengers, the event unites brilliant minds to assemble, innovate, and build impactful " +
  "technology solutions for real-world challenges. More than a competition, CodeVoyage is a " +
  "battlefield of creativity, collaboration, and coding excellence where every participant " +
  "becomes a hero. From AI to web and app development, teams will push their limits, forge " +
  "powerful ideas, and shape the future through innovation and teamwork.";

function TypewriterText({ text, active, speed = 45 }: { text: string; active: boolean; speed?: number }) {
  const words = text.split(' ');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || count >= words.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [active, count, words.length, speed]);

  const done = count >= words.length;

  return (
    <p className={styles.description}>
      {words.slice(0, count).join(' ')}
      <span className={`${styles.cursor} ${done ? styles.cursorIdle : ''}`}>|</span>
    </p>
  );
}

export default function AboutPage() {
  const [active, setActive] = useState(false);

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
          onViewportEnter={() => setActive(true)}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TypewriterText text={MISSION_TEXT} active={active} />
        </motion.div>
      </main>
    </div>
  );
}
