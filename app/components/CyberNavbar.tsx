'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './CyberNavbar.module.css';

export default function CyberNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/events');
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>CODEVOYAGE</Link>
      
      <nav className={styles.navLinks}>
        <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.activeLink : ''}`}>HERO</Link>
        <span className={styles.slash}>/</span>
        <Link href="/timeline" className={`${styles.navLink} ${pathname === '/timeline' ? styles.activeLink : ''}`}>TIMELINE</Link>
        <span className={styles.slash}>/</span>
        <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.activeLink : ''}`}>CONTACT</Link>
        <span className={styles.slash}>/</span>
        <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.activeLink : ''}`}>ABOUT US</Link>
        <span className={styles.slash}>/</span>
        <Link href="/events" className={`${styles.navLink} ${pathname === '/events' ? styles.activeLink : ''}`}>EVENT</Link>
        <span className={styles.slash}>/</span>
        <Link href="/shield" className={`${styles.navLink} ${pathname === '/shield' ? styles.activeLink : ''}`}>S.H.I.E.L.D.</Link>
        
        <button className={styles.navButton} onClick={handleSignUp}>SIGN UP</button>
      </nav>
    </header>
  );
}
