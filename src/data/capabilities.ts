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
      'Cinematic content, powered by AI and live-action — built to move across every format.',
  },
  {
    id: '02',
    index: '02',
    title: 'Experiences',
    description:
      'Brand activations and immersive spaces designed to turn audiences into community.',
  },
  {
    id: '03',
    index: '03',
    title: 'Branding & Narrative',
    description:
      'One brand story, told coherently — across every platform, every format, every touchpoint.',
  },
  {
    id: '04',
    index: '04',
    title: 'Technology',
    description:
      'AI and emerging tech, applied with strategy — not novelty for its own sake.',
  },
];
