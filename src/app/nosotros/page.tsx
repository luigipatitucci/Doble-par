import React from 'react';
import { AboutHero } from '@/components/sections/nosotros/AboutHero/AboutHero';
import { ManifestoBlock } from '@/components/sections/nosotros/ManifestoBlock/ManifestoBlock';
import { PhilosophySection } from '@/components/sections/nosotros/PhilosophySection/PhilosophySection';

export const metadata = {
  title: 'Nosotros | DOBLEPAR',
  description:
    'Convertimos ideas en universos coexistentes. Conocé nuestra filosofía, manifiesto y forma de trabajo.',
};

export default function NosotrosPage() {
  return (
    <>
      <AboutHero />
      <ManifestoBlock />
      <PhilosophySection />
    </>
  );
}
