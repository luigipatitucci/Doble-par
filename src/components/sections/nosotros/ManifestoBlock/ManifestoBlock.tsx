import React from 'react';
import styles from './ManifestoBlock.module.css';

export const ManifestoBlock: React.FC = () => {
  return (
    <section className={styles.manifesto}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Nuestro Concepto</h2>
          
          <div className={styles.text}>
            <p>
              DOBLEPAR entiende las marcas como <strong>ecosistemas capaces de expandirse</strong> a través 
              de imágenes, experiencias, espacios, entretenimiento, narrativas, tecnología y comunidad.
            </p>
            <p>
              No construimos piezas aisladas: <strong>diseñamos conexiones</strong>. Trabajamos cruzando 
              disciplinas, formatos y lenguajes: audiovisual, música, experiencias, narrativa, 
              tecnología, arte y entretenimiento.
            </p>
            <p>
              Cada proyecto es una oportunidad para explorar nuevas formas de contar historias, 
              crear identidades visuales y construir experiencias que trascienden lo convencional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
