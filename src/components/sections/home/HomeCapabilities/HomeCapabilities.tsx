'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { capabilities } from '@/data/capabilities';
import styles from './HomeCapabilities.module.css';

export const HomeCapabilities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const label = labelRef.current;
      const title = titleRef.current;
      const grid = gridRef.current;
      const modules = moduleRefs.current.filter(Boolean);

      if (!section || !label || !title || !grid || modules.length === 0) return;

      // Respetar prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([label, title], { opacity: 1, y: 0 });
        gsap.set(grid, { opacity: 1 });
        modules.forEach((module) => {
          gsap.set(module, { opacity: 1, y: 0 });
        });
        return;
      }

      const ctx = gsap.context(() => {
        // Timeline de entrada
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            toggleActions: 'play none none none',
          },
        });

        // 1. Label
        tl.fromTo(
          label,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );

        // 2. Título
        tl.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );

        // 3. Grid container (bordes)
        tl.fromTo(
          grid,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.4'
        );

        // 4. Módulos con stagger
        tl.fromTo(
          modules,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }, section);

      return () => {
        ctx.revert();
      };
    });
  }, []);

  return (
    <section ref={sectionRef}>
      
    </section>
  );
};
