import React from 'react';
import Link from 'next/link';
import { VideoCard } from '@/components/ui/VideoCard/VideoCard';
import { Button } from '@/components/ui/Button/Button';
import { works } from '@/data/works';
import styles from './FeaturedWorks.module.css';

export const FeaturedWorks: React.FC = () => {
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
            <div key={work.id} className={styles[`gridItem${index + 1}`]}>
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
    </section>
  );
};
