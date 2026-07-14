'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VideoCard } from '@/components/ui/VideoCard/VideoCard';
import { VideoModal } from '@/components/ui/VideoModal/VideoModal';
import { Button } from '@/components/ui/Button/Button';
import { works } from '@/data/works';
import styles from './FeaturedWorks.module.css';

export const FeaturedWorks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mostrar 4 trabajos destacados con mix de orientaciones
  const featuredWorks = works.slice(0, 4);

  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>TRABAJOS</span>
          <h2 className={styles.title}>
            Ideas que se expanden en
            <br />
            múltiples formatos
          </h2>
          <p className={styles.subtitle}>
            Una selección de piezas visuales creadas para convivir entre
            <br className={styles.breakDesktop} />
            pantallas, narrativas y experiencias.
          </p>
        </div>

        <div className={styles.grid}>
          {featuredWorks.map((work, index) => (
            <div 
              key={work.id} 
              className={styles[`gridItem${index + 1}`]}
              onClick={() => {
                const workIndex = works.findIndex(w => w.id === work.id);
                setCurrentIndex(workIndex !== -1 ? workIndex : 0);
                setIsModalOpen(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              <VideoCard work={work} priority={index === 0} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Button variant="outline" size="large" href="/trabajos">
            Ver todos los trabajos
          </Button>
        </div>
      </div>

      {/* Modal de video */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        works={works}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};
