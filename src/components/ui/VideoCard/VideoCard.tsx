'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Work } from '@/types/work';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  work: Work;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ work, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = async () => {
      if (isHovered && video.paused) {
        try {
          await video.play();
        } catch (err) {
          console.log('Play prevented:', err);
        }
      } else if (!isHovered && !video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    };

    handlePlay();
  }, [isHovered]);

  return (
    <article
      className={`${styles.card} ${styles[work.orientation]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.videoWrapper}>
        {/* Placeholder mientras carga el video */}
        {!isLoaded && (
          <div className={styles.placeholder}>
            <span>Cargando...</span>
          </div>
        )}
        
        <video
          ref={videoRef}
          className={styles.video}
          src={work.video}
          {...(work.poster && { poster: work.poster })}
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
        />
        
        <div className={`${styles.overlay} ${isHovered ? styles.visible : ''}`}>
          <div className={styles.content}>
            <span className={styles.category}>{work.category}</span>
            <h3 className={styles.title}>{work.title}</h3>
            <p className={styles.client}>{work.client}</p>
            <p className={styles.description}>{work.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
