'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './CharacterCarousel.module.css';

interface Props {
  characters: any[];
  onHoverCharacter: (characterId: string | null) => void;
  onSelectCharacter: (characterId: string) => void;
}

export default function CharacterCarousel({ characters, onHoverCharacter, onSelectCharacter }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCharacterClick = (id: string) => {
    onSelectCharacter(id);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.sectionHeader}>
        <span className={styles.headerDot} />
        SELECT HERO OPERATIVE // ROSTER
      </div>
      <div 
        className={styles.carouselTrack} 
        ref={scrollRef}
      >
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            className={styles.characterCard}
            onClick={() => handleCharacterClick(char.id)}
            onMouseEnter={() => onHoverCharacter(char.id)}
            onMouseLeave={() => onHoverCharacter(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
        ))}
      </div>
    </div>
  );
}
