import React from 'react';
import styles from './WorkHero.module.css';

export const WorkHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Trabajos</h1>
        <p className={styles.subtitle}>
          Explorá nuestros proyectos audiovisuales creados con inteligencia artificial.
          <br />
          Cada pieza es un universo único de creatividad y tecnología.
        </p>
      </div>
    </section>
  );
};
