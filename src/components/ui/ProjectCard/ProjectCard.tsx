'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Work } from '@/types/work';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  work: Work;
  priority?: boolean;
  featured?: boolean;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  work, 
  priority = false,
  featured = false,
  onClick
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = async () => {
      if (isHovered && !isPlaying) {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (err) {
          console.log('Play prevented:', err);
        }
      } else if (!isHovered && isPlaying) {
        video.pause();
        video.currentTime = 0;
        setIsPlaying(false);
      }
    };

    handlePlay();
  }, [isHovered, isPlaying]);

  // Pausar video cuando sale del viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {onClick ? (
        <div className={styles.link} onClick={onClick} style={{ cursor: 'pointer' }}>
          {/* Video container */}
          <div className={styles.mediaContainer}>
            <video
              ref={videoRef}
              className={styles.video}
              muted
              loop
              playsInline
              preload="metadata"
              poster={work.poster}
              aria-label={`Video of ${work.title} - ${work.description}`}
            >
              <source src={work.id === '3' ? `${work.video}#t=1` : work.video} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className={styles.overlay} />

            {/* Play button */}
            {!isPlaying && (
              <div className={styles.playButton} aria-label="Play video">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 5.14v13.72L19 12L8 5.14z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}

            {/* Category label */}
            <div className={styles.category}>
              <span>{work.category}</span>
            </div>

            {/* Info */}
            <div className={styles.info}>
              <h3 className={styles.title}>{work.title}</h3>
              <p className={styles.description}>{work.description}</p>
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
        </div>
      ) : (
        <Link href={`/trabajos/${work.slug}`} className={styles.link}>
          {/* Video container */}
          <div className={styles.mediaContainer}>
            <video
              ref={videoRef}
              className={styles.video}
              muted
              loop
              playsInline
              preload="metadata"
              poster={work.poster}
              aria-label={`Video of ${work.title} - ${work.description}`}
            >
              <source src={work.id === '3' ? `${work.video}#t=1` : work.video} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className={styles.overlay} />

            {/* Play button */}
            {!isPlaying && (
              <div className={styles.playButton} aria-label="Play video">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 5.14v13.72L19 12L8 5.14z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}

            {/* Category label */}
            <div className={styles.category}>
              <span>{work.category}</span>
            </div>

            {/* Info */}
            <div className={styles.info}>
              <h3 className={styles.title}>{work.title}</h3>
              <p className={styles.description}>{work.description}</p>
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
        </Link>
      )}
    </article>
  );
};
