'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { characters } from './data/characters';
import CharacterCarousel from './components/CharacterCarousel';
import CyberNavbar from './components/CyberNavbar';
import styles from './Home.module.css';

export default function Home() {
  const router = useRouter();
  const [hoveredCharacterId, setHoveredCharacterId] = useState<string | null>(null);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number>(0);

  // Auto-scroll among characters if the user is not actively hovering
  useEffect(() => {
    if (hoveredCharacterId !== null) return;

    const interval = setInterval(() => {
      setActiveCharacterIndex((prevIndex) => (prevIndex + 1) % characters.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [hoveredCharacterId]);

  // Active character is the hovered one, or the auto-scrolling one
  const activeCharacter = hoveredCharacterId
    ? characters.find(c => c.id === hoveredCharacterId) || characters[activeCharacterIndex]
    : characters[activeCharacterIndex];

  const handleEnterInitiative = () => {
    router.push('/event');
  };

  return (
    <main className={styles.container}>
      {/* Minimal Background Shapes */}
      <div 
        className={styles.accentYellow} 
        style={{ transition: 'background 0.5s ease' }} 
      />
      <div className={styles.diagonalBg} />

      <CyberNavbar />

      <div className={styles.mainContent}>
        <div className={styles.heroTopRow}>
          <div className={styles.leftContent}>
          <motion.div 
            className={styles.heroBadge}
            key={`badge-${activeCharacter.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: activeCharacter.themeColor, borderColor: `${activeCharacter.themeColor}55`, background: `${activeCharacter.themeColor}15` }}
          >
            <Zap size={16} /> CODEVOYAGE 2026 // {activeCharacter.subtitle}
          </motion.div>

          <motion.h1 
            className={styles.title}
            key={activeCharacter.name}
            initial={{ opacity: 0, x: -50, skewX: 10 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
            style={{ color: activeCharacter.themeColor }}
          >
            {activeCharacter.name}
          </motion.h1>
          
          <div className={styles.subtitleBox} style={{ borderLeftColor: activeCharacter.themeColor }}>
            <motion.p 
              className={styles.subtitle}
              key={`desc-${activeCharacter.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {activeCharacter.description}
            </motion.p>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              className={styles.ctaButton}
              style={{ background: activeCharacter.themeColor, color: '#ffffff' }}
              onClick={handleEnterInitiative}
            >
              ENTER INITIATIVE <ArrowRight size={22} style={{ display: 'inline', marginLeft: '0.4rem', verticalAlign: 'middle' }} />
            </button>

            <button 
              className={styles.chooseHeroButton}
              onClick={() => router.push(`/characters/${activeCharacter.id}`)}
            >
              CHOOSE HERO <ArrowRight size={22} style={{ display: 'inline', marginLeft: '0.4rem', verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>

        <div className={styles.rightContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCharacter.id}
              className={styles.characterHero}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, -12, 0] }}
              exit={{ opacity: 0, scale: 1.1, x: -50 }}
              transition={{ 
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                x: { duration: 0.4 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
            >
              {/* Professional Straightened Hero Photo Display */}
              <div 
                className={styles.heroImageWrapper}
                style={{
                border: `2px solid ${activeCharacter.themeColor}88`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${activeCharacter.themeColor}44`,
              }}>
                {activeCharacter.image ? (
                  <img
                    src={activeCharacter.image}
                    alt={activeCharacter.imageAlt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.95)',
                    textTransform: 'uppercase',
                    transform: 'rotate(-90deg)',
                    fontFamily: 'var(--font-heading)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '4px',
                    textShadow: '0 10px 20px rgba(0,0,0,0.5)'
                  }}>
                    {activeCharacter.name}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>

        <div className={styles.carouselContainer}>
          <CharacterCarousel 
            characters={characters} 
            onHoverCharacter={setHoveredCharacterId}
          />
        </div>
      </div>
    </main>
  );
}
