'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap, Target, Hammer, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './HulkGame.module.css';

interface Props {
  themeColor?: string;
}

export default function HulkGame({ themeColor = '#22c55e' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [tanksSmashed, setTanksSmashed] = useState<number>(0);

  const gameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  gameStateRef.current = gameState;
  const playerImgRef = useRef<HTMLImageElement | null>(null);

  const jumpTriggerRef = useRef<boolean>(false);
  const smashTriggerRef = useRef<boolean>(false);

  // Load High Score & Character Sprite on Mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_hulk_highscore');
    if (saved) setHighScore(parseInt(saved, 10));

    const img = new Image();
    img.src = '/minigame/hulk.png';
    playerImgRef.current = img;
  }, []);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        if (gameStateRef.current === 'START' || gameStateRef.current === 'GAMEOVER') {
          startGame();
        } else if (gameStateRef.current === 'PLAYING') {
          jumpTriggerRef.current = true;
        }
      }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        if (gameStateRef.current === 'PLAYING') {
          smashTriggerRef.current = true;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startGame = () => {
    setScore(0);
    setTanksSmashed(0);
    jumpTriggerRef.current = false;
    smashTriggerRef.current = false;
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
    const groundY = canvas.height - 65;

    const hulk = {
      x: 120,
      y: groundY,
      radius: 28,
      vy: 0,
      gravity: 0.7,
      jumpForce: -14,
      isGrounded: true,
      isSmashing: false,
    };

    interface Obstacle {
      x: number;
      y: number;
      width: number;
      height: number;
      type: 'TANK' | 'LASER';
      color: string;
      passed: boolean;
    }
    let obstacles: Obstacle[] = [];

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    let shockwaves: Shockwave[] = [];

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
    let currentSmashed = 0;

    const spawnDebris = (x: number, y: number, color: string) => {
      for (let i = 0; i < 18; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 10,
          vy: -Math.random() * 8 - 2,
          alpha: 1,
          color,
          size: Math.random() * 5 + 3,
        });
      }
    };

    const triggerGammaSmash = () => {
      shockwaves.push({
        x: hulk.x,
        y: groundY + 15,
        radius: 10,
        maxRadius: 280,
        alpha: 1,
      });
      spawnDebris(hulk.x, groundY, '#22c55e');

      // Check Tanks in shockwave range
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        if (obs.type === 'TANK' && obs.x < hulk.x + 260 && obs.x + obs.width > hulk.x - 50) {
          spawnDebris(obs.x + obs.width / 2, obs.y + obs.height / 2, '#4ade80');
          obstacles.splice(i, 1);
          currentScore += 25;
          currentSmashed += 1;
          setScore(currentScore);
          setTanksSmashed(currentSmashed);
        }
      }
    };

    const updateLoop = () => {
      if (gameStateRef.current !== 'PLAYING') return;

      frameCount++;

      // 1. Hulk Jump Logic
      if (jumpTriggerRef.current && hulk.isGrounded) {
        hulk.vy = hulk.jumpForce;
        hulk.isGrounded = false;
        jumpTriggerRef.current = false;
        spawnDebris(hulk.x, groundY + 10, '#15803d');
      } else {
        jumpTriggerRef.current = false;
      }

      // 2. Hulk Smash Logic
      if (smashTriggerRef.current && !hulk.isGrounded && !hulk.isSmashing) {
        hulk.isSmashing = true;
        hulk.vy = 20; // High speed downward slam
        smashTriggerRef.current = false;
      } else {
        smashTriggerRef.current = false;
      }

      // Physics
      hulk.vy += hulk.gravity;
      hulk.y += hulk.vy;

      if (hulk.y >= groundY) {
        hulk.y = groundY;
        hulk.vy = 0;
        hulk.isGrounded = true;

        if (hulk.isSmashing) {
          hulk.isSmashing = false;
          triggerGammaSmash();
        }
      }

      // 3. Spawn Obstacles (Tanks & High Laser Barriers)
      const spawnRate = Math.max(50, 95 - Math.floor(currentScore / 100) * 5);
      if (frameCount % spawnRate === 0) {
        const isLaser = Math.random() > 0.6;
        if (isLaser) {
          obstacles.push({
            x: canvas.width + 40,
            y: groundY - 55,
            width: 25,
            height: 70,
            type: 'LASER',
            color: '#ef4444',
            passed: false,
          });
        } else {
          obstacles.push({
            x: canvas.width + 40,
            y: groundY - 20,
            width: 55,
            height: 35,
            type: 'TANK',
            color: '#475569',
            passed: false,
          });
        }
      }

      // 4. Update Obstacles & Check Collisions
      const speed = 6 + Math.floor(currentScore / 80) * 0.5;
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= speed;

        if (!obs.passed && obs.x + obs.width < hulk.x) {
          obs.passed = true;
          currentScore += 10;
          setScore(currentScore);
        }

        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
          continue;
        }

        // Box collision with Hulk circle
        const hitX = hulk.x + hulk.radius * 0.7 > obs.x && hulk.x - hulk.radius * 0.7 < obs.x + obs.width;
        const hitY = hulk.y + hulk.radius * 0.7 > obs.y && hulk.y - hulk.radius * 0.7 < obs.y + obs.height;

        if (hitX && hitY) {
          if (obs.type === 'TANK' && hulk.isSmashing) {
            // Smashed on direct slam!
            spawnDebris(obs.x + obs.width / 2, obs.y + obs.height / 2, '#4ade80');
            obstacles.splice(i, 1);
            currentScore += 25;
            currentSmashed += 1;
            setScore(currentScore);
            setTanksSmashed(currentSmashed);
          } else {
            spawnDebris(hulk.x, hulk.y, '#ef4444');
            handleGameOver(currentScore);
            return;
          }
        }
      }

      // 5. Update Shockwaves & Particles
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].radius += 14;
        shockwaves[i].alpha -= 0.05;
        if (shockwaves[i].alpha <= 0 || shockwaves[i].radius >= shockwaves[i].maxRadius) {
          shockwaves.splice(i, 1);
        }
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].vy += 0.4; // Gravity on debris
        particles[i].alpha -= 0.035;
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }

      // 6. Render Graphics
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Cyber Ground / Asphalt
      ctx.fillStyle = '#0a100d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground Line
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 15);
      ctx.lineTo(canvas.width, groundY + 15);
      ctx.stroke();

      // Ground hatchings moving left
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 40) {
        const offset = (x - (frameCount * speed) % 40 + canvas.width) % canvas.width;
        ctx.beginPath();
        ctx.moveTo(offset, groundY + 15);
        ctx.lineTo(offset - 15, groundY + 35);
        ctx.stroke();
      }

      // Draw Shockwaves
      shockwaves.forEach((sw) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, Math.PI, 0, false);
        ctx.stroke();
        ctx.restore();
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

      // Draw Obstacles
      obstacles.forEach((obs) => {
        ctx.save();
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = 12;

        if (obs.type === 'LASER') {
          // High Voltage Barrier
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(obs.x + 6, obs.y, obs.width - 12, obs.height);
        } else {
          // Cyber Tank
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
          ctx.fill();
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(obs.x + 10, obs.y + 8, obs.width - 20, 6);
        }
        ctx.restore();
      });

      // Draw Hulk Sprite
      ctx.save();
      ctx.translate(hulk.x, hulk.y);
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 18;

      if (playerImgRef.current && playerImgRef.current.complete && playerImgRef.current.naturalWidth !== 0) {
        const imgW = 60;
        const imgH = 60;
        ctx.drawImage(playerImgRef.current, -imgW / 2, -imgH / 2, imgW, imgH);
      } else {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(0, 0, hulk.radius, 0, Math.PI * 2);
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
      localStorage.setItem('cv_hulk_highscore', finalScore.toString());
    }
  };

  const handlePointerDown = () => {
    if (gameState === 'PLAYING') {
      if (jumpTriggerRef.current) {
        // Second tap while jumping triggers Gamma Smash!
        smashTriggerRef.current = true;
      } else {
        jumpTriggerRef.current = true;
      }
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  return (
    <section className={styles.gameSection}>
      <h2 className={styles.sectionTitle}>
        <Hammer size={28} /> Hulk // Gamma Smash Rampage
      </h2>
      <p className={styles.subtitle}>
        Smash your way through Cyber Tanks! Tap/Click or Up Arrow to Jump. While mid-air, Tap again or Down Arrow to execute a Gamma Ground Pound!
      </p>

      <div 
        className={styles.gameWrapper}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={450} 
          className={styles.canvas} 
        />

        {gameState === 'PLAYING' && (
          <div className={styles.hud}>
            <div className={styles.scoreBox}>
              SMASH SCORE: {score} PTS
            </div>
            <div className={styles.highScoreBox}>
              RECORD: {highScore} PTS
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className={styles.mobileControls}>
            <button 
              className={styles.actionButton}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); jumpTriggerRef.current = true; }}
            >
              <ArrowUp size={24} />
              JUMP
            </button>
            <button 
              className={styles.actionButton}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); smashTriggerRef.current = true; }}
            >
              <ArrowDown size={24} />
              SMASH
            </button>
          </div>
        )}

        <AnimatePresence>
          {gameState === 'START' && (
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.overlayBadge}>GAMMA TACTICAL RAMPAGE</div>
              <h3 className={styles.overlayTitle}>SMASH RAMPAGE</h3>
              <p className={styles.overlayDesc}>
                Heavy Cyber Tanks and Laser Walls are barricading our hackathon perimeter. Jump over barriers and unleash Gamma Ground Pounds to crush incoming tanks into rubble!
              </p>

              <div className={styles.instructionBox}>
                <span className={styles.keyBadge}>UP / TAP</span>
                <span className={styles.instructionText}>Super Jump.</span>
                <span className={styles.keyBadge}>DOWN / 2ND TAP</span>
                <span className={styles.instructionText}>Gamma Smash (Ground Pound).</span>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <Play size={22} fill="currentColor" /> UNLEASH SMASH
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
                RAMPAGE STOPPED // BARRIER HIT
              </div>
              <h3 className={styles.overlayTitle}>MISSION ENDED</h3>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{score}</span>
                  <span className={styles.statLabel}>GAMMA POINTS</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{tanksSmashed}</span>
                  <span className={styles.statLabel}>TANKS SMASHED</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{highScore}</span>
                  <span className={styles.statLabel}>HULK RECORD</span>
                </div>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <RotateCcw size={22} /> RECHARGE & RAMPAGE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
