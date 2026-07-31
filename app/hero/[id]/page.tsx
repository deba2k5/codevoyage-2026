'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { characters } from '../../data/characters';
import CharacterDetailSection from '../../components/CharacterDetailSection';
import CyberNavbar from '../../components/CyberNavbar';
import AboutSection from '../../components/AboutSection';
import ThemesSection from '../../components/ThemesSection';
import TimelineSection from '../../components/TimelineSection';
import PrizesSection from '../../components/PrizesSection';
import FAQSection from '../../components/FAQSection';
import SiteFooter from '../../components/SiteFooter';
import ParallaxBackground from '../../components/ParallaxBackground';

const LAST_HERO_KEY = 'cv-last-hero';

export default function HeroPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const character = characters.find((c) => c.id === params.id);

  useEffect(() => {
    if (character) sessionStorage.setItem(LAST_HERO_KEY, character.id);
  }, [character]);

  if (!character) {
    return (
      <>
        <ParallaxBackground />
        <CyberNavbar />
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'white' }}>
          <p>That hero isn&apos;t in the roster.</p>
          <button onClick={() => router.push('/')} style={{ textDecoration: 'underline' }}>
            Go back and choose your hero
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <ParallaxBackground />
      <CyberNavbar />

      <div id="character">
        <CharacterDetailSection character={character} />
      </div>

      <AboutSection />
      <ThemesSection />
      <TimelineSection />
      <PrizesSection />
      <FAQSection />
      <SiteFooter />
    </>
  );
}
