import React from 'react';
import styles from './WorkHero.module.css';

export const WorkHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.subtitle}>
          Explore our audiovisual projects, combining AI-powered production with live-action filmmaking.
        </p>
      </div>
    </section>
  );
};
