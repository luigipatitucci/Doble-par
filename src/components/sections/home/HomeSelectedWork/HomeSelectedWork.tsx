'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { works } from '@/data/works';
import { ProjectCard } from '@/components/ui/ProjectCard/ProjectCard';
import styles from './HomeSelectedWork.module.css';

export const HomeSelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const label = labelRef.current;
      const title = titleRef.current;
      const description = descriptionRef.current;
      const grid = gridRef.current;
      const cta = ctaRef.current;

      if (!section || !label || !title || !description || !grid || !cta) return;

      // Respetar prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([label, title, description, grid, cta], { opacity: 1, y: 0 });
        return;
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 30%',
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
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );

        // 3. Descripción
        tl.fromTo(
          description,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );

        // 4. Grid
        tl.fromTo(
          grid,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.3'
        );

        // 5. CTA
        tl.fromTo(
          cta,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }, section);

      return () => {
        ctx.revert();
      };
    });
  }, []);

  // Deduplicar videos por ID
  const uniqueWorks = Array.from(
    new Map(works.map(work => [work.id, work])).values()
  );

  // Separar en grupos para control manual del layout
  const featured = uniqueWorks.find(w => w.featured);
  const portraits = uniqueWorks.filter(w => w.orientation === 'portrait' && !w.featured);
  const landscapes = uniqueWorks.filter(w => w.orientation === 'landscape' && !w.featured);

  // Construir orden manual para garantizar layout equilibrado
  const orderedVideos = [
    featured,                 // Fila 1: Featured (8 cols)
    portraits[0],             // Fila 1: Portrait derecha (2 cols)
    portraits[1],             // Fila 1: Portrait derecha (2 cols) = 12 cols total
    
    portraits[2],             // Fila 2: Portrait izquierda (2 cols)
    portraits[3],             // Fila 2: Portrait (2 cols)
    landscapes[0],            // Fila 2: Landscape (4 cols)
    landscapes[1],            // Fila 2: Landscape Wide (4 cols) = 12 cols
    
    landscapes[2],            // Fila 3: Landscape Wide (6 cols)
    landscapes[3],            // Fila 3: Landscape Wide (6 cols) = 12 cols
  ].filter((work): work is typeof works[0] => work !== undefined); // Type guard explícito

  // Pre-calcular tipos de card con lógica editorial limpia
  const cardTypes = (() => {
    const types: string[] = [];
    let currentColumn = 0;

    orderedVideos.forEach((work, index) => {
      // Primer video siempre featured
      if (index === 0 || work.featured) {
        types.push(styles.cardFeatured);
        currentColumn += 8;
        return;
      }

      // Portraits detectados por orientation
      if (work.orientation === 'portrait') {
        types.push(styles.cardPortrait);
        currentColumn += 2;
        return;
      }

      // Landscapes: calcular tamaño según espacio disponible
      const columnInRow = currentColumn % 12;
      const remainingInRow = 12 - columnInRow;

      // Si quedan exactamente 6 cols, usar wide para completar fila
      if (remainingInRow === 6) {
        types.push(styles.cardLandscapeWide);
        currentColumn += 6;
      }
      // Si quedan 4+ cols, usar landscape normal
      else if (remainingInRow >= 4) {
        types.push(styles.cardLandscape);
        currentColumn += 4;
      }
      // Si quedan menos de 4, pasar a nueva fila con landscape normal
      else {
        currentColumn = Math.ceil(currentColumn / 12) * 12;
        types.push(styles.cardLandscape);
        currentColumn += 4;
      }
    });

    return types;
  })();

  return (
    <section ref={sectionRef} className={styles.selectedWork}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span ref={labelRef} className={styles.label}>
              OUR WORK
            </span>
            <h2 ref={titleRef} className={styles.title}>
              Ideas that expand across multiple formats
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p ref={descriptionRef} className={styles.description}>
              A selection of visual pieces created to live across screens,
              narratives and experiences.
            </p>
          </div>
        </div>

        {/* Grid Dinámico - Orden controlado */}
        <div ref={gridRef} className={styles.grid}>
          {orderedVideos.map((work, index) => (
            <div key={work.id} className={cardTypes[index]}>
              <ProjectCard 
                work={work} 
                priority={index === 0} 
                featured={index === 0 || work.featured}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <Link ref={ctaRef} href="/trabajos" className={styles.ctaLink}>
            <span>View All Work</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10h12m0 0l-4-4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
