'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './HomeContact.module.css';

export const HomeContact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleLine3Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const label = labelRef.current;
      const titleLine1 = titleLine1Ref.current;
      const titleLine2 = titleLine2Ref.current;
      const titleLine3 = titleLine3Ref.current;
      const cta = ctaRef.current;

      if (!section || !label || !titleLine1 || !titleLine2 || !titleLine3 || !cta) return;

      const ctx = gsap.context(() => {
        // Verificar si el usuario prefiere reducir movimiento
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
          // Mostrar todo directamente sin animación
          gsap.set([label, titleLine1, titleLine2, titleLine3, cta], {
            opacity: 1,
            y: 0
          });
          return;
        }

        // Timeline de entrada
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            toggleActions: 'play none none none',
          }
        });

        // 1. Label aparece
        tl.fromTo(
          label,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );

        // 2. Primera línea del título
        tl.fromTo(
          titleLine1,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );

        // 3. Segunda línea del título
        tl.fromTo(
          titleLine2,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
        tl.fromTo(
          titleLine3,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

        // 4. CTA aparece
        tl.fromTo(
          cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        );
      }, section);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.homeContact}>
      {/* Elemento gráfico de fondo opcional */}
      <div className={styles.backgroundShape} aria-hidden="true" />

      <div className={styles.container}>
        {/* Label */}
        <span ref={labelRef} className={styles.label}>
          Got an idea?
        </span>

        {/* Título con líneas separadas para animación */}
        <div ref={titleWrapperRef} className={styles.titleWrapper}>
          <h2 className={styles.title}>
            <span ref={titleLine1Ref} className={styles.titleLine}>
              Let's work together to
            </span>
            <span ref={titleLine2Ref} className={styles.titleLine}>
              turn it into a unique
            </span>
            <span ref={titleLine3Ref} className={styles.titleLine}>
              visual universe.
            </span>
          </h2>
        </div>

        {/* CTA Principal */}
        <Link 
          ref={ctaRef} 
          href="/hablemos" 
          className={styles.cta}
          aria-label="Go to contact page"
        >
          <span>Let's Talk</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M4 10H16M16 10L11 5M16 10L11 15" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Email */}

      </div>
    </section>
  );
};
