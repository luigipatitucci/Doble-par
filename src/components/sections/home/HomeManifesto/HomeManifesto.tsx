'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './HomeManifesto.module.css';

export const HomeManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const intro = introRef.current;
      const statement = statementRef.current;

      if (!section || !intro || !statement) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([intro, statement], { opacity: 1, y: 0 });
        return;
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Intro
        tl.fromTo(
          intro,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        );

        // 2. Statement
        tl.fromTo(
          statement,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );
      }, section);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section id="manifesto" ref={sectionRef} className={styles.manifesto}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Introducción */}
          <p ref={introRef} className={styles.intro}>
            DOBLEPAR sees brands as <span className={styles.highlight}>ecosystems capable of expanding</span> through images, experiences, spaces, entertainment, narrative, technology and community.
          </p>

          {/* Statement principal */}
          <h2 ref={statementRef} className={styles.statement}>
            We don’t create isolated pieces — <span className={styles.highlight}>we build connected visual worlds through AI, live-action production, and physical and digital experiences.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};
