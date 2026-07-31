'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap, Target, Award } from 'lucide-react';
import styles from './ThorGame.module.css';

interface Props {
  themeColor?: string;
}

export default function ThorGame({ themeColor = '#a855f7' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [demonsZapped, setDemonsZapped] = useState<number>(0);

  const gameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  gameStateRef.current = gameState;
  const playerImgRef = useRef<HTMLImageElement | null>(null);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 400, y: 225 });
  const zapTriggerRef = useRef<boolean>(false);

  // Load High Score & Character Sprite on Mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_thor_highscore');
    if (saved) setHighScore(parseInt(saved, 10));

    const img = new Image();
    img.src = '/minigame/thor.png';
    playerImgRef.current = img;
  }, []);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameStateRef.current === 'START' || gameStateRef.current === 'GAMEOVER') {
          startGame();
        } else if (gameStateRef.current === 'PLAYING') {
          zapTriggerRef.current = true;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startGame = () => {
    setScore(0);
    setDemonsZapped(0);
    zapTriggerRef.current = false;
    setGameState('PLAYING');
  };

  // Main Canvas Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const thor = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 28,
    };

    interface Enemy {
      x: number;
      y: number;
      radius: number;
      speed: number;
      color: string;
    }
    let enemies: Enemy[] = [];

    interface LightningBolt {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      alpha: number;
    }
    let bolts: LightningBolt[] = [];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }
    let particles: Particle[] = [];

    let frameCount = 0;
    let currentScore = 0;
    let currentZapped = 0;

    const spawnSparks = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          alpha: 1,
          color,
          size: Math.random() * 4 + 2,
        });
      }
    };

    const drawJaggedLine = (x1: number, y1: number, x2: number, y2: number, color: string, width: number) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(x1, y1);

      const dist = Math.hypot(x2 - x1, y2 - y1);
      const steps = Math.max(3, Math.floor(dist / 30));
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const lx = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 30;
        const ly = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 30;
        ctx.lineTo(lx, ly);
      }
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const unleashThunder = (targetX: number, targetY: number) => {
      // Add lightning visual
      bolts.push({
        x1: thor.x,
        y1: thor.y,
        x2: targetX,
        y2: targetY,
        alpha: 1,
      });

      spawnSparks(thor.x, thor.y, '#facc15');

      // Check hits along line or near target
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        // Distance to target point
        const distToTarget = Math.hypot(e.x - targetX, e.y - targetY);
        if (distToTarget < e.radius + 45) {
          spawnSparks(e.x, e.y, '#a855f7');
          enemies.splice(i, 1);
          currentScore += 20;
          currentZapped += 1;
          setScore(currentScore);
          setDemonsZapped(currentZapped);
        }
      }
    };

    const updateLoop = () => {
      if (gameStateRef.current !== 'PLAYING') return;

      frameCount++;

      // 1. Handle Thunder Zap Trigger
      if (zapTriggerRef.current) {
        unleashThunder(mousePosRef.current.x, mousePosRef.current.y);
        zapTriggerRef.current = false;
      }

      // 2. Spawn Enemies from edges (Every ~55 frames)
      const spawnRate = Math.max(25, 65 - Math.floor(currentScore / 100) * 5);
      if (frameCount % spawnRate === 0) {
        const side = Math.floor(Math.random() * 4);
        let ex = 0;
        let ey = 0;
        if (side === 0) { ex = Math.random() * canvas.width; ey = -20; }
        else if (side === 1) { ex = canvas.width + 20; ey = Math.random() * canvas.height; }
        else if (side === 2) { ex = Math.random() * canvas.width; ey = canvas.height + 20; }
        else { ex = -20; ey = Math.random() * canvas.height; }

        enemies.push({
          x: ex,
          y: ey,
          radius: 20,
          speed: 1.5 + Math.random() * 1.5 + Math.floor(currentScore / 150) * 0.5,
          color: frameCount % 2 === 0 ? '#ef4444' : '#a855f7',
        });
      }

      // 3. Update Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        const angle = Math.atan2(thor.y - e.y, thor.x - e.x);
        e.x += Math.cos(angle) * e.speed;
        e.y += Math.sin(angle) * e.speed;

        // Check collision with Thor
        const distToThor = Math.hypot(e.x - thor.x, e.y - thor.y);
        if (distToThor < thor.radius + e.radius * 0.7) {
          spawnSparks(thor.x, thor.y, '#ef4444');
          handleGameOver(currentScore);
          return;
        }
      }

      // 4. Update Bolts & Particles
      for (let i = bolts.length - 1; i >= 0; i--) {
        bolts[i].alpha -= 0.1;
        if (bolts[i].alpha <= 0) bolts.splice(i, 1);
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].alpha -= 0.035;
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }

      // 5. Render Graphics
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Asgardian Thunder Background
      ctx.fillStyle = '#0b0c16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radar circles around Thor
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 1;
      [100, 200, 300].forEach((r) => {
        ctx.beginPath();
        ctx.arc(thor.x, thor.y, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw Particles
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Enemies (Dark Elf Drones)
      enemies.forEach((e) => {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = e.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pulsing core
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(0, 0, e.radius * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Lightning Bolts
      bolts.forEach((b) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, b.alpha);
        drawJaggedLine(b.x1, b.y1, b.x2, b.y2, '#facc15', 3);
        drawJaggedLine(b.x1, b.y1, b.x2, b.y2, '#ffffff', 1.5);
        ctx.restore();
      });

      // Draw Thor Sprite
      ctx.save();
      ctx.translate(thor.x, thor.y);
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 18;

      if (playerImgRef.current && playerImgRef.current.complete && playerImgRef.current.naturalWidth !== 0) {
        const imgW = 56;
        const imgH = 56;
        ctx.drawImage(playerImgRef.current, -imgW / 2, -imgH / 2, imgW, imgH);
      } else {
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(0, 0, thor.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, themeColor]);

  const handleGameOver = (finalScore: number) => {
    setGameState('GAMEOVER');
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('cv_thor_highscore', finalScore.toString());
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mousePosRef.current = {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = () => {
    if (gameState === 'PLAYING') {
      zapTriggerRef.current = true;
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  return (
    <section className={styles.gameSection}>
      <h2 className={styles.sectionTitle}>
        <Zap size={28} /> Thor // Mjolnir Lightning Storm
      </h2>
      <p className={styles.subtitle}>
        Hostile demons are encroaching on Asgard! Aim with mouse/touch and Click or press Spacebar to summon chain-lightning!
      </p>

      <div 
        className={styles.gameWrapper}
        onMouseMove={handlePointerMove}
        onMouseDown={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchStart={handlePointerDown}
      >
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={450} 
          className={styles.canvas} 
        />

        {gameState === 'PLAYING' && (
          <>
            <div className={styles.hud}>
              <div className={styles.scoreBox}>
                DEMONS ZAPPED: {score} PTS
              </div>
              <div className={styles.highScoreBox}>
                RECORD: {highScore} PTS
              </div>
            </div>
            <div className={styles.mobileHint}>
              TAP TO ZAP DEMONS
            </div>
          </>
        )}

        <AnimatePresence>
          {gameState === 'START' && (
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.overlayBadge}>ASGARDIAN THUNDER ARSENAL</div>
              <h3 className={styles.overlayTitle}>LIGHTNING STORM</h3>
              <p className={styles.overlayDesc}>
                Cyber-demons are swarming from all directions. Command the storm, summon Mjolnir lightning strikes, and zap every invader!
              </p>

              <div className={styles.instructionBox}>
                <span className={styles.keyBadge}>AIM MOUSE / TOUCH</span>
                <span className={styles.instructionText}>Target Enemies.</span>
                <span className={styles.keyBadge}>SPACEBAR / CLICK</span>
                <span className={styles.instructionText}>Unleash Lightning Bolt.</span>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <Play size={22} fill="currentColor" /> SUMMON THUNDER
              </button>
            </motion.div>
          )}

          {gameState === 'GAMEOVER' && (
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.overlayBadge} style={{ color: '#ef4444', borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                STORM OVERRUN // INVADED
              </div>
              <h3 className={styles.overlayTitle}>MISSION FAILED</h3>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{score}</span>
                  <span className={styles.statLabel}>THUNDER POINTS</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{demonsZapped}</span>
                  <span className={styles.statLabel}>DEMONS ZAPPED</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{highScore}</span>
                  <span className={styles.statLabel}>ASGARDIAN RECORD</span>
                </div>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <RotateCcw size={22} /> RECHARGE & DEPLOY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
