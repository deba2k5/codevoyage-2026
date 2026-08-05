'use client';

import { useEffect, useRef, useState } from 'react';

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFading(true);
    setTimeout(() => setVisible(false), 500);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = 'hidden';
    const fallback = setTimeout(finish, 12000);

    return () => {
      clearTimeout(fallback);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = '';
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`introLoader ${fading ? 'fadeOut' : ''}`}>
      <video
        ref={videoRef}
        className="introVideo"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        onError={finish}
      >
        <source src="/intro-loader-desktop.mp4" media="(min-width: 769px)" />
        <source src="/intro-loader-mobile.mp4" media="(max-width: 768px)" />
      </video>

      <style jsx>{`
        .introLoader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        .introLoader.fadeOut {
          opacity: 0;
          pointer-events: none;
        }

        .introVideo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
