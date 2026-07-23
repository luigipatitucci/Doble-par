'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './Footer.module.css';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/trabajos' },
  { name: 'Studio', href: '/nosotros' },
  { name: "Let's Talk", href: '/hablemos' },
];

const socialLinks = [
  { name: 'Instagram', href: '#', ariaLabel: 'Visit DOBLEPAR Instagram profile' },
  { name: 'Behance', href: '#', ariaLabel: 'Visit DOBLEPAR Behance profile' },
  { name: 'LinkedIn', href: '#', ariaLabel: 'Visit DOBLEPAR LinkedIn profile' },
  { name: 'YouTube', href: '#', ariaLabel: 'Visit DOBLEPAR YouTube channel' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const footer = footerRef.current;
      if (!footer) return;

      const ctx = gsap.context(() => {
        // Verificar si el usuario prefiere reducir movimiento
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
          gsap.set(footer, { opacity: 1, y: 0 });
          return;
        }

        // Animación sutil de entrada
        gsap.fromTo(
          footer,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, footer);

      return () => ctx.revert();
    });
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Columna 1 - Marca */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image 
                src="/images/logo.png" 
                alt="DOBLEPAR" 
                width={120} 
                height={40}
              />
            </div>
            <p className={styles.description}>
              Creative and audiovisual studio building distinctive visual universes through storytelling, creative direction, AI, and live-action production—across both physical and digital experiences.
            </p>
          </div>

          {/* Columna 2 - Navegación */}
          <nav className={styles.section} aria-label="Footer main navigation">
            <h4 className={styles.sectionTitle}>Navigate</h4>
            <ul className={styles.linkList}>
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 3 - Redes */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Social</h4>
            <ul className={styles.linkList}>
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contact</h4>
            <ul className={styles.linkList}>
              <li>
                <a 
                  href="mailto:hola@doblepar.com" 
                  className={styles.link}
                  aria-label="Send email to DOBLEPAR"
                >
                  hola@doblepar.com
                </a>
              </li>
              <li>
                <span className={styles.text}>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Franja inferior */}
        <div className={styles.bottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© DOBLEPAR</p>
            <p className={styles.location}>Buenos Aires — Argentina</p>
            <p className={styles.year}>{currentYear}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
