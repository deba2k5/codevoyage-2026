'use client';

import React from 'react';
import styles from './CyberNavbar.module.css';

const NAV_LINKS = [
  { href: '#hero', label: 'HERO' },
  { href: '#character', label: 'HEROES' },
  { href: '#about', label: 'ABOUT' },
  { href: '#tracks', label: 'THEMES' },
  { href: '#timeline', label: 'TIMELINE' },
  { href: '#prizes', label: 'PRIZES' },
  { href: '#faq', label: 'FAQ' },
];

export default function CyberNavbar() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={styles.header}>
      <a
        href="#hero"
        className={styles.logo}
        onClick={(e) => {
          e.preventDefault();
          scrollTo('#hero');
        }}
      >
        CODEVOYAGE
      </a>

      <nav className={styles.navLinks}>
        {NAV_LINKS.map((link, i) => (
          <React.Fragment key={link.href}>
            <a
              href={link.href}
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
            >
              {link.label}
            </a>
            {i < NAV_LINKS.length - 1 && <span className={styles.slash}>/</span>}
          </React.Fragment>
        ))}

        <a
          href="https://forms.gle/YOUR_FORM_ID"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navButton}
        >
          SIGN UP
        </a>
      </nav>
    </header>
  );
}
