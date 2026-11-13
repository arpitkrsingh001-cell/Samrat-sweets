import rawMenuData from './samrat_sweets_menu.json';
import type { MenuData } from '../types/menu';

/**
 * Single source of truth for Samrat Sweets menu and restaurant details.
 * Structured cleanly so Phase 2 features (cart, table state, etc.) can consume
 * the same typed catalog without modifying component architecture.
 */
export const menuData: MenuData = rawMenuData as MenuData;
export const restaurantInfo = menuData.restaurant;
export const menuCategories = menuData.categories;
