import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import styles from './HomeAboutPreview.module.css';

export const HomeAboutPreview: React.FC = () => {
  return (
    <section className={styles.aboutPreview}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Columna de texto */}
          <div className={styles.textColumn}>
            <span className={styles.label}>NOSOTROS</span>
            
            <h2 className={styles.title}>
              No construimos piezas aisladas.
              <br />
              Diseñamos conexiones.
            </h2>
            
            <p className={styles.description}>
              Pensamos las marcas como ecosistemas capaces de expandirse a través de
              imágenes, experiencias, espacios, entretenimiento, narrativas, tecnología
              y comunidad.
            </p>

            <div className={styles.quote}>
              <p>Creamos universos capaces de coexistir.</p>
            </div>

            <Button variant="outline" size="large" href="/nosotros">
              Conocer la visión
            </Button>
          </div>

          {/* Columna visual */}
          <div className={styles.visualColumn}>
            <div className={styles.visualContainer}>
              <div className={styles.placeholder}>
                <div className={styles.placeholderOverlay}>
                  <span>DOBLEPAR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
