'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './HomeHero.module.css';

export const HomeHero: React.FC = () => {
  const videoGridRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    // Parallax effect en desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !videoGridRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      mousePosition.current = { x: xPercent, y: yPercent };
    };

    // Animación suave con requestAnimationFrame
    let animationFrameId: number;
    
    const animate = () => {
      if (window.innerWidth < 768 || !videoGridRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const blocks = videoGridRef.current.querySelectorAll('[data-parallax]');
      const speeds = [6, 4, 5, 3, 5, 4];
      const smoothness = 0.1; // Factor de suavidad (0-1)
      
      blocks.forEach((block, index) => {
        const element = block as HTMLElement;
        const speed = speeds[index];
        
        const targetX = mousePosition.current.x * speed;
        const targetY = mousePosition.current.y * speed;
        
        // Interpolación suave
        currentPosition.current[index].x += (targetX - currentPosition.current[index].x) * smoothness;
        currentPosition.current[index].y += (targetY - currentPosition.current[index].y) * smoothness;
        
        element.style.transform = `translate(${currentPosition.current[index].x}px, ${currentPosition.current[index].y}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Fondo oscuro base */}
      <div className={styles.background} />

      {/* Composición de videos tipo collage */}
      <div className={styles.videoGrid} ref={videoGridRef}>
        {/* Video grande principal */}
        <div className={styles.videoBlock1} data-parallax>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video load error (block1):', e)}
          >
            <source src="/videos/SUR_1.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <span className={styles.label}>EXPERIENCIAS</span>
        </div>

        {/* Video vertical */}
        <div className={styles.videoBlock2} data-parallax>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video load error (block2):', e)}
          >
            <source src="/videos/crunch-fantasia1.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <span className={styles.label}>IA</span>
        </div>

        {/* Video horizontal mediano */}
        <div className={styles.videoBlock3} data-parallax>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video load error (block3):', e)}
          >
            <source src="/videos/frizze-pasion.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <span className={styles.label}>VIDEO</span>
        </div>

        {/* Video pequeño acento */}
        <div className={styles.videoBlock4} data-parallax>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video load error (block4):', e)}
          >
            <source src="/videos/SUR_1.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <span className={styles.label}>NARRATIVA</span>
        </div>

        {/* Video cuadrado superior derecha */}
        <div className={styles.videoBlock5} data-parallax>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video load error (block5):', e)}
          >
            <source src="/videos/crunch-fantasia1.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <span className={styles.label}>CONCEPTO</span>
        </div>

        {/* Video horizontal pequeño derecha */}
        <div className={styles.videoBlock6} data-parallax>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => console.error('Video load error (block6):', e)}
          >
            <source src="/videos/frizze-pasion.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay} />
          <span className={styles.label}>FORMATO</span>
        </div>
      </div>

      {/* Claim integrado */}
      <div className={styles.claimContainer}>
        <h1 className={styles.claim}>
          Convertimos ideas en
          <br />
          <span className={styles.highlight}>universos coexistentes</span>
        </h1>
        <Link href="/trabajos" className={styles.link}>
          Ver trabajos →
        </Link>
      </div>
    </section>
  );
};
