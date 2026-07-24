'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './ManifestoBlock.module.css';

export const ManifestoBlock: React.FC = () => {
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const paragraphs = paragraphsRef.current.filter(Boolean);

      paragraphs.forEach((paragraph, index) => {
        gsap.fromTo(
          paragraph,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: paragraph,
              start: 'top 85%',
              end: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
  }, []);

  return (
    <section className={styles.manifesto}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Our Concept</h2>
          
          <div className={styles.text}>
            <p ref={(el) => {
    paragraphsRef.current[0] = el;
  }}>
              DOBLEPAR sees brands as <strong>evolving ecosystems</strong> — and every ecosystem needs direction. We bring branding, communication, and full creative direction together with content production, experiences, technology, and community, all expanding as one living universe.
            </p>
            <p ref={(el) => {
    paragraphsRef.current[1] = el;
  }}>
              We don't build isolated pieces: <strong>we curate and build brand universes</strong>. From digital content and advertising to experiences, narrative, and technology — every discipline works to keep one living story alive.
            </p>
            <p ref={(el) => {
    paragraphsRef.current[2] = el;
  }}>
              Every project is a chance to bring order to the chaos — sharper brand universes, stories that stay alive, and communication that goes beyond the expected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
