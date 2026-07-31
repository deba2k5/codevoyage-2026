'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { characters } from './data/characters';
import CharacterCarousel from './components/CharacterCarousel';
import CyberNavbar from './components/CyberNavbar';
import ParallaxBackground from './components/ParallaxBackground';
import styles from './Home.module.css';

const LAST_HERO_KEY = 'cv-last-hero';

export default function Home() {
  const router = useRouter();
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Auto-cycle the spotlight through the roster, pausing while the
  // user is actually hovering a card themselves.
  useEffect(() => {
    if (hoveredId !== null) return;

    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % characters.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [hoveredId]);

  const activeCharacter = characters.find((c) => c.id === hoveredId) || characters[spotlightIndex];

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

        <div className={styles.mainContent} style={{ justifyContent: 'space-between', gap: '1rem' }}>
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

          <div className={styles.featuredStage}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCharacter.id}
                className={styles.featuredRow}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className={styles.heroImageWrapper}
                  style={{
                    border: `2px solid ${activeCharacter.themeColor}88`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${activeCharacter.themeColor}44`,
                  }}
                >
                  {activeCharacter.image ? (
                    <img
                      src={activeCharacter.image}
                      alt={activeCharacter.imageAlt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  ) : (
                    <div style={{ color: 'white', fontWeight: 900, textTransform: 'uppercase' }}>
                      {activeCharacter.name}
                    </div>
                  )}
                </div>

                <div className={styles.featuredText}>
                  <div className={styles.featuredName} style={{ color: activeCharacter.themeColor }}>
                    {activeCharacter.name}
                  </div>
                  <p className={styles.featuredLine}>{activeCharacter.subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.carouselContainer}>
            <CharacterCarousel
              characters={characters}
              activeCharacterId={activeCharacter.id}
              onHoverCharacter={setHoveredId}
              onSelectCharacter={handleSelectFromCarousel}
            />
          </div>
        </div>
      </main>
    </>
  );
}
