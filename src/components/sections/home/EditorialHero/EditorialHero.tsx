'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Hls from 'hls.js';
import styles from './EditorialHero.module.css';

export const EditorialHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const claimLine1Ref = useRef<HTMLSpanElement>(null);
  const claimLine2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const [isReady, setIsReady] = useState(false);

  // 🔥 Initialize HLS video streaming
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = 'https://stream.mux.com/RVyz28xBS5gnLeSh5D3pKxeBHQyShrRI7WlNfymz3P4.m3u8';

    // Check if HLS is natively supported (Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      
      const onLoadedMetadata = () => {
        video.currentTime = 0.1; // Sync with poster frame
        
        // 🔥 START PLAY IMMEDIATELY (video is hidden by opacity: 0)
        video.play().catch(() => {
          console.log('Autoplay prevented by browser');
        });

        // Start checking for quality readiness
        const checkReady = () => {
          if (video.readyState >= 3) {
            setIsReady(true);
          } else {
            requestAnimationFrame(checkReady);
          }
        };

        checkReady();
      };

      video.addEventListener('loadedmetadata', onLoadedMetadata);

      return () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    }
    // Use hls.js for browsers that don't support HLS natively
    else if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: 2, // Start at medium quality (avoid ultra-low quality)
        maxBufferLength: 30,
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = 0.1; // Sync with poster frame

        video.play().catch(() => {
          console.log('Autoplay prevented by browser');
        });

        const checkReady = () => {
          if (video.readyState >= 3) {
            setIsReady(true);
          } else {
            requestAnimationFrame(checkReady);
          }
        };

        checkReady();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS fatal error:', data);
        }
      });

      return () => {
        hls.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Importar ScrollTrigger dinámicamente solo en el cliente
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const hero = heroRef.current;
      const video = videoRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const label = labelRef.current;
      const claimLine1 = claimLine1Ref.current;
      const claimLine2 = claimLine2Ref.current;
      const description = descriptionRef.current;
      const cta = ctaRef.current;

      if (!hero || !video || !overlay || !content || !label || !claimLine1 || !claimLine2 || !description || !cta) return;

      // Timeline de entrada
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Video
      tl.fromTo(
        video,
        {
          opacity: 0,
          scale: 1.05,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
        }
      );

      // 2. Label
      tl.fromTo(
        label,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.8'
      );

      // 3. Primera línea del claim
      tl.fromTo(
        claimLine1,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        '-=0.6'
      );

      // 4. Segunda línea del claim
      tl.fromTo(
        claimLine2,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        '-=0.7'
      );

      // 5. Descripción
      tl.fromTo(
        description,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
        },
        '-=0.5'
      );

      // 6. CTA
      tl.fromTo(
        cta,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
        },
        '-=0.5'
      );

      // ScrollTrigger para el Hero
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Video scale sutil
          gsap.to(video, {
            scale: 1 + progress * 0.08,
            duration: 0.1,
          });

          // Overlay oscurecimiento
          gsap.to(overlay, {
            opacity: 1 + progress * 0.15,
            duration: 0.1,
          });

          // Contenido fade out
          gsap.to(content, {
            opacity: 1 - progress * 0.7,
            duration: 0.1,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Video fullscreen */}
      <video
        ref={videoRef}
        className={`${styles.video} ${isReady ? styles.ready : ''}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://image.mux.com/RVyz28xBS5gnLeSh5D3pKxeBHQyShrRI7WlNfymz3P4/thumbnail.jpg?time=0.1&width=1920"
        onError={(e) => console.error('EditorialHero video load error:', e)}
      />

      {/* Overlay gradiente */}
      <div ref={overlayRef} className={styles.overlay} />

      {/* Contenido */}
      <div ref={contentRef} className={styles.content}>
        <span ref={labelRef} className={styles.label}>
          CREATIVE STUDIO
        </span>

        <h1 className={styles.claim}>
          <span ref={claimLine1Ref} className={styles.claimLine}>
            We turn ideas into
          </span>
          <br />
          <span ref={claimLine2Ref} className={`${styles.claimLine} ${styles.claimHighlight}`}>
            coexisting universes
          </span>
        </h1>

        <p ref={descriptionRef} className={styles.description}>
          DOBLEPAR is a creative and audiovisual studio that turns brand chaos into curated visual universes — combining branding, technology, and communication through storytelling, AI, and live-act.
        </p>

        <a ref={ctaRef} href="#manifesto" className={styles.cta}>
          <span>Explore</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3L8 13M8 13L13 8M8 13L3 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};
