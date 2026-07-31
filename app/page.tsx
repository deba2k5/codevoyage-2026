'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { characters } from './data/characters';
import CharacterCarousel from './components/CharacterCarousel';
import CyberNavbar from './components/CyberNavbar';
import ParallaxBackground from './components/ParallaxBackground';
import styles from './Home.module.css';

const LAST_HERO_KEY = 'cv-last-hero';

export default function Home() {
  const router = useRouter();

  const handleSelectFromCarousel = (id: string) => {
    sessionStorage.setItem(LAST_HERO_KEY, id);
    router.push(`/hero/${id}`);
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
              animate={{
                opacity: 1,
                y: 0,
                textShadow: [
                  '4px 4px 0px rgba(0,0,0,0.8), 0 0 20px rgba(220,38,38,0.4)',
                  '4px 4px 0px rgba(0,0,0,0.8), 0 0 45px rgba(220,38,38,0.9)',
                  '4px 4px 0px rgba(0,0,0,0.8), 0 0 20px rgba(220,38,38,0.4)',
                ],
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: { duration: 0.5, type: 'spring' },
                textShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
              }}
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
    </>
  );
}
