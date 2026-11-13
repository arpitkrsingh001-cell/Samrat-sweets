export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  google_maps: string;
}

export type DietaryType = 'veg' | 'non-veg';

export interface MenuItem {
  name: string;
  price?: number;
  half?: number;
  full?: number;
  description?: string;
  dietary?: DietaryType;
}

export interface MenuCategory {
  name: string;
  notes?: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurant: RestaurantInfo;
  currency: string;
  qr_strategy: string;
  ordering_mode: string;
  categories: MenuCategory[];
  phase_1_features: string[];
  excluded_in_phase_1: string[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  categoryLabel: string;
  caption: string;
  featured?: boolean;
}
