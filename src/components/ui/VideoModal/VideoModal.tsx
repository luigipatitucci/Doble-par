'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const currentWork = works[currentIndex];

  // Check if component is mounted (for SSR safety)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen && isMounted) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, isMounted]);

  // 🔥 Enhanced onClose handler to stop video immediately
  const handleClose = useCallback(() => {
    // Stop ALL videos on the page
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
    onClose();
  }, [onClose]);

  const next = () => {
    setCurrentIndex((currentIndex + 1) % works.length);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + works.length) % works.length);
  };

  // Marcar carga inicial al abrir modal
  useEffect(() => {
    if (isOpen) {
      isInitialLoad.current = true;
    }
  }, [isOpen]);

  // 🔥 Ensure only one video plays at a time
  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
    // Reset ready state when changing videos
    setIsReady(false);
  }, [currentIndex]);

  // Manejar tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

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
      // 🔥 Stop previous video before changing
      if (video.src) {
        video.pause();
        video.currentTime = 0;
      }

      // Si es la carga inicial, no hacer transición
      if (isInitialLoad.current) {
        video.src = currentWork.id === '3' ? `${currentWork.video}#t=1` : currentWork.video;
        video.load();
        console.log('Initial load - Loading video in modal:', currentWork.video, 'for work:', currentWork.title);
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Initial load - Video play error in modal:', error, 'video:', currentWork.video);
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
      
      // Log video path for debugging
      console.log('Loading video in modal:', currentWork.video, 'for work:', currentWork.title);
      
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Video play error in modal:', error, 'video:', currentWork.video);
        setIsPlaying(false);
      }
      
      // Fade in
      wrapper.style.opacity = '1';
      setIsTransitioning(false);
    };

    changeVideo();
  }, [currentIndex, isOpen, currentWork.video]);

  // 🔥 CLEANUP: Stop video when modal closes
  useEffect(() => {
    const video = videoRef.current;

    // Cleanup function runs when modal closes or component unmounts
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.src = ''; // Clear source to prevent memory leaks
      }
    };
  }, [isOpen]);

  // 🔥 Listen for video ready state (canplay event)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      // Optional: Set to a better starting frame
      if (video.currentTime === 0) {
        video.currentTime = 0.1;
      }
      setIsReady(true);
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentIndex]);

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
      handleClose();
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

  // Don't render on server or if not mounted
  if (!isMounted) return null;

  // Render modal using Portal to document.body
  const modalContent = (
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
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          handleClose();
        }}
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
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
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
            key={currentIndex} // 🔥 Force remount on video change
            ref={videoRef}
            className={`${styles.video} ${isReady ? styles.ready : ''} ${
              currentWork.orientation === 'portrait' ? styles.portrait : styles.landscape
            }`}
            autoPlay
            playsInline
            loop
            preload="auto"
            poster={currentWork.poster}
            onClick={togglePlayPause}
          />

          {/* Info del video - overlay dentro */}
          <div className={styles.videoInfo}>
            <span className={styles.categoryLabel}>
              {currentWork.category.toUpperCase()}
            </span>
            <span className={styles.client}>{currentWork.client}</span>
            <span className={styles.meta}>
              {currentWork.title} · {currentWork.description}
            </span>
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
      </div>

      {/* Botón siguiente */}
      {works.length > 1 && (
        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
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

  // Use Portal to render modal at document.body level
  return createPortal(modalContent, document.body);
};
