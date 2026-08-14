import React from 'react';
import { AboutHero } from '@/components/sections/nosotros/AboutHero/AboutHero';
import { ManifestoBlock } from '@/components/sections/nosotros/ManifestoBlock/ManifestoBlock';
import { AboutSection } from '@/components/sections/nosotros/AboutSection/AboutSection';
import { PhilosophySection } from '@/components/sections/nosotros/PhilosophySection/PhilosophySection';

export const metadata = {
  title: 'Studio | DOBLEPAR',
  description:
    'We turn ideas into coexisting universes. Learn about our philosophy, manifesto and way of working.',
};

export default function NosotrosPage() {
  return (
    <>
      <AboutHero />
      <ManifestoBlock />
      <AboutSection />
      <PhilosophySection />
    </>
  );
}
