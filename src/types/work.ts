export type WorkOrientation = 'landscape' | 'portrait' | 'square';

export type WorkCategory = 'Commercials' | 'Fashion Film' | 'Social & Digital' | 'Experiences' | 'Narrative Films';

export type WorkGroup = 'New Work' | 'Brands & Agencies';

export interface Work {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;

  // Video
  muxPlaybackId: string;
  poster: string;
  fallbackVideo?: string;

  // Layout
  orientation: 'landscape' | 'portrait' | 'square';

  year: string;
  featured: boolean;

  // Agrupación principal
  workGroup: WorkGroup;
}
