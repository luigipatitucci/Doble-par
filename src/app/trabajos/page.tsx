import React from 'react';
import { WorkHero } from '@/components/sections/trabajos/WorkHero/WorkHero';
import { WorksGrid } from '@/components/sections/trabajos/WorksGrid/WorksGrid';

export const metadata = {
  title: 'Trabajos | DOBLEPAR',
  description:
    'Explora nuestros proyectos audiovisuales creados con inteligencia artificial. Universos visuales únicos para marcas y contenidos.',
};

export default function TrabajosPage() {
  return (
    <>
      <WorkHero />
      <WorksGrid />
    </>
  );
}
