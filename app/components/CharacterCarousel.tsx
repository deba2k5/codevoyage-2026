'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CharacterCarousel.module.css';

interface Props {
  characters: any[];
  activeCharacterId: string;
  onHoverCharacter: (characterId: string | null) => void;
  onSelectCharacter: (characterId: string) => void;
}

export default function CharacterCarousel({ characters, activeCharacterId, onHoverCharacter, onSelectCharacter }: Props) {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.sectionHeader}>
        <span className={styles.headerDot} />
        SELECT HERO OPERATIVE // ROSTER
      </div>
      <div className={styles.carouselTrack}>
        {characters.map((char, index) => {
          const isActive = activeCharacterId === char.id;
          return (
            <motion.div
              key={char.id}
              className={styles.characterCard}
              onClick={() => onSelectCharacter(char.id)}
              onMouseEnter={() => onHoverCharacter(char.id)}
              onMouseLeave={() => onHoverCharacter(null)}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: isActive ? -18 : 0,
                scale: isActive ? 1.08 : 1,
                boxShadow: isActive
                  ? `0 20px 45px -10px ${char.themeColor}99, 0 0 0 2px ${char.themeColor}`
                  : '0 0 0 0 transparent',
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.1 },
                y: { duration: 0.5, ease: 'easeOut' },
                scale: { duration: 0.5, ease: 'easeOut' },
                boxShadow: { duration: 0.5, ease: 'easeOut' },
              }}
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              <div className={styles.characterImageContainer}>
                {char.image ? (
                  <img
                    src={char.image}
                    alt={char.imageAlt}
                    className={styles.characterImage}
                  />
                ) : (
                  /* Fallback silhouette if no image is available yet */
                  <div
                    className={styles.silhouette}
                    style={{ backgroundColor: char.themeColor }}
                  >
                    {char.name}
                  </div>
                )}
              </div>
              <div className={styles.characterName} style={{ color: char.themeColor }}>
                {char.name}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
