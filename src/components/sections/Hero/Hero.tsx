import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Convertimos ideas en
            <br />
            <span className={styles.highlight}>universos coexistentes</span>
          </h1>
          <p className={styles.subtitle}>
            Agencia creativa y audiovisual especializada en la creación de
            contenido visual con inteligencia artificial
          </p>
          <div className={styles.actions}>
            <Button variant="primary" size="large" href="#trabajos">
              Ver Trabajos
            </Button>
            <Button variant="outline" size="large" href="#hablemos">
              Hablemos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
