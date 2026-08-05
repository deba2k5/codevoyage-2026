'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './CyberNavbar.module.css';

const SECTION_LINKS = [
  { href: '#about', label: 'ABOUT' },
  { href: '#tracks', label: 'THEMES' },
  { href: '#timeline', label: 'TIMELINE' },
  { href: '#prizes', label: 'PRIZES' },
  { href: '#faq', label: 'FAQ' },
];

const LAST_HERO_KEY = 'cv-last-hero';

export default function CyberNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const onHeroPage = pathname?.startsWith('/hero/');

  const goHome = () => {
    router.push('/');
  };

  const goToSection = (hash: string) => {
    if (onHeroPage) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const lastHero = typeof window !== 'undefined' ? sessionStorage.getItem(LAST_HERO_KEY) : null;
    router.push(`/hero/${lastHero || 'spider-man'}${hash}`);
  };

  return (
    <header className={styles.header}>
      <a
        href="/"
        className={styles.logo}
        onClick={(e) => {
          e.preventDefault();
          goHome();
        }}
      >
        CODEVOYAGE
      </a>

      <nav className={styles.navLinks}>
        <a
          href="/"
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
        >
          HOME
        </a>
        <span className={styles.slash}>/</span>

        {SECTION_LINKS.map((link, i) => (
          <React.Fragment key={link.href}>
            <a
              href={link.href}
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                goToSection(link.href);
              }}
            >
              {link.label}
            </a>
            {i < SECTION_LINKS.length - 1 && <span className={styles.slash}>/</span>}
          </React.Fragment>
        ))}

        <a
          href="https://luma.com/x5z33nz5"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navButton}
        >
          REGISTER NOW
        </a>
      </nav>
    </header>
  );
}
