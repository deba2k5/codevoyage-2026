'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Target, ShieldAlert, Zap, Cpu, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './IronManGame.module.css';

interface Props {
  themeColor?: string;
}

export default function IronManGame({ themeColor = '#f59e0b' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [dronesDestroyed, setDronesDestroyed] = useState<number>(0);

  // References for mutable game loop state
  const gameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  gameStateRef.current = gameState;
  const playerImgRef = useRef<HTMLImageElement | null>(null);

  // Movement inputs
  const keysPressedRef = useRef<{ [key: string]: boolean }>({});
  const targetYRef = useRef<number | null>(null);
  const shootCooldownRef = useRef<number>(0);

  // Load High Score & Character Sprite on Mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_ironman_highscore');
    if (saved) setHighScore(parseInt(saved, 10));

    const img = new Image();
    img.src = '/minigame/ironman.png';
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
    setDronesDestroyed(0);
    targetYRef.current = null;
    shootCooldownRef.current = 0;
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

    // Player Entity (Iron Man)
    const player = {
      x: 80,
      y: canvas.height / 2,
      radius: 24,
      speed: 6,
    };

    // Repulsor Beams (Bullets)
    interface Bullet {
      x: number;
      y: number;
      vx: number;
      width: number;
      height: number;
      color: string;
    }
    let bullets: Bullet[] = [];

    // Enemy Drones
    interface Enemy {
      x: number;
      y: number;
      radius: number;
      vx: number;
      color: string;
    }
    let enemies: Enemy[] = [];

    // Particle System (Explosions / Thrusters)
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

    const spawnExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          alpha: 1,
          color: Math.random() > 0.4 ? color : '#fbbf24',
          size: Math.random() * 4 + 2,
        });
      }
    };

    const shootRepulsor = () => {
      if (shootCooldownRef.current <= 0) {
        bullets.push({
          x: player.x + 20,
          y: player.y,
          vx: 14,
          width: 26,
          height: 6,
          color: '#38bdf8', // Arc reactor cyan
        });
        shootCooldownRef.current = 14; // Cooldown frames

        // Muzzle flash particle
        for (let i = 0; i < 4; i++) {
          particles.push({
            x: player.x + 30,
            y: player.y,
            vx: Math.random() * 3,
            vy: (Math.random() - 0.5) * 3,
            alpha: 1,
            color: '#38bdf8',
            size: 3,
          });
        }
      }
    };

    const updateLoop = () => {
      if (gameStateRef.current !== 'PLAYING') return;

      frameCount++;
      if (shootCooldownRef.current > 0) shootCooldownRef.current--;

      // 1. Handle Input (Keyboard Up/Down & Space to shoot)
      if (keysPressedRef.current['ArrowUp'] || keysPressedRef.current['KeyW']) {
        player.y -= player.speed;
        targetYRef.current = null;
      }
      if (keysPressedRef.current['ArrowDown'] || keysPressedRef.current['KeyS']) {
        player.y += player.speed;
        targetYRef.current = null;
      }
      if (keysPressedRef.current['Space']) {
        shootRepulsor();
      }

      // Smooth mouse/touch follow if active
      if (targetYRef.current !== null) {
        const dy = targetYRef.current - player.y;
        if (Math.abs(dy) > 3) {
          player.y += dy * 0.15;
        }
      }

      // Clamp vertical position
      player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

      // Thruster trail particles behind boots
      if (frameCount % 2 === 0) {
        particles.push({
          x: player.x - 20,
          y: player.y + 10,
          vx: -3 - Math.random() * 2,
          vy: (Math.random() - 0.5) * 2,
          alpha: 0.8,
          color: '#38bdf8',
          size: 3,
        });
      }

      // 2. Spawn Enemy Drones (Every ~75 frames, speeding up as score rises)
      const spawnRate = Math.max(30, 75 - Math.floor(currentScore / 100) * 5);
      if (frameCount % spawnRate === 0) {
        enemies.push({
          x: canvas.width + 30,
          y: Math.floor(Math.random() * (canvas.height - 80)) + 40,
          radius: 20,
          vx: 3.5 + Math.floor(currentScore / 80) * 0.5,
          color: '#ef4444',
        });
      }

      // 3. Update Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx;
        if (b.x > canvas.width + 50) {
          bullets.splice(i, 1);
        }
      }

      // 4. Update Enemies & Check Collisions
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.x -= enemy.vx;

        // Check collision with Player (Game Over)
        const distToPlayer = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (distToPlayer < enemy.radius + player.radius * 0.7) {
          spawnExplosion(player.x, player.y, '#ef4444');
          handleGameOver(currentScore);
          return;
        }

        // Check if Enemy breached left border (Game Over)
        if (enemy.x + enemy.radius < 0) {
          handleGameOver(currentScore);
          return;
        }

        // Check bullet hits on Enemy
        let enemyDestroyed = false;
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          const distToBullet = Math.hypot(enemy.x - b.x, enemy.y - b.y);
          if (distToBullet < enemy.radius + b.height) {
            enemyDestroyed = true;
            bullets.splice(j, 1);
            break;
          }
        }

        if (enemyDestroyed) {
          spawnExplosion(enemy.x, enemy.y, '#f59e0b');
          enemies.splice(i, 1);
          currentScore += 10;
          currentDestroyed += 1;
          setScore(currentScore);
          setDronesDestroyed(currentDestroyed);
        }
      }

      // 5. Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      // 6. Render Graphics
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Cyber Armory / Space Grid
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Moving background horizontal telemetry lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
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

      // Draw Repulsor Bullets
      bullets.forEach((b) => {
        ctx.save();
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y - b.height / 2, b.width, b.height, 4);
        ctx.fill();
        ctx.restore();
      });

      // Draw Enemy Drones (Ultron Bots)
      enemies.forEach((enemy) => {
        ctx.save();
        ctx.translate(enemy.x, enemy.y);
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;

        // Outer Hex Shield
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (a * Math.PI) / 3;
          const px = Math.cos(angle) * enemy.radius;
          const py = Math.sin(angle) * enemy.radius;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pulsing Crimson Core
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(0, 0, enemy.radius * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Draw Iron Man Sprite
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 15;

      if (playerImgRef.current && playerImgRef.current.complete && playerImgRef.current.naturalWidth !== 0) {
        const imgW = 54;
        const imgH = 54;
        ctx.drawImage(playerImgRef.current, -imgW / 2, -imgH / 2, imgW, imgH);
      } else {
        // Fallback drawing if image not ready
        ctx.fillStyle = '#f59e0b';
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
      localStorage.setItem('cv_ironman_highscore', finalScore.toString());
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientY: number;

    if ('touches' in e) {
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }

    const scaleY = canvas.height / rect.height;
    targetYRef.current = (clientY - rect.top) * scaleY;
  };

  const handlePointerDown = () => {
    if (gameState === 'PLAYING') {
      // Fire repulsor on click/touch
      const canvas = canvasRef.current;
      if (canvas) {
        // Simulate spacebar shot
        keysPressedRef.current['Space'] = true;
        setTimeout(() => {
          keysPressedRef.current['Space'] = false;
        }, 100);
      }
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  return (
    <section className={styles.gameSection}>
      <h2 className={styles.sectionTitle}>
        <Target size={28} /> Iron Man Repulsor Defense // Tactical Combat
      </h2>
      <p className={styles.subtitle}>
        Defend the Code Voyage Grid from Ultron Drones. Use Arrow Keys/Mouse to fly, Click or Spacebar to fire Repulsor Beams!
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

        {/* In-Game HUD overlay */}
        {gameState === 'PLAYING' && (
          <div className={styles.hud}>
            <div className={styles.scoreBox}>
              NEUTRALIZED: {score} PTS
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
                onTouchStart={(e) => { e.preventDefault(); keysPressedRef.current['ArrowUp'] = true; }}
                onTouchEnd={(e) => { e.preventDefault(); keysPressedRef.current['ArrowUp'] = false; }}
              >
                <ArrowUp />
              </button>
              <button 
                className={styles.controlButton}
                onTouchStart={(e) => { e.preventDefault(); keysPressedRef.current['ArrowDown'] = true; }}
                onTouchEnd={(e) => { e.preventDefault(); keysPressedRef.current['ArrowDown'] = false; }}
              >
                <ArrowDown />
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

        {/* Start / Game Over Screens */}
        <AnimatePresence>
          {gameState === 'START' && (
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.overlayBadge}>STARK TACTICAL ARSENAL</div>
              <h3 className={styles.overlayTitle}>REPULSOR COMBAT SIMULATOR</h3>
              <p className={styles.overlayDesc}>
                Rogue cyber-drones are attempting to breach our hackathon grid. Pilot your suit, fire repulsor beams, and neutralize all hostile targets before they pass!
              </p>

              <div className={styles.instructionBox}>
                <span className={styles.keyBadge}>ARROWS / MOUSE</span>
                <span className={styles.instructionText}>Move Up/Down.</span>
                <span className={styles.keyBadge}>SPACEBAR / CLICK</span>
                <span className={styles.instructionText}>Fire Repulsor Beams.</span>
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
                DEFENSE BREACHED // HOSTILE INVASION
              </div>
              <h3 className={styles.overlayTitle}>MISSION FAILED</h3>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{score}</span>
                  <span className={styles.statLabel}>COMBAT POINTS</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{dronesDestroyed}</span>
                  <span className={styles.statLabel}>DRONES NEUTRALIZED</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{highScore}</span>
                  <span className={styles.statLabel}>STARK RECORD</span>
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
