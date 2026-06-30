import React from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <section id="nosotros" className={styles.about}>
      <div className={styles.container}>
        <SectionTitle align="center">Nosotros</SectionTitle>

        <div className={styles.content}>
          <div className={styles.manifesto}>
            <h3 className={styles.conceptTitle}>Nuestro Concepto</h3>
            <p className={styles.concept}>
              "Convertimos ideas en universos coexistentes"
            </p>
            
            <div className={styles.text}>
              <p>
                DOBLEPAR entiende las marcas como ecosistemas capaces de expandirse
                a través de imágenes, experiencias, espacios, entretenimiento,
                narrativas, tecnología y comunidad.
              </p>
              <p>
                No construimos piezas aisladas: diseñamos conexiones. Trabajamos
                cruzando disciplinas, formatos y lenguajes: audiovisual, música,
                experiencias, narrativa, tecnología, arte y entretenimiento.
              </p>
            </div>
          </div>

          <div className={styles.values}>
            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Audiovisual</h4>
              <p className={styles.valueText}>
                Creamos piezas visuales cinematográficas con inteligencia artificial
              </p>
            </div>

            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Experiencias</h4>
              <p className={styles.valueText}>
                Diseñamos activaciones de marca y espacios inmersivos
              </p>
            </div>

            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Narrativa</h4>
              <p className={styles.valueText}>
                Construimos universos narrativos coherentes y expandibles
              </p>
            </div>

            <div className={styles.value}>
              <h4 className={styles.valueTitle}>Tecnología</h4>
              <p className={styles.valueText}>
                Utilizamos IA y herramientas de vanguardia para innovar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
