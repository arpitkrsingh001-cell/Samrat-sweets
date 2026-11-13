import heroRoyalThaliImg from '../assets/images/hero_royal_thali_1794540589304.jpg';
import artisanSweetsImg from '../assets/images/gallery_artisan_sweets_1794540589665.jpg';
import tandooriPlatterImg from '../assets/images/gallery_tandoori_platter_1794540589701.jpg';
import southIndianDosaImg from '../assets/images/gallery_south_indian_dosa_1794540590204.jpg';
import chaatTraditionalImg from '../assets/images/gallery_chaat_traditional_1794540591408.jpg';
import type { GalleryPhoto } from '../types/menu';

export const HERO_FOOD_IMAGE = {
  src: heroRoyalThaliImg,
  alt: 'Illustrative North Indian royal vegetarian thali featuring paneer makhani, dal makhni, jeera rice, butter naan, raita, and gulab jamun',
};

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'royal-thali',
    src: heroRoyalThaliImg,
    alt: 'Illustrative North Indian vegetarian thali served on brassware with curries, naan, rice, raita, and gulab jamun',
    title: 'Samrat Special Thali Inspiration',
    categoryLabel: 'Special Thalis',
    caption: 'Illustrative presentation featuring paneer curry, dal makhni, jeera rice, butter naan, raita, and sweet.',
    featured: true,
  },
  {
    id: 'artisan-sweets',
    src: artisanSweetsImg,
    alt: 'Illustrative Indian mithai platter with gulab jamun, saffron rasmalai, and crisp jalebi',
    title: 'Traditional Mithai & Desserts',
    categoryLabel: 'Desserts',
    caption: 'Illustrative presentation of Desi Ghee Gulab Jamun, Rasmalai, and crisp golden Jalebi.',
  },
  {
    id: 'tandoori-platter',
    src: tandooriPlatterImg,
    alt: 'Illustrative charred paneer tikka and malai soya chaap skewers with mint chutney',
    title: 'Tandoori Starters & Kebabs',
    categoryLabel: 'Starters',
    caption: 'Illustrative presentation of Paneer Tikka and Malai Soya Chap served with fresh mint chutney.',
  },
  {
    id: 'south-indian',
    src: southIndianDosaImg,
    alt: 'Illustrative crispy masala dosa alongside steamed idli, medu vada, sambar, and chutneys',
    title: 'South Indian Classics',
    categoryLabel: 'South Indian',
    caption: 'Illustrative presentation of crispy Masala Dosa, Idli Sambar, and Sambar Vada.',
  },
  {
    id: 'chaat-bhature',
    src: chaatTraditionalImg,
    alt: 'Illustrative North Indian chole bhature and topped raj kachori chaat in brass bowls',
    title: 'Chaat & Traditional Indian',
    categoryLabel: 'Chaat & Traditional',
    caption: 'Illustrative presentation of Cholle Bhature and Raj Kachori garnished with yogurt and pomegranate.',
  },
];
