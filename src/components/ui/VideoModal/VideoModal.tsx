'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Work } from '@/types/work';
import { SafeVideo } from '@/components/ui/SafeVideo';
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
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMounted, setIsMounted] = useState(false);

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
          data-orientation={currentWork.orientation}
        >
          {/* Fixed aspect ratio media container */}
          <div className={styles.modalMedia}>
            <SafeVideo
              ref={videoRef}
              muxPlaybackId={currentWork.muxPlaybackId}
              fallbackVideo={currentWork.fallbackVideo}
              poster={currentWork.poster}
              className={styles.video}
              autoPlay
              muted={false}
              playsInline
              loop
              controls={true}
            />
          </div>

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

  return createPortal(modalContent, document.body);
};