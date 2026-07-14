import React from 'react';
import styles from './ManifestoBlock.module.css';

export const ManifestoBlock: React.FC = () => {
  return (
    <section className={styles.manifesto}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Our Concept</h2>
          
          <div className={styles.text}>
            <p>
              DOBLEPAR sees brands as <strong>evolving ecosystems</strong> capable of expanding 
              through images, experiences, spaces, entertainment, narratives, technology and community.
            </p>
            <p>
              We don’t build isolated pieces: <strong>we design connections</strong>. We work across 
              disciplines, formats and languages: film, music, experiences, narrative, 
              technology, art and entertainment.
            </p>
            <p>
              Every project is an opportunity to explore new ways of telling stories, 
              creating visual identities and building experiences that transcend the conventional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
