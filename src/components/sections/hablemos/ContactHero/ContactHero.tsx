import React from 'react';
import styles from './ContactHero.module.css';

export const ContactHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Let's Talk</h1>
        <p className={styles.subtitle}>
          Got an idea? Let’s work together to make it real.
        </p>
      </div>
    </section>
  );
};
