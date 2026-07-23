'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Work } from '@/types/work';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (previewMode === 'hover' && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (previewMode === 'hover' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const cardContent = (
    <div className={styles.mediaContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        loop={previewMode === 'hover'}
        playsInline
        preload="metadata"
        aria-label={`Video of ${work.title} - ${work.description}`}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;

          if (previewMode === 'static' && video.duration > 1) {
            video.currentTime = 1;
          }
        }}
        onSeeked={(event) => {
          if (previewMode === 'static') {
            event.currentTarget.pause();
          }
        }}
        onError={(event) => {
          console.error(
            `Video load error for work ID ${work.id} (${work.title}):`,
            work.video,
          );

          console.error('Error details:', event);
        }}
      >
        <source src={work.video} type="video/mp4" />
      </video>

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