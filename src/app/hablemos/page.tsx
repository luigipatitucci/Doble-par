import React from 'react';
import { ContactHero } from '@/components/sections/hablemos/ContactHero/ContactHero';
import { ContactForm } from '@/components/sections/hablemos/ContactForm/ContactForm';
import { ContactInfo } from '@/components/sections/hablemos/ContactInfo/ContactInfo';

export const metadata = {
  title: 'Hablemos | DOBLEPAR',
  description:
    '¿Tenés una idea? Trabajemos juntos para convertirla en realidad. Contactanos para dar vida a tu próximo proyecto.',
};

export default function HablemosPage() {
  return (
    <>
      <ContactHero />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4xl)' }}>
        <ContactForm />
        <ContactInfo />
      </div>
    </>
  );
}
