import React from 'react';
import styles from './PhilosophySection.module.css';

export const PhilosophySection: React.FC = () => {
  const philosophies = [
    {
      title: 'FILM & VISUAL',
      description:
        'Cinematic content combining live action, audiovisual craft, and AI — created to move across every format.',
    },
    {
      title: 'EXPERIENCES',
      description:
        'Brand activations and immersive spaces designed to turn audiences into communities.',
    },
    {
      title: 'BRANDING, CAMPAIGNS & NARRATIVE',
      description:
        'Creative direction, concepts, and campaigns that shape one coherent brand story across every platform and touchpoint.',
    },
    {
      title: 'TECHNOLOGY',
      description:
        'AI and emerging technologies applied with purpose and strategy — never for novelty’s sake.',
    },
  ];

  return (
    <section className={styles.philosophy}>
      <div className={styles.container}>
        <h2 className={styles.title}>WHAT WE DO</h2>
        
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
