import React from 'react';
import { VideoCard } from '@/components/ui/VideoCard/VideoCard';
import { works } from '@/data/works';
import styles from './WorksGrid.module.css';

export const WorksGrid: React.FC = () => {
  return (
    <section className={styles.worksGrid}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {works.map((work) => (
            <VideoCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};
