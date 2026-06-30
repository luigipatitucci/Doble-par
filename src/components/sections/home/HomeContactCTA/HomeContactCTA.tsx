import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './HomeContactCTA.module.css';

export const HomeContactCTA: React.FC = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>¿Tenés una idea?</h2>
          <p className={styles.text}>
            Trabajemos juntos para convertirla en un universo visual único.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" size="large" href="/hablemos">
              Hablemos
            </Button>
            <Button variant="outline" size="large" href="mailto:hola@doblepar.com">
              hola@doblepar.com
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
