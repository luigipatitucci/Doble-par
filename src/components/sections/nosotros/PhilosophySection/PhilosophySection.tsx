import React from 'react';
import styles from './PhilosophySection.module.css';

export const PhilosophySection: React.FC = () => {
  const philosophies = [
    {
      title: 'Audiovisual',
      description:
        'Creamos piezas visuales cinematográficas con inteligencia artificial, explorando nuevas formas de narrativa visual.',
    },
    {
      title: 'Experiencias',
      description:
        'Diseñamos activaciones de marca y espacios inmersivos que conectan con las audiencias de manera memorable.',
    },
    {
      title: 'Narrativa',
      description:
        'Construimos universos narrativos coherentes y expandibles que trascienden plataformas y formatos.',
    },
    {
      title: 'Tecnología',
      description:
        'Utilizamos IA y herramientas de vanguardia para innovar constantemente en nuestros procesos creativos.',
    },
  ];

  return (
    <section className={styles.philosophy}>
      <div className={styles.container}>
        <h2 className={styles.title}>Cómo Trabajamos</h2>
        
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
