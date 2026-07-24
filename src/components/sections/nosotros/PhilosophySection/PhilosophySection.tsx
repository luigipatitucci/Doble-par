import React from 'react';
import styles from './PhilosophySection.module.css';

export const PhilosophySection: React.FC = () => {
  const philosophies = [
    {
      title: 'Film & Visual',
      description:
        'Cinematic content, powered by AI and live-action — built to move across every format.',
    },
    {
      title: 'Experiences',
      description:
        'Brand activations and immersive spaces designed to turn audiences into community.',
    },
    {
      title: 'Branding & Narrative',
      description:
        'One brand story, told coherently — across every platform, every format, every touchpoint.',
    },
    {
      title: 'Technology',
      description:
        'AI and emerging tech, applied with strategy — not novelty for its own sake.',
    },
  ];

  return (
    <section className={styles.philosophy}>
      <div className={styles.container}>
        <h2 className={styles.title}>How We Work</h2>
        
        <div className={styles.grid}>
          {philosophies.map((item, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
