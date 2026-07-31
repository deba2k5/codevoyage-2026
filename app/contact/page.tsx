'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Calendar, Clock, HelpCircle, Share2, Mail } from 'lucide-react';
import CyberNavbar from '../components/CyberNavbar';
import styles from './Contact.module.css';

export default function ContactPage() {
  const contacts = [
    { name: "Sreyasi Mondal", phone: "9883177160" },
    { name: "Debangkita Saha", phone: "8777494652" },
    { name: "Debangshu Chatterjee", phone: "6290277345" },
  ];

  const faqs = [
    {
      question: "Who can participate in Code Voyage?",
      answer:
        "The hackathon is open to all college students, regardless of their field of study or experience level. Whether you're a beginner or an experienced developer, you're welcome to participate for Code Voyage.",
    },
    {
      question: "What is the team size limit?",
      answer:
        "Teams can have a minimum of 2 members and a maximum of 4 members. You can form teams with participants from different colleges.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "No, participation in Code Voyage is completely free. We believe in making technology accessible to everyone.",
    },
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, chargers, any hardware you might need for your project, and most importantly, your enthusiasm! We'll provide food, drinks, and a great environment.",
    },
    {
      question: "Will food and accommodation be provided?",
      answer:
        "Yes, we will provide meals and refreshments throughout the event. However, accommodation is not provided, so participants need to arrange their own stay if coming from outside Kolkata.",
    },
    {
      question: "What are the judging criteria?",
      answer:
        "Projects will be evaluated based on innovation, technical implementation, design, presentation, and potential impact. Our panel of expert judges will assess each project fairly.",
    },
    {
      question: "Who owns the intellectual property of the projects?",
      answer:
        "You retain full ownership of your project and any intellectual property created during the hackathon. We encourage you to continue developing your ideas after the event.",
    },
    {
      question: "Can I start working on my project before the hackathon?",
      answer:
        "No, all development work must be done during the hackathon hours. Problem Statements will be given on the day of the hackathon.",
    },
    {
      question: "What if I don't have a team?",
      answer:
        "Don't worry reach out to the student coordinators we will help you finding a team.",
    },
    {
      question: "Are there any specific technologies we must use?",
      answer:
        "No, you're free to use any programming languages, frameworks, or tools you're comfortable with. The focus is on solving problems creatively, not on using specific technologies.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Professional Tech Background */}
      <div className={styles.bgGrid} />
      <div className={styles.glowRed} />
      <div className={styles.glowCyan} />
      <div className={styles.glowYellow} />

      <CyberNavbar />

      <main className={styles.mainContent}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Phone size={18} /> COMMS CHANNEL // CONTACT & FAQS
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have questions about Code Voyage? Reach out directly to our student coordinators or check out our frequently asked questions below.
        </motion.p>

        <div className={styles.topSection}>
          <motion.div
            className={styles.sectionBox}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>
              <Phone size={28} /> Student Coordinators
            </h2>
            <div className={styles.contactList}>
              {contacts.map((c, i) => (
                <a key={i} href={`tel:${c.phone}`} className={styles.contactCard}>
                  <span className={styles.contactName}>{c.name}</span>
                  <span className={styles.phoneChip}>{c.phone}</span>
                </a>
              ))}
            </div>
            <div className={styles.socialRow}>
              <a href="https://www.instagram.com/iemhackoasis2.0?igsh=YmdoMGE2eWw5bmVj" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Instagram</a>
              <a href="https://www.linkedin.com/company/your_company" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>LinkedIn</a>
              <a href="https://www.facebook.com/share/1D1VUXVaWi/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>Facebook</a>
            </div>
          </motion.div>

          <motion.div
            className={styles.sectionBox}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className={styles.sectionTitle} style={{ color: 'var(--accent-yellow)' }}>
              <MapPin size={28} /> Venue & Time
            </h2>
            <div className={styles.infoRow}>
              <MapPin size={24} style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Location:</strong> IEM Gurukul Building, Kolkata
              </div>
            </div>
            <div className={styles.infoRow}>
              <Calendar size={24} style={{ color: 'var(--accent-yellow)' }} />
              <div>
                <strong>Date:</strong> 20th September 2025
              </div>
            </div>
            <div className={styles.infoRow}>
              <Clock size={24} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <strong>Hours:</strong> 10:00 AM - 6:00 PM (8-Hour Hackathon)
              </div>
            </div>
            <div className={styles.infoRow}>
              <Mail size={24} style={{ color: '#ec4899' }} />
              <div>
                <strong>Email:</strong> support@codevoyage.tech
              </div>
            </div>

            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4183.014318067142!2d88.43129347580617!3d22.574513679490387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02751153ddb371%3A0x816e6fee5a5aac55!2sIEM%20Gurukul%20Building!5e1!3m2!1sen!2sin!4v1785183122102!5m2!1sen!2sin"
                className={styles.mapIframe}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="IEM Gurukul Building Venue Map"
              />
            </div>
          </motion.div>
        </div>

        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle} style={{ color: 'white', marginBottom: '2rem' }}>
            <HelpCircle size={32} style={{ color: 'var(--accent-cyan)' }} /> Frequently Asked Questions
          </h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={styles.faqCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              >
                <h3 className={styles.faqQ}>{faq.question}</h3>
                <p className={styles.faqA}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
