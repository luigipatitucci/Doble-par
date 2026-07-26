'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './FoundersBlock.module.css';

export const FoundersBlock: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const label = labelRef.current;
      const paragraphs = paragraphsRef.current.filter(
        (paragraph): paragraph is HTMLParagraphElement => Boolean(paragraph)
      );

      if (!section || !label || paragraphs.length === 0) return;

      const ctx = gsap.context(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
          gsap.set([label, ...paragraphs], { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          label,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );

        paragraphs.forEach((paragraph, index) => {
          gsap.fromTo(
            paragraph,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.08,
              scrollTrigger: {
                trigger: paragraph,
                start: 'top 90%',
                end: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }, section);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.founders}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span ref={labelRef} className={styles.label}>
            ABOUT
          </span>

          <div className={styles.text}>
            <p ref={(el) => {
              paragraphsRef.current[0] = el;
            }}>
              DOBLEPAR was founded by Memi Merlino and Delfina Coelho, after years of working across advertising, cinema, short films, feature films, audiovisual production, creative direction, branded content, technology, and experiences.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[1] = el;
            }}>
              Before becoming DOBLEPAR, our paths were shaped by collaborations with agencies including GREY, Ogilvy, Leo Burnett, GUT, and Johannes Leonardo, as well as production companies such as Argentina Cine and Virgen Films.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[2] = el;
            }}>
              Throughout that journey, we developed projects for brands including Corona, Bank of America, Mercado Libre, PedidosYa, Sanofi, Arcor, Amazon, PepsiCo, Grupo Peñaflor, Frizzé, Bierhaus, KIA, Galicia, JanSport, YPF, Noblex, and many others.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[3] = el;
            }}>
              Our experience across agencies, brands, production companies, and film taught us that the strongest ideas are never created in isolation. They emerge when strategy, creativity, narrative, production, technology, and execution move in the same direction.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[4] = el;
            }}>
              <strong>That belief became DOBLEPAR.</strong>
            </p>
            <p ref={(el) => {
              paragraphsRef.current[5] = el;
            }}>
              Founded by Memi Merlino, Co-Founder and Creative &amp; Commercial Producer, and Delfina Coelho, Co-Founder, Creative Director and Audiovisual Producer, DOBLEPAR brings together two complementary perspectives: the ability to transform an idea into an opportunity, and the creative and production vision needed to bring it to life.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[6] = el;
            }}>
              We see brands as <strong>evolving ecosystems</strong> &mdash; and every ecosystem needs direction.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[7] = el;
            }}>
              DOBLEPAR brings branding, communication, and full creative direction together with content production, audiovisual storytelling, experiences, technology, and community, allowing every part to expand as one living universe.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[8] = el;
            }}>
              We do not build isolated pieces. <strong>We curate and build brand universes.</strong>
            </p>
            <p ref={(el) => {
              paragraphsRef.current[9] = el;
            }}>
              From digital content, advertising, and film to experiences, narratives, and technology, every discipline works together to keep one living story alive.
            </p>
            <p ref={(el) => {
              paragraphsRef.current[10] = el;
            }}>
              Every project is a chance to bring order to the chaos &mdash; creating sharper brand universes, stories that continue to evolve, and communication that goes beyond the expected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
