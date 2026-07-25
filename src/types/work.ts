export type WorkOrientation = 'landscape' | 'portrait' | 'square';

export type WorkCategory = 'Commercials' | 'Brand Films' | 'Social & Digital' | 'Experiences' | 'Narrative Films';

export interface Work {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: WorkCategory;
  description: string;
  video: string;
  poster: string; // 🔥 Required field for thumbnail
  orientation: WorkOrientation;
  year: string;
  featured: boolean;
}
