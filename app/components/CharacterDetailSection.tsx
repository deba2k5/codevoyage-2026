'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Character } from '../data/characters';
import styles from './CharacterDetailSection.module.css';
import SpiderManGame from './games/SpiderManGame';
import IronManGame from './games/IronManGame';
import CaptainAmericaGame from './games/CaptainAmericaGame';
import ThorGame from './games/ThorGame';
import HulkGame from './games/HulkGame';

interface Props {
  character: Character;
}

export default function CharacterDetailSection({ character }: Props) {
  return (
    <div
      style={
        {
          '--theme-color': character.themeColor,
          '--secondary-color': character.secondaryColor,
          '--accent-color': character.accentColor,
        } as React.CSSProperties
      }
    >
      <section className={styles.section}>
        <div className={styles.headerRow}>
          <motion.h2
            className={styles.characterName}
            key={`name-${character.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {character.name}
          </motion.h2>
          <p className={styles.characterDesc}>{character.description}</p>
        </div>

        <motion.h3
          className={styles.sectionTitle}
          style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Operative Trivia // Technical Specs
        </motion.h3>
        <div className={styles.grid}>
          {character.trivia?.map((item, index) => (
            <div key={index} className={styles.card} style={{ borderLeftColor: character.themeColor }}>
              <div className={styles.cardContent}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: character.themeColor,
                      boxShadow: `0 0 10px ${character.themeColor}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.9rem',
                      color: '#94a3b8',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    SPEC // 0{index + 1}
                  </span>
                </div>
                <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>
                  {item.title}
                </h3>
                <p className={styles.cardText}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Hackathon Synergy // Code Voyage
        </motion.h2>

        <motion.div
          className={styles.synergyBox}
          style={{ borderColor: character.themeColor }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.synergyBadge} style={{ borderColor: character.themeColor, color: character.themeColor }}>
            <Trophy size={18} />
            DOMAIN SPECIALTY: {character.domainSpecialty}
          </div>
          <p className={styles.synergyText}>{character.hackathonConnection}</p>
        </motion.div>
      </section>

      {character.id === 'spider-man' && <SpiderManGame themeColor={character.themeColor} />}
      {character.id === 'iron-man' && <IronManGame themeColor={character.themeColor} />}
      {character.id === 'captain-america' && <CaptainAmericaGame themeColor={character.themeColor} />}
      {character.id === 'thor' && <ThorGame themeColor={character.themeColor} />}
      {character.id === 'hulk' && <HulkGame themeColor={character.themeColor} />}
    </div>
  );
}
