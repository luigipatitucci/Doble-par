import React from 'react';
import styles from './PhilosophySection.module.css';

export const PhilosophySection: React.FC = () => {
  const philosophies = [
    {
      title: 'Film & Visual',
      description:
        'We create cinematic visual work through AI and live-action production, exploring new forms of storytelling across physical and digital worlds.',
    },
    {
      title: 'Experiences',
      description:
        'We design brand activations and immersive spaces that connect with audiences in memorable ways.',
    },
    {
      title: 'Narrative',
      description:
        'We build coherent and expandable narrative universes that transcend platforms and formats.',
    },
    {
      title: 'Technology',
      description:
        'We use AI and cutting-edge tools to constantly innovate in our creative processes.',
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
