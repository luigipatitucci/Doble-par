import React from 'react';
import styles from './ContactHero.module.css';

export const ContactHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hablemos</h1>
        <p className={styles.subtitle}>
          ¿Tenés una idea? Trabajemos juntos para convertirla en realidad.
        </p>
      </div>
    </section>
  );
};
