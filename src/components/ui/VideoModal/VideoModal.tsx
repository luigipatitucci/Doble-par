'use client';

import React, { useEffect, useRef } from 'react';
import { Work } from '@/types/work';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  works: Work[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  works,
  currentIndex,
  setCurrentIndex,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const currentWork = works[currentIndex];

  const next = () => {
    setCurrentIndex((currentIndex + 1) % works.length);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + works.length) % works.length);
  };

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      isInitialLoad.current = true; // Reiniciar en cada apertura del modal
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Manejar tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Manejar teclas de navegación (flechas)
  useEffect(() => {
    const handleArrows = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleArrows);
    }

    return () => {
      document.removeEventListener('keydown', handleArrows);
    };
  }, [isOpen, currentIndex]);

  // Cambiar video con transición suave
  useEffect(() => {
    const video = videoRef.current;
    const wrapper = videoWrapperRef.current;
    
    if (!video || !wrapper || !isOpen) return;

    const changeVideo = async () => {
      // Si es la carga inicial, no hacer transición
      if (isInitialLoad.current) {
        video.src = currentWork.id === '3' ? `${currentWork.video}#t=1` : currentWork.video;
        video.load();
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          setIsPlaying(false);
        }
        isInitialLoad.current = false;
        return;
      }

      // Fade out
      setIsTransitioning(true);
      wrapper.style.opacity = '0';
      
      // Esperar fade out
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Cambiar src y preparar video
      video.src = currentWork.id === '3' ? `${currentWork.video}#t=1` : currentWork.video;
      video.load();
      
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
      
      // Fade in
      wrapper.style.opacity = '1';
      setIsTransitioning(false);
    };

    changeVideo();
  }, [currentIndex, isOpen, currentWork.video]);

  // Auto-scroll al thumbnail activo
  useEffect(() => {
    if (thumbnailsRef.current && isOpen) {
      const activeThumb = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex, isOpen]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Click fuera del video para cerrar
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Swipe para mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      next();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right
      prev();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botón cerrar */}
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Botón anterior */}
      {works.length > 1 && (
        <button
          className={`${styles.nav} ${styles.prev}`}
          onClick={prev}
          aria-label="Video anterior"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Contenedor principal del modal */}
      <div className={styles.modalContent}>
        {/* Video wrapper */}
        <div 
          ref={videoWrapperRef} 
          className={styles.videoWrapper}
        >
          <video
            ref={videoRef}
            className={`${styles.video} ${
              currentWork.orientation === 'portrait' ? styles.portrait : styles.landscape
            }`}
            autoPlay
            playsInline
            loop
            onClick={togglePlayPause}
          />

          {/* Info del video - overlay dentro */}
          <div className={styles.videoInfo}>
            <span className={styles.category}>{currentWork.category}</span>
            <h3 className={styles.title}>{currentWork.title}</h3>
            <p className={styles.client}>{currentWork.client}</p>
          </div>

          {/* Contador dentro del video */}
          <div className={styles.counter}>
            {currentIndex + 1} / {works.length}
          </div>

          {/* Play/Pause overlay button */}
          {!isPlaying && (
            <button 
              className={styles.playButton}
              onClick={togglePlayPause}
              aria-label="Reproducir video"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <path
                  d="M20 16L32 24L20 32V16Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {works.length > 1 && (
          <div ref={thumbnailsRef} className={styles.thumbnails}>
            {works.map((work, index) => (
              <button
                key={work.id}
                onClick={() => setCurrentIndex(index)}
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.active : ''
                }`}
                aria-label={`Ver ${work.title}`}
              >
                <video
                  src={work.id === '3' ? `${work.video}#t=1` : work.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Botón siguiente */}
      {works.length > 1 && (
        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={next}
          aria-label="Video siguiente"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
