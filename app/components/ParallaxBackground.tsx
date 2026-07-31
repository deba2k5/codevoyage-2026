'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 4000], [0, 500]);
  const y2 = useTransform(scrollY, [0, 4000], [0, -350]);
  const y3 = useTransform(scrollY, [0, 4000], [0, 260]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          y: y1,
          position: 'absolute',
          top: '2%',
          left: '-8%',
          width: 520,
          height: 520,
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.14), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <motion.div
        style={{
          y: y2,
          position: 'absolute',
          top: '35%',
          right: '-6%',
          width: 480,
          height: 480,
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(103,232,249,0.11), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        style={{
          y: y3,
          position: 'absolute',
          bottom: '5%',
          left: '18%',
          width: 420,
          height: 420,
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(253,224,71,0.09), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
