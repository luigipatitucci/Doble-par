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
      'We create cinematic visual work through AI and live-action production, exploring new forms of storytelling across physical and digital worlds.',
  },
  {
    id: '02',
    index: '02',
    title: 'Experiences',
    description:
      'We design brand activations and immersive spaces that connect with audiences in memorable ways.',
  },
  {
    id: '03',
    index: '03',
    title: 'Narrative',
    description:
      'We build coherent and expandable narrative universes that transcend platforms and formats.',
  },
  {
    id: '04',
    index: '04',
    title: 'Technology',
    description:
      'We use AI and cutting-edge tools to constantly innovate in our creative processes.',
  },
];
