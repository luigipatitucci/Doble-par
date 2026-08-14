'use client';

import React from 'react';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>About</h2>
        
        <div className={styles.columns}>
          {/* Columna Izquierda */}
          <div className={styles.column}>
            <p className={styles.text}>
              DOBLEPAR was founded by <strong className={styles.highlight}>Memi Merlino</strong> and <strong className={styles.highlight}>Delfina Coelho</strong> after years of working across advertising, film, audiovisual production, creative direction, branded content, technology, and experiential projects.
            </p>
            <p className={styles.text}>
              Before joining forces, their paths were shaped by collaborations with agencies including <strong className={styles.highlight}>GREY</strong>, <strong className={styles.highlight}>Ogilvy</strong>, <strong className={styles.highlight}>Leo Burnett</strong>, <strong className={styles.highlight}>GUT</strong>, and <strong className={styles.highlight}>Johannes Leonardo</strong>, as well as production companies such as <strong className={styles.highlight}>Argentina Cine</strong> and <strong className={styles.highlight}>Virgen Films</strong>.
            </p>
            <p className={styles.text}>
              Throughout their careers, they have developed projects for brands including Corona, Bank of America, Mercado Libre, PedidosYa, Sanofi, Arcor, Amazon, PepsiCo, Grupo Peñaflor, Frizzé, Bierhaus, KIA, Galicia, JanSport, YPF, Noblex, and many others.
            </p>
          </div>

          {/* Columna Derecha */}
          <div className={styles.column}>
            <p className={styles.text}>
              Their experience across agencies, brands, production companies, and film taught them that the strongest ideas are never created in isolation. They emerge when strategy, creativity, narrative, technology, production, and execution move in the same direction.
            </p>
            <p className={styles.statement}>
              That belief became DOBLEPAR.
            </p>
            <div className={styles.founders}>
              <div className={styles.founderBlock}>
                <p className={styles.text}>
                  <strong className={styles.highlight}>Memi Merlino</strong>, Co-Founder and Creative & Commercial Producer, brings the ability to transform ideas into opportunities and build the relationships that move projects forward.
                </p>
              </div>
              <div className={styles.founderBlock}>
                <p className={styles.text}>
                  <strong className={styles.highlight}>Delfina Coelho</strong>, Co-Founder, Creative Director & Audiovisual Producer, brings the creative and production vision required to shape those ideas and bring them to life.
                </p>
              </div>
            </div>
            <p className={styles.text}>
              Together, they lead DOBLEPAR through two complementary perspectives — combining creative ambition with the structure, strategy, and production expertise needed to make it real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
