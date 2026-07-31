'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { characters } from './data/characters';
import CharacterCarousel from './components/CharacterCarousel';
import CharacterDetailSection from './components/CharacterDetailSection';
import CyberNavbar from './components/CyberNavbar';
import AboutSection from './components/AboutSection';
import ThemesSection from './components/ThemesSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import FAQSection from './components/FAQSection';
import SiteFooter from './components/SiteFooter';
import ParallaxBackground from './components/ParallaxBackground';
import styles from './Home.module.css';

export default function Home() {
  const [chosenCharacterId, setChosenCharacterId] = useState<string | null>(null);

  const chosenCharacter = characters.find(c => c.id === chosenCharacterId) || null;

  useEffect(() => {
    if (!chosenCharacterId) return;
    document.querySelector('#character')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [chosenCharacterId]);

  const handleSelectFromCarousel = (id: string) => {
    setChosenCharacterId(id);
  };

  return (
    <>
      <ParallaxBackground />
      <CyberNavbar />

      <main className={styles.container} id="hero">
        {/* Minimal Background Shapes */}
        <div className={styles.accentYellow} />
        <div className={styles.diagonalBg} />

        <div className={styles.mainContent} style={{ justifyContent: 'center', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ margin: '0 auto 1.5rem' }}
            >
              <Zap size={16} /> CODEVOYAGE 2026
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              Choose Your Hero
            </motion.h1>
          </div>

          <div className={styles.carouselContainer}>
            <CharacterCarousel
              characters={characters}
              onHoverCharacter={() => {}}
              onSelectCharacter={handleSelectFromCarousel}
            />
          </div>
        </div>
      </main>

      {chosenCharacter && (
        <div id="character">
          <CharacterDetailSection character={chosenCharacter} />
        </div>
      )}

      <AboutSection />
      <ThemesSection />
      <TimelineSection />
      <PrizesSection />
      <FAQSection />
      <SiteFooter />
    </>
  );
}
