export type VideoOrientation = 'horizontal' | 'vertical';

export type WorkCategory = 'Audiovisual' | 'Branding' | 'Experiencias' | 'IA' | 'Narrativa';

export interface Work {
  id: string;
  title: string;
  client: string;
  category: WorkCategory;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  orientation: VideoOrientation;
  year: number;
}
