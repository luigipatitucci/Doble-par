import React from 'react';
import styles from './ContactInfo.module.css';

export const ContactInfo: React.FC = () => {
  return (
    <section className={styles.contactInfo}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Email</h3>
            <a href="mailto:memi@dobleparcreatives.com" className={styles.cardValue}>
              memi@dobleparcreatives.com<br />
            </a>
            <a href="mailto:delfina@dobleparcreatives.com" className={styles.cardValue}>
              delfina@dobleparcreatives.com<br />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
