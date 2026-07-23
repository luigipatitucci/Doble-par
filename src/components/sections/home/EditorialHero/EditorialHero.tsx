'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={(e) => console.error('EditorialHero video load error:', e)}
      >
        <source src="/videos/SUR_1.mp4" type="video/mp4" />
      </video>

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
          DOBLEPAR is a creative and audiovisual studio building distinctive visual universes through storytelling, creative direction, AI, and live-action production—across both physical and digital experiences.
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
