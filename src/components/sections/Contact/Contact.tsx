import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { Button } from '@/components/ui/Button/Button';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  return (
    <section id="hablemos" className={styles.contact}>
      <div className={styles.container}>
        <SectionTitle
          align="center"
          subtitle="¿Tenés una idea? Trabajemos juntos para convertirla en realidad"
        >
          Hablemos
        </SectionTitle>

        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Email</h4>
              <a href="mailto:hola@doblepar.com" className={styles.infoValue}>
                hola@doblepar.com
              </a>
            </div>

            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Ubicación</h4>
              <p className={styles.infoValue}>Buenos Aires, Argentina</p>
            </div>

            <div className={styles.infoItem}>
              <h4 className={styles.infoLabel}>Redes Sociales</h4>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <a href="#" className={styles.socialLink}>Behance</a>
                <a href="#" className={styles.socialLink}>LinkedIn</a>
                <a href="#" className={styles.socialLink}>YouTube</a>
              </div>
            </div>
          </div>

          <div className={styles.cta}>
            <p className={styles.ctaText}>
              Estamos listos para dar vida a tu próximo proyecto
            </p>
            <Button variant="primary" size="large" href="mailto:hola@doblepar.com">
              Escribinos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
