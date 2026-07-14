import React from 'react';
import styles from './ContactInfo.module.css';

export const ContactInfo: React.FC = () => {
  return (
    <section className={styles.contactInfo}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Email</h3>
            <a href="mailto:hola@doblepar.com" className={styles.cardValue}>
              hola@doblepar.com
            </a>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>WhatsApp</h3>
            <a
              href="https://wa.me/5491112345678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardValue}
            >
              +54 9 11 1234-5678
            </a>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Location</h3>
            <p className={styles.cardValue}>Buenos Aires, Argentina</p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Social Media</h3>
            <div className={styles.socialLinks}>
              <a
                href="#"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="#"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Behance
              </a>
              <a
                href="#"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
