'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import styles from './FAQSection.module.css';

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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.container}>
      <div className={styles.glowRed} />
      <div className={styles.glowCyan} />

      <div className={styles.mainContent}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <HelpCircle size={18} /> COMMS CHANNEL // FAQS
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          FAQs
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything you need to know before you register.
        </motion.p>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
              >
                <button
                  className={styles.faqQ}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`${styles.faqToggle} ${isOpen ? styles.faqToggleOpen : ''}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className={styles.faqAWrap}
                    >
                      <p className={styles.faqA}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
