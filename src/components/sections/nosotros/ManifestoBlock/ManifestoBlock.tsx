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
          <h2 className={styles.sectionTitle}>Our Approach</h2>
          
          <div className={styles.text}>
            <p ref={(el) => {
    paragraphsRef.current[0] = el;
  }}>
              DOBLEPAR sees brands as <strong>evolving ecosystems</strong> — and every ecosystem needs direction. We bring together branding, communication, creative direction, campaign development, and end-to-end audiovisual production, connecting every discipline through storytelling, technology, experiences, and community.
            </p>
            <p ref={(el) => {
    paragraphsRef.current[1] = el;
  }}>
              We don't build isolated pieces: <strong>We transform ideas into clear concepts</strong>, cohesive narratives, and visual worlds built to connect, grow, and leave a mark.
            </p>
            <p ref={(el) => {
    paragraphsRef.current[2] = el;
  }}>
              Every project is an opportunity to bring clarity to complexity and turn a brand’s vision into a living, evolving story.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
