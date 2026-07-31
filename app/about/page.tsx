'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Trophy, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CyberNavbar from '../components/CyberNavbar';
import styles from './About.module.css';

export default function AboutPage() {
  const router = useRouter();

  const features = [
    {
      icon: Code,
      title: "Innovation",
      description: "Push the boundaries of technology and create groundbreaking solutions.",
    },
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
            Code Voyage is an inter and intra college hackathon, an 8 hour hackathon
            where teams of 2 to 4 build real world prototypes across AI and ML, Web and App, AR and VR,
            IoT, and Cybersecurity. Open to all undergraduate colleges, with on-spot problem statements,
            expert mentoring, certificates, prizes, internship opportunities, and networking.
            Limited seats — register now.
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
              >
                <div className={styles.iconWrapper}>
                  <IconComponent size={32} />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
