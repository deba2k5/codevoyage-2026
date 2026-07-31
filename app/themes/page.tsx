'use client';

import React from 'react';
import CyberNavbar from '../components/CyberNavbar';
import ThemesSection from '../components/ThemesSection';
import styles from './Themes.module.css';

export default function ThemesPage() {
  return (
    <div className={styles.container}>
      {/* Professional Tech Background */}
      <div className={styles.bgGrid} />
      <div className={styles.glowRed} />
      <div className={styles.glowCyan} />
      <div className={styles.glowYellow} />

      <CyberNavbar />

      <main className={styles.mainContent}>
        <ThemesSection />
      </main>
    </div>
  );
}
