import React from 'react';
import { WorkHero } from '@/components/sections/trabajos/WorkHero/WorkHero';
import { WorksGrid } from '@/components/sections/trabajos/WorksGrid/WorksGrid';

export const metadata = {
  title: 'Work | DOBLEPAR',
  description:
    'Explore our audiovisual projects created with artificial intelligence. Unique visual universes for brands and content.',
};

export default function TrabajosPage() {
  return (
    <>
      <WorkHero />
      <WorksGrid />
    </>
  );
}
