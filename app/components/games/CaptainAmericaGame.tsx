'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Shield, Target, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './CaptainAmericaGame.module.css';

interface Props {
  themeColor?: string;
}

export default function CaptainAmericaGame({ themeColor = '#3b82f6' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [targetsDestroyed, setTargetsDestroyed] = useState<number>(0);

  // References for mutable game loop state
  const gameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  gameStateRef.current = gameState;
  const playerImgRef = useRef<HTMLImageElement | null>(null);

  const keysPressedRef = useRef<{ [key: string]: boolean }>({});
  const targetXRef = useRef<number | null>(null);

  // Load High Score & Character Sprite on Mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_cap_highscore');
    if (saved) setHighScore(parseInt(saved, 10));

    const img = new Image();
    img.src = '/minigame/captainamerica.png';
    playerImgRef.current = img;
  }, []);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressedRef.current[e.code] = true;

      if (e.code === 'Space') {
        e.preventDefault();
        if (gameStateRef.current === 'START' || gameStateRef.current === 'GAMEOVER') {
          startGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressedRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setTargetsDestroyed(0);
    targetXRef.current = null;
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

    // Player Entity (Cap)
    const player = {
      x: canvas.width / 2,
      y: canvas.height - 45,
      radius: 26,
      speed: 7,
    };

    // Shield Projectile
    const shield = {
      x: player.x,
      y: player.y - 20,
      vx: 5,
      vy: -7,
      radius: 14,
      isFlying: false,
      angle: 0,
    };

    // Glitch / Hostile Targets
    interface TargetBlock {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      active: boolean;
    }
    let targets: TargetBlock[] = [];

    // Initialize Targets grid
    const initTargets = () => {
      targets = [];
      const rows = 4;
      const cols = 8;
      const blockWidth = 75;
      const blockHeight = 24;
      const paddingX = 15;
      const paddingY = 15;
      const startX = (canvas.width - (cols * (blockWidth + paddingX) - paddingX)) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          targets.push({
            x: startX + c * (blockWidth + paddingX),
            y: 40 + r * (blockHeight + paddingY),
            width: blockWidth,
            height: blockHeight,
            color: r % 2 === 0 ? '#ef4444' : '#3b82f6',
            active: true,
          });
        }
      }
    };
    initTargets();

    // Particle System
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
    let currentDestroyed = 0;
    let descentSpeed = 0.08;

    const spawnSparks = (x: number, y: number, color: string) => {
      for (let i = 0; i < 12; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 7,
          vy: (Math.random() - 0.5) * 7,
          alpha: 1,
          color,
          size: Math.random() * 4 + 2,
        });
      }
    };

    const updateLoop = () => {
      if (gameStateRef.current !== 'PLAYING') return;

      frameCount++;

      // 1. Player Movement (Left/Right)
      if (keysPressedRef.current['ArrowLeft'] || keysPressedRef.current['KeyA']) {
        player.x -= player.speed;
        targetXRef.current = null;
      }
      if (keysPressedRef.current['ArrowRight'] || keysPressedRef.current['KeyD']) {
        player.x += player.speed;
        targetXRef.current = null;
      }

      // Smooth mouse follow
      if (targetXRef.current !== null) {
        const dx = targetXRef.current - player.x;
        if (Math.abs(dx) > 3) {
          player.x += dx * 0.18;
        }
      }

      player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));

      // 2. Shield Logic
      if (!shield.isFlying) {
        shield.x = player.x;
        shield.y = player.y - 15;
        if (keysPressedRef.current['Space']) {
          shield.isFlying = true;
          shield.vx = (Math.random() > 0.5 ? 5 : -5);
          shield.vy = -7.5;
        }
      } else {
        shield.x += shield.vx;
        shield.y += shield.vy;
        shield.angle += 0.3; // Spinning shield effect

        // Wall collisions
        if (shield.x - shield.radius <= 0 || shield.x + shield.radius >= canvas.width) {
          shield.vx = -shield.vx;
          spawnSparks(shield.x, shield.y, '#ffffff');
        }
        if (shield.y - shield.radius <= 0) {
          shield.vy = -shield.vy;
          spawnSparks(shield.x, shield.y, '#ffffff');
        }

        // Catch Shield when returning to player
        if (shield.vy > 0 && shield.y + shield.radius >= player.y - player.radius) {
          const dist = Math.abs(shield.x - player.x);
          if (dist < player.radius + shield.radius + 15) {
            shield.isFlying = false;
            spawnSparks(player.x, player.y - 10, '#3b82f6');
          } else if (shield.y - shield.radius > canvas.height) {
            // Missed catch! Reset shield with a penalty or continue
            shield.isFlying = false;
          }
        }
      }

      // 3. Targets Logic
      let activeCount = 0;
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        if (!t.active) continue;
        activeCount++;

        // Slowly descend targets
        t.y += descentSpeed;

        // Check if targets reached bottom (Game Over)
        if (t.y + t.height >= player.y - 10) {
          handleGameOver(currentScore);
          return;
        }

        // Check shield collision
        if (shield.isFlying) {
          const hitX = shield.x + shield.radius > t.x && shield.x - shield.radius < t.x + t.width;
          const hitY = shield.y + shield.radius > t.y && shield.y - shield.radius < t.y + t.height;
          if (hitX && hitY) {
            t.active = false;
            shield.vy = -shield.vy; // Ricochet bounce
            spawnSparks(t.x + t.width / 2, t.y + t.height / 2, t.color);
            currentScore += 15;
            currentDestroyed += 1;
            setScore(currentScore);
            setTargetsDestroyed(currentDestroyed);
          }
        }
      }

      // If all targets cleared, respawn next wave faster!
      if (activeCount === 0) {
        descentSpeed += 0.04;
        initTargets();
      }

      // 4. Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      // 5. Render Graphics
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars / Grid background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let s = 0; s < 30; s++) {
        const sx = (s * 137) % canvas.width;
        const sy = (s * 93 + frameCount * 0.2) % canvas.height;
        ctx.fillRect(sx, sy, 2, 2);
      }

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

      // Draw Targets
      targets.forEach((t) => {
        if (!t.active) return;
        ctx.save();
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.roundRect(t.x, t.y, t.width, t.height, 6);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(t.x + 4, t.y + 4, t.width - 8, 4);
        ctx.restore();
      });

      // Draw Spinning Shield Projectile
      ctx.save();
      ctx.translate(shield.x, shield.y);
      ctx.rotate(shield.angle);
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 15;

      // Concentric Rings of Vibranium Shield
      const rings = ['#ef4444', '#ffffff', '#ef4444', '#3b82f6'];
      const radii = [shield.radius, shield.radius * 0.75, shield.radius * 0.5, shield.radius * 0.25];
      rings.forEach((col, idx) => {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(0, 0, radii[idx], 0, Math.PI * 2);
        ctx.fill();
      });
      // Center White Star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, shield.radius * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Captain America Sprite
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 15;

      if (playerImgRef.current && playerImgRef.current.complete && playerImgRef.current.naturalWidth !== 0) {
        const imgW = 54;
        const imgH = 54;
        ctx.drawImage(playerImgRef.current, -imgW / 2, -imgH / 2, imgW, imgH);
      } else {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(0, 0, player.radius, 0, Math.PI * 2);
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
      localStorage.setItem('cv_cap_highscore', finalScore.toString());
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    if ('touches' in e) clientX = e.touches[0].clientX;
    else clientX = e.clientX;

    const scaleX = canvas.width / rect.width;
    targetXRef.current = (clientX - rect.left) * scaleX;
  };

  const handlePointerDown = () => {
    if (gameState === 'PLAYING') {
      keysPressedRef.current['Space'] = true;
      setTimeout(() => { keysPressedRef.current['Space'] = false; }, 100);
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  return (
    <section className={styles.gameSection}>
      <h2 className={styles.sectionTitle}>
        <Shield size={28} /> Captain America // Vibranium Shield Ricochet
      </h2>
      <p className={styles.subtitle}>
        Defend the Grid! Use Left/Right arrows or Mouse to move. Press Spacebar or Click to launch your Vibranium Shield at descending hostiles!
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
          <div className={styles.hud}>
            <div className={styles.scoreBox}>
              TARGETS DOWN: {score} PTS
            </div>
            <div className={styles.highScoreBox}>
              RECORD: {highScore} PTS
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className={styles.mobileControls}>
            <div className={styles.dPad}>
              <button 
                className={styles.controlButton}
                onTouchStart={(e) => { e.preventDefault(); keysPressedRef.current['ArrowLeft'] = true; }}
                onTouchEnd={(e) => { e.preventDefault(); keysPressedRef.current['ArrowLeft'] = false; }}
              >
                <ArrowLeft />
              </button>
              <button 
                className={styles.controlButton}
                onTouchStart={(e) => { e.preventDefault(); keysPressedRef.current['ArrowRight'] = true; }}
                onTouchEnd={(e) => { e.preventDefault(); keysPressedRef.current['ArrowRight'] = false; }}
              >
                <ArrowRight />
              </button>
            </div>
            <button 
              className={`${styles.controlButton} ${styles.actionButton}`}
              onTouchStart={(e) => { e.preventDefault(); keysPressedRef.current['Space'] = true; setTimeout(() => keysPressedRef.current['Space'] = false, 100); }}
            >
              <Target />
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
              <div className={styles.overlayBadge}>PATRIOTIC COMBAT SIMULATOR</div>
              <h3 className={styles.overlayTitle}>VIBRANIUM RICOCHET</h3>
              <p className={styles.overlayDesc}>
                Hostile glitch targets are descending on our perimeter. Launch your shield, ricochet off barriers, and intercept every target!
              </p>

              <div className={styles.instructionBox}>
                <span className={styles.keyBadge}>ARROWS / MOUSE</span>
                <span className={styles.instructionText}>Move Left/Right.</span>
                <span className={styles.keyBadge}>SPACEBAR / CLICK</span>
                <span className={styles.instructionText}>Launch Shield.</span>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <Play size={22} fill="currentColor" /> ENGAGE DEFENSE
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
                PERIMETER BREACHED
              </div>
              <h3 className={styles.overlayTitle}>MISSION FAILED</h3>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{score}</span>
                  <span className={styles.statLabel}>COMBAT POINTS</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{targetsDestroyed}</span>
                  <span className={styles.statLabel}>TARGETS CLEARED</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{highScore}</span>
                  <span className={styles.statLabel}>PATRIOTIC RECORD</span>
                </div>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <RotateCcw size={22} /> RE-DEPLOY OPERATIVE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
