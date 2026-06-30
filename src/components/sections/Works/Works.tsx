import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { VideoCard } from '@/components/ui/VideoCard/VideoCard';
import { works } from '@/data/works';
import styles from './Works.module.css';

export const Works: React.FC = () => {
  return (
    <section id="trabajos" className={styles.works}>
      <div className={styles.container}>
        <SectionTitle
          align="center"
          subtitle="Explora nuestros proyectos más recientes y descubre cómo transformamos ideas en experiencias visuales únicas"
        >
          Trabajos
        </SectionTitle>

        <div className={styles.grid}>
          {works.map((work) => (
            <VideoCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};
