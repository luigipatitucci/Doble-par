'use client';

import React, { useState } from 'react';
import { Work } from '@/types/work';
import { SafeVideo } from '@/components/ui/SafeVideo';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  work: Work;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ work, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article
      className={`${styles.card} ${styles[work.orientation]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.videoWrapper}>
        {!isLoaded && (
          <div className={styles.placeholder}>
            <span>Cargando...</span>
          </div>
        )}
        
        <SafeVideo
          muxPlaybackId={work.muxPlaybackId}
          fallbackVideo={work.fallbackVideo}
          poster={work.poster}
          className={styles.video}
          loop
          muted
          autoPlay={false}
          playsInline
          controls={false}
          playing={isHovered}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
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
