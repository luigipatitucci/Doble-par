'use client';

import React, { useState } from 'react';
import { VideoCard } from '@/components/ui/VideoCard/VideoCard';
import { VideoModal } from '@/components/ui/VideoModal/VideoModal';
import { works } from '@/data/works';
import styles from './WorksGrid.module.css';

export const WorksGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={styles.worksGrid}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {works.map((work, index) => (
            <div
              key={work.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsModalOpen(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              <VideoCard work={work} />
            </div>
          ))}
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
