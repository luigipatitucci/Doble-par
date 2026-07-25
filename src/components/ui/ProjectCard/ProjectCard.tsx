'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Work } from '@/types/work';
import { setupHls, isHlsVideo } from '@/lib/hlsHelper';
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
  const hlsCleanupRef = useRef<(() => void) | null>(null);

  // 🔥 Setup HLS if needed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isHls = isHlsVideo(work.video);
    
    if (isHls) {
      hlsCleanupRef.current = setupHls(video, work.video, {
        startLevel: 2,
        onError: (error) => {
          console.error(`HLS error for work ID ${work.id}:`, error);
        },
      });
    } else {
      // Regular MP4 - set source directly
      video.src = work.video;
    }

    return () => {
      if (hlsCleanupRef.current) {
        hlsCleanupRef.current();
        hlsCleanupRef.current = null;
      }
    };
  }, [work.video, work.id]);

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
        poster={work.poster}
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