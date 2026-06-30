import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'Behance', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'YouTube', href: '#' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Section */}
          <div className={styles.brand}>
            <h3 className={styles.logo}>DOBLEPAR</h3>
            <p className={styles.tagline}>
              Convertimos ideas en universos coexistentes
            </p>
          </div>

          {/* Navigation */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Navegación</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.link}>Inicio</Link></li>
              <li><Link href="/trabajos" className={styles.link}>Trabajos</Link></li>
              <li><Link href="/nosotros" className={styles.link}>Nosotros</Link></li>
              <li><Link href="/hablemos" className={styles.link}>Hablemos</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Síguenos</h4>
            <ul className={styles.linkList}>
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contacto</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:hola@doblepar.com" className={styles.link}>
                  hola@doblepar.com
                </a>
              </li>
              <li className={styles.text}>Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} DOBLEPAR. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
