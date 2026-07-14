import React from 'react';
import { ContactHero } from '@/components/sections/hablemos/ContactHero/ContactHero';
import { ContactForm } from '@/components/sections/hablemos/ContactForm/ContactForm';
import { ContactInfo } from '@/components/sections/hablemos/ContactInfo/ContactInfo';

export const metadata = {
  title: "Let's Talk | DOBLEPAR",
  description:
    "Got an idea? Let's work together to make it real. Contact us to bring your next project to life.",
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
