'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Zap, ShieldAlert, Target } from 'lucide-react';
import styles from './SpiderManGame.module.css';

interface Props {
  themeColor?: string;
}

export default function SpiderManGame({ themeColor = '#ef4444' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [obstaclesCleared, setObstaclesCleared] = useState<number>(0);

  // References for mutable game loop state to prevent closure stale state in requestAnimationFrame
  const isSwingingRef = useRef<boolean>(false);
  const gameStateRef = useRef<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  gameStateRef.current = gameState;
  const playerImgRef = useRef<HTMLImageElement | null>(null);

  // Load High Score & Character Sprite on Mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_spiderman_highscore');
    if (saved) setHighScore(parseInt(saved, 10));

    const img = new Image();
    img.src = '/minigame/spiderman.png';
    playerImgRef.current = img;
  }, []);

  // Keyboard Event Listeners (Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameStateRef.current === 'START' || gameStateRef.current === 'GAMEOVER') {
          startGame();
        } else if (gameStateRef.current === 'PLAYING') {
          isSwingingRef.current = true;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isSwingingRef.current = false;
      }
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
    setObstaclesCleared(0);
    isSwingingRef.current = false;
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

    // Game Entities
    const player = {
      x: 150,
      y: 225,
      radius: 16,
      vy: 0,
      gravity: 0.35,
      swingForce: -0.65,
      maxSpeed: 7,
    };

    // Obstacles array (Laser gates / Cyber Drones)
    interface Obstacle {
      x: number;
      width: number;
      topHeight: number;
      bottomHeight: number;
      gap: number;
      passed: boolean;
      color: string;
    }
    let obstacles: Obstacle[] = [];
    let frameCount = 0;
    let currentScore = 0;
    let currentCleared = 0;

    // Particle system for web sparks
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }
    let particles: Particle[] = [];

    const spawnParticle = (x: number, y: number, color: string) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          alpha: 1,
          color,
        });
      }
    };

    const updateLoop = () => {
      if (gameStateRef.current !== 'PLAYING') return;

      frameCount++;

      // 1. Update Player Physics
      if (isSwingingRef.current) {
        player.vy += player.swingForce;
        if (frameCount % 3 === 0) {
          spawnParticle(player.x, player.y, '#3b82f6'); // Blue web trail
        }
      } else {
        player.vy += player.gravity;
      }

      // Clamp velocity
      player.vy = Math.max(-player.maxSpeed, Math.min(player.maxSpeed, player.vy));
      player.y += player.vy;

      // Ceiling & Floor Collision
      if (player.y - player.radius <= 0 || player.y + player.radius >= canvas.height) {
        handleGameOver(currentScore);
        return;
      }

      // 2. Spawn Obstacles (every 110 frames)
      if (frameCount % 110 === 0) {
        const gap = 140; // Responsive obstacle gap
        const minHeight = 50;
        const maxHeight = canvas.height - gap - minHeight;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        const bottomHeight = canvas.height - topHeight - gap;

        obstacles.push({
          x: canvas.width,
          width: 50,
          topHeight,
          bottomHeight,
          gap,
          passed: false,
          color: frameCount % 220 === 0 ? '#ef4444' : '#f59e0b',
        });
      }

      // 3. Update Obstacles & Check Collisions
      const speed = 4 + Math.floor(currentScore / 50) * 0.5; // Gradually increase difficulty

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= speed;

        // Score increment when Spider-Man clears the obstacle
        if (!obs.passed && obs.x + obs.width < player.x) {
          obs.passed = true;
          currentScore += 10;
          currentCleared += 1;
          setScore(currentScore);
          setObstaclesCleared(currentCleared);
          spawnParticle(player.x, player.y, '#22c55e'); // Green success spark
        }

        // Remove off-screen obstacles
        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
          continue;
        }

        // Box Collision Detection
        const hitX = player.x + player.radius > obs.x && player.x - player.radius < obs.x + obs.width;
        const hitTopY = player.y - player.radius < obs.topHeight;
        const hitBottomY = player.y + player.radius > canvas.height - obs.bottomHeight;

        if (hitX && (hitTopY || hitBottomY)) {
          spawnParticle(player.x, player.y, '#ef4444');
          handleGameOver(currentScore);
          return;
        }
      }

      // 4. Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      // 5. Render Graphics
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Cyber Skyline
      ctx.fillStyle = '#0f1423';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Tech grid lines in background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Web Line when swinging
      if (isSwingingRef.current) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x + 80, 0); // Anchor point ceiling ahead
        ctx.stroke();

        // Web glow
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x + 80, 0);
        ctx.stroke();
      }

      // Draw Obstacles (High Voltage Laser Pillars)
      obstacles.forEach((obs) => {
        // Top Pillar
        const gradientTop = ctx.createLinearGradient(obs.x, 0, obs.x + obs.width, 0);
        gradientTop.addColorStop(0, '#1e293b');
        gradientTop.addColorStop(0.5, obs.color);
        gradientTop.addColorStop(1, '#1e293b');

        ctx.fillStyle = gradientTop;
        ctx.fillRect(obs.x, 0, obs.width, obs.topHeight);

        // Laser emitter glow tip
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x - 2, obs.topHeight - 6, obs.width + 4, 6);

        // Bottom Pillar
        const gradientBottom = ctx.createLinearGradient(obs.x, canvas.height - obs.bottomHeight, obs.x + obs.width, canvas.height - obs.bottomHeight);
        gradientBottom.addColorStop(0, '#1e293b');
        gradientBottom.addColorStop(0.5, obs.color);
        gradientBottom.addColorStop(1, '#1e293b');

        ctx.fillStyle = gradientBottom;
        ctx.fillRect(obs.x, canvas.height - obs.bottomHeight, obs.width, obs.bottomHeight);

        // Bottom laser tip
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x - 2, canvas.height - obs.bottomHeight, obs.width + 4, 6);
      });

      // Draw Particles
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Spider-Man Character Sprite
      ctx.save();
      ctx.translate(player.x, player.y);
      // Dynamic tilt based on vertical velocity for a realistic web-slinging feel
      const angle = Math.min(Math.max(player.vy * 0.05, -0.4), 0.4);
      ctx.rotate(angle);

      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 12;

      if (playerImgRef.current && playerImgRef.current.complete && playerImgRef.current.naturalWidth !== 0) {
        const imgW = 48;
        const imgH = 48;
        ctx.drawImage(playerImgRef.current, -imgW / 2, -imgH / 2, imgW, imgH);
      } else {
        // Fallback circle if image is still loading
        ctx.fillStyle = '#ef4444';
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
      localStorage.setItem('cv_spiderman_highscore', finalScore.toString());
    }
  };

  const handlePointerDown = () => {
    if (gameState === 'PLAYING') {
      isSwingingRef.current = true;
    } else if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
    }
  };

  const handlePointerUp = () => {
    if (gameState === 'PLAYING') {
      isSwingingRef.current = false;
    }
  };

  return (
    <section className={styles.gameSection}>
      <h2 className={styles.sectionTitle}>
        <Target size={28} /> Spider-Man Web-Slinger // Tactical Training
      </h2>
      <p className={styles.subtitle}>
        Navigate the Code Voyage Grid skyline. Hold Spacebar or click/touch & hold to shoot your web and swing upwards!
      </p>

      <div 
        className={styles.gameWrapper}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={450} 
          className={styles.canvas} 
        />

        {/* In-Game HUD overlay */}
        {gameState === 'PLAYING' && (
          <>
            <div className={styles.hud}>
              <div className={styles.scoreBox}>
                DISTANCE: {score} M
              </div>
              <div className={styles.highScoreBox}>
                BEST: {highScore} M
              </div>
            </div>
            <div className={styles.mobileHint}>
              TAP & HOLD TO SWING
            </div>
          </>
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
              <div className={styles.overlayBadge}>TACTICAL MISSION BRIEFING</div>
              <h3 className={styles.overlayTitle}>WEB-SLINGER SIMULATOR</h3>
              <p className={styles.overlayDesc}>
                Test your reflexes in our cyberpunk training simulation. Shoot web lines to swing above laser pillars and cyber-drones!
              </p>

              <div className={styles.instructionBox}>
                <span className={styles.keyBadge}>SPACEBAR / TOUCH</span>
                <span className={styles.instructionText}>HOLD to Shoot Web & Swing UP. RELEASE to Glide DOWN.</span>
              </div>

              <button className={styles.playButton} onClick={startGame}>
                <Play size={22} fill="currentColor" /> LAUNCH SIMULATION
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
                MISSION FAILED // COLLISION
              </div>
              <h3 className={styles.overlayTitle}>SIMULATION ENDED</h3>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{score} M</span>
                  <span className={styles.statLabel}>DISTANCE CLOCKED</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{obstaclesCleared}</span>
                  <span className={styles.statLabel}>DRONES CLEARED</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{highScore} M</span>
                  <span className={styles.statLabel}>PERSONAL BEST</span>
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
