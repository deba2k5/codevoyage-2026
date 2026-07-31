'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, ShieldCheck, Cpu, Terminal, Users, Radio, Lock } from 'lucide-react';
import CyberNavbar from '../components/CyberNavbar';
import styles from './Shield.module.css';

export default function ShieldPage() {
  const directorate = [
    {
      name: "Sreyasi Mondal",
      role: "Director of Strategic Operations // Overall Coordinator",
      clearance: "LEVEL 10 // ACTIVE",
      phone: "9883177160",
      briefing: "Directs high-level hackathon architecture, inter-college diplomacy, sponsor relations, and overall mission protocol during the 8-hour hackathon.",
    },
    {
      name: "Debangkita Saha",
      role: "Deputy Director // Head of Logistics & Assembly",
      clearance: "LEVEL 09 // ACTIVE",
      phone: "8777494652",
      briefing: "Commands venue assembly at the IEM Gurukul Building, operative check-ins, physical resource distribution, and on-ground field squad synchronization.",
    },
    {
      name: "Debangshu Chatterjee",
      role: "Chief Technical Officer // Head of Grid & Infrastructure",
      clearance: "LEVEL 09 // ACTIVE",
      phone: "6290277345",
      briefing: "Oversees hackathon platform stability, network security, API integration, problem statement deployment, and technical evaluation protocols.",
    }
  ];

  const supportSquads = [
    {
      title: "AI & ML Technical Lead",
      desc: "Manages model evaluation criteria, dataset integrity, and GPU resource mentorship during the intense 8-hour hackathon."
    },
    {
      title: "Cybersecurity & Web3 Sentinel",
      desc: "Monitors on-campus network security, decentralized prototype validation, and blockchain smart contract auditing."
    },
    {
      title: "Cloud & IoT Infrastructure Lead",
      desc: "Provides rapid hardware debugging, sensor calibration support, and cloud server deployment assistance for IoT teams."
    },
    {
      title: "Sprint Scrum & Judging Coordinator",
      desc: "Facilitates mentor office hours, mid-sprint progress checkpoints, and seamless handoff to our industry veteran judging panel."
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bgGrid} />
      <div className={styles.glowBlue} />
      <div className={styles.glowYellow} />

      <CyberNavbar />

      <main className={styles.mainContent}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Shield size={18} /> S.H.I.E.L.D. COMMAND // STRATEGIC DIRECTORATE
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          THE <span className={styles.titleSpan}>DIRECTORATE</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome to the Strategic Hazard Intervention Espionage Logistics Directorate for Code Voyage. 
          Meet the strategic minds, tactical architects, and student coordinators behind our 8-hour hackathon.
        </motion.p>

        {/* Division I: Executive Directorate */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionDot} />
          <h2 className={styles.sectionTitle}>DIVISION I: HIGH COMMAND // STUDENT COORDINATORS</h2>
        </div>

        <div className={styles.rosterGrid}>
          {directorate.map((exec, i) => (
            <motion.div
              key={i}
              className={styles.dossierCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div className={styles.dossierHeader}>
                <span className={styles.clearanceBadge}>
                  <Lock size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> 
                  CLEARANCE: {exec.clearance}
                </span>
                <span className={styles.statusDot} />
              </div>

              <div className={styles.dossierBody}>
                <h3 className={styles.operativeName}>{exec.name}</h3>
                <div className={styles.operativeRole}>{exec.role}</div>
                <p className={styles.operativeBrief}>{exec.briefing}</p>

                <div className={styles.contactRow}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
                    DIRECT COMMS LINK:
                  </span>
                  <a href={`tel:${exec.phone}`} className={styles.phoneLink}>
                    <Phone size={16} /> {exec.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Division II: Tactical Domain Overseers */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionDot} />
          <h2 className={styles.sectionTitle}>DIVISION II: TACTICAL DOMAIN OVERSEERS</h2>
        </div>

        <div className={styles.supportGrid}>
          {supportSquads.map((squad, i) => (
            <motion.div
              key={i}
              className={styles.supportCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Terminal size={22} style={{ color: '#3b82f6' }} />
                <h3 className={styles.supportTitle}>{squad.title}</h3>
              </div>
              <p className={styles.supportDesc}>{squad.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Division III: Field Operations Command Brief */}
        <motion.div
          className={styles.commandBox}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Radio size={32} style={{ color: '#60a5fa' }} />
            <h2 className={styles.commandTitle}>DIVISION III: FIELD OPERATIONS COMMAND</h2>
          </div>
          <p className={styles.commandText}>
            Beyond our Directorate and Domain Overseers, over 50 on-ground volunteer operatives form our rapid-response field squad at the IEM Gurukul Building. From high-speed Wi-Fi grid maintenance and power distribution to midnight nourishment logistics and on-spot mentoring, S.H.I.E.L.D. operatives stand ready to ensure your team can execute its prototype without interruption.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
