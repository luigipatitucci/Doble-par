'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Work } from '@/types/work';
import { SafeVideo } from '@/components/ui/SafeVideo';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  work: Work;
  priority?: boolean;
  featured?: boolean;
  onClick?: () => void;
  previewMode?: 'hover' | 'static';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  work,
  featured = false,
  onClick,
  previewMode = 'static',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Only play on hover for hover preview mode
    if (previewMode === 'hover' && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Pause and reset for hover preview mode
    if (previewMode === 'hover' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const cardContent = (
    <div className={styles.mediaContainer}>
      <SafeVideo
        ref={videoRef}
        muxPlaybackId={work.muxPlaybackId}
        fallbackVideo={work.fallbackVideo}
        poster={work.poster}
        className={styles.video}
        muted
        loop={previewMode === 'hover'}
        autoPlay={previewMode === 'static'}
        playsInline
        controls={false}
        startTime={previewMode === 'static' ? 1 : undefined}
      />


      <div className={styles.overlay} />

      <div className={styles.info}>
        <span className={styles.categoryLabel}>
          {work.category.toUpperCase()}
        </span>

        <span className={styles.client}>
          {work.client}
        </span>

        <span className={styles.meta}>
          {work.title} · {work.description}
        </span>

        <div className={styles.arrow}>
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
        </div>
      </div>
    </div>
  );

  return (
    <article
      className={`${styles.card} ${
        featured ? styles.featured : ''
      }`}
      data-orientation={work.orientation}
      data-preview-mode={previewMode}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {onClick ? (
        <button
          type="button"
          className={styles.cardButton}
          onClick={onClick}
          aria-label={`Abrir proyecto ${work.title}`}
        >
          {cardContent}
        </button>
      ) : (
        <Link
          href={`/trabajos/${work.slug}`}
          className={styles.link}
          aria-label={`Abrir proyecto ${work.title}`}
        >
          {cardContent}
        </Link>
      )}
    </article>
  );
};