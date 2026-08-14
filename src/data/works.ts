import { Work } from '@/types/work';
import { muxVideos, getMuxVideo } from '../lib/muxVideos';

export const works: Work[] = [
  {
    id: '1',
    slug: 'mon-cheri',
    title: 'Fashion Film',
    client: 'Mon Cheri',
    category: 'Fashion Film',
    description: 'Art Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.monCheri),
    fallbackVideo: '/videos/fallback/mon-cheri.mp4',
    orientation: 'landscape',
    year: '2026',
    featured: true,
  },

  {
    id: '2',
    slug: 'frizze-pasion',
    title: 'Social Campaign',
    client: 'Frizze',
    category: 'Social & Digital',
    description: 'Creative Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.frizze1),
    fallbackVideo: '/videos/fallback/frizze-pasion.mp4',
    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '3',
    slug: 'frizze-pasion',
    title: 'Social Campaign',
    client: 'Frizze',
    category: 'Social & Digital',
    description: 'Creative Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.frizze2, 1),

    // ⚠️ PROVISORIO: verificar que este IMG corresponda a Frizze 2
    fallbackVideo: '/videos/fallback/IMG_2329_2.mp4',

    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '4',
    slug: 'kia-tasman',
    title: 'Launch Campaign',
    client: 'KIA Tasman',
    category: 'Commercials',
    description: 'Creative Direction · AI Production',
    ...getMuxVideo(muxVideos.kia),
    fallbackVideo: '/videos/fallback/spot-KIA-Tasman_2.mp4',
    orientation: 'landscape',
    year: '2026',
    featured: false,
  },

  {
    id: '5',
    slug: 'adn',
    title: 'Fashion Film',
    client: 'ADN',
    category: 'Fashion Film',
    description: 'Art Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.adn),
    fallbackVideo: '/videos/fallback/ADN.mp4',
    orientation: 'landscape',
    year: '2026',
    featured: false,
  },

  {
    id: '6',
    slug: 'Frizze',
    title: 'Social Campaign',
    client: 'Frizze',
    category: 'Social & Digital',
    description: 'Creative Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.frizze3),

    // ⚠️ PROVISORIO: verificar que este IMG corresponda a Frizze 3
    fallbackVideo: '/videos/fallback/IMG_2327_2.mp4',

    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '7',
    slug: 'crunch-fantasia',
    title: 'Product Launch',
    client: 'Crunch',
    category: 'Commercials',
    description:
      'Brand Direction · Art Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.crunch),
    fallbackVideo: '/videos/fallback/crunch-fantasia1.mp4',
    orientation: 'landscape',
    year: '2026',
    featured: false,
  },

  {
    id: '8',
    slug: 'Frizze',
    title: 'Social Campaign',
    client: 'Frizze',
    category: 'Social & Digital',
    description: 'Creative Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.frizze4),

    // ⚠️ PROVISORIO: verificar que este IMG corresponda a Frizze 4
    fallbackVideo: '/videos/fallback/IMG_2328_2.mp4',

    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '9',
    slug: 'sur-content',
    title: 'Product Launch',
    client: 'SUR',
    category: 'Commercials',
    description: 'Brand Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.sur),
    fallbackVideo: '/videos/fallback/SUR_1.mp4',
    orientation: 'landscape',
    year: '2026',
    featured: false,
  },

  {
    id: '10',
    slug: 'GO!',
    title: 'Social Campaign',
    client: 'GO!',
    category: 'Social & Digital',
    description: 'Creative Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.go),
    fallbackVideo: '/videos/fallback/Go-Fitness_2.mp4',
    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '11',
    slug: 'un-viaje-de-pasion',
    title: 'Narrative Film',
    client: 'Un viaje de Pasión',
    category: 'Narrative Films',
    description: 'Creative Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.mundial),

    // ⚠️ PROVISORIO: verificar que este IMG sea "Un viaje de Pasión"
    fallbackVideo: '/videos/fallback/IMG_2370_1.mp4',

    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '14',
    slug: 'sour-maison',
    title: 'Fashion Film',
    client: 'Sour Maison',
    category: 'Fashion Film',
    description: 'Art Direction · AI Production · Post-Production',
    ...getMuxVideo(muxVideos.sour),
    fallbackVideo: '/videos/fallback/sour-maison.mp4',
    orientation: 'portrait',
    year: '2026',
    featured: false,
  },

  {
    id: '15',
    slug: 'la-esquinita',
    title: 'Fashion Film',
    client: 'LA ESQUINITA',
    category: 'Experiences',
    description:
      'Cultural Events · Art Curation · Technology · Creative Production',
    ...getMuxVideo(muxVideos.esquinita),

    // ⚠️ Falta identificar/agregar el MP4 correspondiente a La Esquinita

    orientation: 'portrait',
    year: '2026',
    featured: false,
  },
];