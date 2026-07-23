'use client';

import React, { useState, useRef, useEffect } from 'react';
import { works } from '@/data/works';
import { ProjectCard } from '@/components/ui/ProjectCard/ProjectCard';
import { VideoModal } from '@/components/ui/VideoModal/VideoModal';
import styles from './WorksGrid.module.css';

type FilterCategory =
  | 'All'
  | 'Commercials'
  | 'Brand Films'
  | 'Social & Digital'
  | 'Experiences';

const FILTER_LABELS: Record<FilterCategory, string> = {
  All: 'All',
  Commercials: 'Commercials',
  'Brand Films': 'Brand Films',
  'Social & Digital': 'Social & Digital',
  Experiences: 'Experiences',
};

export const WorksGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const startX = useRef(0);
  const scrollStart = useRef(0);

  const filteredWorks =
    activeFilter === 'All'
      ? works
      : works.filter(work => work.category === activeFilter);

  // 🔥 Scroll buttons
  const updateScrollButtons = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollButtons();

    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [filteredWorks]);

  // 🔥 Reset scroll on filter
  useEffect(() => {
    carouselRef.current?.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }, [activeFilter]);

  // 🔥 Navigation
  const handleScroll = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.8;

    carouselRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // 🔥 DRAG (CORREGIDO)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setHasDragged(false);

    startX.current = e.pageX;
    scrollStart.current = carouselRef.current.scrollLeft;

    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const dx = e.pageX - startX.current;

    if (Math.abs(dx) > 5) {
      setHasDragged(true);
    }

    carouselRef.current.scrollLeft = scrollStart.current - dx * 1.2;
  };

  const stopDragging = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section className={styles.worksGrid}>
      <div className={styles.container}>

        {/* FILTERS */}
        <div className={styles.filterWrapper}>
          <div className={styles.filters}>
            {(Object.keys(FILTER_LABELS) as FilterCategory[]).map(filter => (
              <button
                key={filter}
                className={`${styles.filterButton} ${
                  activeFilter === filter ? styles.active : ''
                }`}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentIndex(0);
                }}
              >
                {FILTER_LABELS[filter]}
              </button>
            ))}
          </div>
        </div>

        {/* CAROUSEL */}
        <div className={styles.carouselWrapper}>

          {canScrollLeft && (
            <button
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={() => handleScroll('left')}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={() => handleScroll('right')}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div
            ref={carouselRef}
            className={styles.carousel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            {filteredWorks.map((work) => (
              <div key={work.id} className={styles.card}>
                <ProjectCard
                  work={work}
                  previewMode="static"
                  onClick={() => {
                    if (hasDragged) return; // 🔥 evita click accidental
                    const i = works.findIndex(w => w.id === work.id);
                    setCurrentIndex(i);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        works={works}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};