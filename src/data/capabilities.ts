export interface Capability {
  id: string;
  index: string;
  title: string;
  description: string;
}

export const capabilities: Capability[] = [
  {
    id: '01',
    index: '01',
    title: 'Film & Visual',
    description:
      'We create cinematic visual pieces with artificial intelligence, exploring new forms of narrative.',
  },
  {
    id: '02',
    index: '02',
    title: 'Experiences',
    description:
      'We design activations and immersive spaces that connect brands with audiences.',
  },
  {
    id: '03',
    index: '03',
    title: 'Narrative',
    description:
      'We build coherent narrative universes capable of expanding across platforms and formats.',
  },
  {
    id: '04',
    index: '04',
    title: 'Technology',
    description:
      'We integrate artificial intelligence and emerging tools within the creative process.',
  },
];
