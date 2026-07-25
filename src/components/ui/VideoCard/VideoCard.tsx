'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Work } from '@/types/work';
import { setupHls, isHlsVideo } from '@/lib/hlsHelper';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  work: Work;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ work, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsCleanupRef = useRef<(() => void) | null>(null);

  // 🔥 Setup HLS if needed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoUrl = work.id === '3' ? `${work.video}#t=1` : work.video;
    const isHls = isHlsVideo(videoUrl);
    
    if (isHls) {
      hlsCleanupRef.current = setupHls(video, videoUrl, {
        startLevel: 2,
        onError: (error) => {
          console.error(`HLS error for work ID ${work.id}:`, error);
          setIsLoaded(true); // Show card even if HLS fails
        },
      });
    } else {
      // Regular MP4 - set source directly
      video.src = videoUrl;
    }

    return () => {
      if (hlsCleanupRef.current) {
        hlsCleanupRef.current();
        hlsCleanupRef.current = null;
      }
    };
  }, [work.video, work.id]);

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
          poster={work.poster}
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onError={(e) => {
            console.error(`Video load error for work ID ${work.id} (${work.title}):`, work.video);
            console.error('Error details:', e);
            setIsLoaded(true); // Show card even if video fails
          }}
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
