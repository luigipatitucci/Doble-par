'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { works } from '@/data/works';
import { ProjectCard } from '@/components/ui/ProjectCard/ProjectCard';
import { VideoModal } from '@/components/ui/VideoModal/VideoModal';
import styles from './HomeSelectedWork.module.css';

export const HomeSelectedWork: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

      const ctx = gsap.context(() => {
        gsap.fromTo(
          [labelRef.current, titleRef.current, descriptionRef.current, gridRef.current, ctaRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });
  }, []);

  // =========================
  // DATA
  // =========================

  // Only show first 11 works on home (exclude new works from carousel page)
  const homeWorks = works.slice(0, 11);

  const featured = homeWorks.find(w => w.featured);
  const portraits = homeWorks.filter(w => w.orientation === 'portrait' && !w.featured);
  const landscapes = homeWorks.filter(w => w.orientation === 'landscape' && !w.featured);

  // =========================
  // LAYOUT
  // =========================

  const layout = [
    // FILA 1
    { work: featured, type: 'landscapeWide' },
    { work: portraits[0], type: 'portrait' },
    { work: portraits[1], type: 'portrait' },

    // FILA 2
    { work: landscapes[0], type: 'landscapeWide' },
    { work: landscapes[1], type: 'landscapeWide' },
    { work: landscapes[2], type: 'landscapeWide' },

    // FILA 3
    { work: portraits[2], type: 'portrait' },
    { work: landscapes[3], type: 'landscapeWide' },
    { work: portraits[3], type: 'portrait' },

    // FILA 4 (intercalado 👇)
    { work: landscapes[4], type: 'landscapeWide' },
    { work: portraits[4], type: 'portrait' },
    { work: landscapes[5], type: 'landscape' },

    // FILA 5 (ritmo final 👇)
    { work: portraits[5], type: 'portrait' },
    { work: landscapes[6], type: 'landscape' },
    { work: landscapes[7], type: 'landscapeWide' },
  ].filter(item => item.work);

  const getClass = (type: string) => {
    switch (type) {
      case 'featured':
        return styles.cardFeatured;
      case 'portrait':
        return styles.cardPortrait;
      case 'landscapeWide':
        return styles.cardLandscapeWide;
      default:
        return styles.cardLandscape;
    }
  };

  return (
    <section ref={sectionRef} className={styles.selectedWork}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span ref={labelRef} className={styles.label}>OUR WORK</span>
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

        {/* GRID */}
        <div ref={gridRef} className={styles.grid}>
          {layout.map((item, index) => {
            const isLast = index === layout.length - 1;

            // Only the video with id '3' starts at second 1
            const workToRender = item.work?.id === '3'
              ? { ...item.work, video: `${item.work.video}#t=1` }
              : item.work!;

            return (
              <div
                key={item.work!.id}
                className={isLast ? styles.cardFull : getClass(item.type)}
              >
                <ProjectCard
                  work={workToRender}
                  featured={item.type === 'featured'}
                  previewMode="hover"
                  onClick={() => {
                    const i = homeWorks.findIndex(w => w.id === item.work!.id);
                    setCurrentIndex(i);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <Link ref={ctaRef} href="/trabajos" className={styles.ctaLink}>
            View All Work →
          </Link>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        works={homeWorks}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};