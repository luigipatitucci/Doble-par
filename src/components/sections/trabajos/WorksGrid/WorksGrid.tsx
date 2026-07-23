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
  const carouselRef = useRef<HTMLDivElement>(null); // 🔥 Ref for carousel scroll

  // 🔥 Reset scroll position when filter changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [activeFilter]);

  const filteredWorks =
    activeFilter === 'All'
      ? works
      : works.filter(work => work.category === activeFilter);

  // =========================
  // MISMA LÓGICA QUE HOME 🔥
  // =========================

  const featured = filteredWorks.find(w => w.featured);
  const portraits = filteredWorks.filter(
    w => w.orientation === 'portrait' && !w.featured
  );
  const landscapes = filteredWorks.filter(
    w => w.orientation === 'landscape' && !w.featured
  );

  const layout = [
    { work: featured, type: 'landscapeWide' },

    { work: portraits[0], type: 'portrait' },
    { work: portraits[1], type: 'portrait' },

    { work: landscapes[0], type: 'landscapeWide' },
    { work: landscapes[1], type: 'landscapeWide' },
    { work: landscapes[2], type: 'landscapeWide' },

    { work: portraits[2], type: 'portrait' },
    { work: landscapes[3], type: 'landscapeWide' },
    { work: portraits[3], type: 'portrait' },

    { work: landscapes[4], type: 'landscapeWide' },
    { work: portraits[4], type: 'portrait' },
    { work: landscapes[5], type: 'landscape' },

    { work: portraits[5], type: 'portrait' },
    { work: landscapes[6], type: 'landscape' },
    { work: landscapes[7], type: 'landscapeWide' },

    // 👉 resto automático
    ...filteredWorks.slice(15).map(w => ({
      work: w,
      type: w.orientation === 'portrait' ? 'portrait' : 'landscape',
    })),
  ].filter(item => item.work);

  const getClass = (type: string) => {
    switch (type) {
      case 'portrait':
        return styles.cardPortrait;
      case 'landscapeWide':
        return styles.cardLandscapeWide;
      default:
        return styles.cardLandscape;
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
                  setCurrentIndex(0); // 🔥 Reset to first item when filtering
                }}
              >
                {FILTER_LABELS[filter]}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div ref={carouselRef} className={styles.grid}>
          {layout.map((item, index) => {
            const isLast = index === layout.length - 1;

            return (
              <div
                key={item.work!.id}
                className={isLast ? styles.cardFull : getClass(item.type)}
              >
                <ProjectCard
                  work={item.work!}
                  onClick={() => {
                    const i = works.findIndex(w => w.id === item.work!.id);
                    setCurrentIndex(i);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            );
          })}
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