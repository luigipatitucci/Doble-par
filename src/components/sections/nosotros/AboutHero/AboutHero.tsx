import React from 'react';
import styles from './AboutHero.module.css';

export const AboutHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Nosotros</h1>
        <p className={styles.subtitle}>
          Convertimos ideas en universos coexistentes
        </p>
      </div>
    </section>
  );
};
