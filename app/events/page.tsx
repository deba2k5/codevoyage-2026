'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Medal, Award, ArrowRight } from 'lucide-react';
import CyberNavbar from '../components/CyberNavbar';
import ThemesSection from '../components/ThemesSection';
import styles from './Events.module.css';

export default function EventsPage() {
  const prizes = [
    {
      icon: Trophy,
      title: "Overall Winner",
      prize: "₹10,000",
      description: "Best overall project across all tracks",
      rank: "1st Place",
    },
    {
      icon: Medal,
      title: "First Runner-up",
      prize: "₹6,000",
      description: "Second best project overall",
      rank: "2nd Place",
    },
    {
      icon: Award,
      title: "Second Runner-up",
      prize: "₹4,000",
      description: "Third best project overall",
      rank: "3rd Place",
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
        <div className={styles.heroBox}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Zap size={18} /> INITIATIVE OPERATIONAL // 2026 EDITION
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            CODE VOYAGE <span className={styles.titleAccent}>HACKATHON</span>
          </motion.h1>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            &gt; Innovate. Collaborate. Create. &lt;
          </motion.p>

          <motion.div
            className={styles.statsRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.statCard}>
              <div className={styles.statVal}>08</div>
              <div className={styles.statLabel}>Hours of Coding</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statVal}>₹20k+</div>
              <div className={styles.statLabel}>Prize Pool</div>
            </div>
          </motion.div>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="https://forms.gle/YOUR_FORM_ID"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryCta}
            >
              Register Now <ArrowRight size={22} style={{ display: 'inline', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
            </a>
            <a
              href="#tracks"
              className={styles.secondaryCta}
            >
              Explore Themes
            </a>
          </motion.div>
        </div>

        <ThemesSection />

        <section id="prizes">
          <h2 className={styles.sectionTitle} style={{ color: 'var(--accent-yellow)' }}>
            <Trophy size={32} /> Prizes & Recognition
          </h2>
          <div className={styles.prizesGrid}>
            {prizes.map((prize, index) => {
              const IconComp = prize.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.prizeCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={styles.prizeRank}>{prize.rank}</div>
                  <h3 className={styles.prizeTitle}>{prize.title}</h3>
                  <div className={styles.prizeAmount}>{prize.prize}</div>
                  <p className={styles.prizeDesc}>{prize.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
