import type { DietaryType, MenuCategory, MenuData, MenuItem } from '../types/menu';

/**
 * Formats an INR price faithfully:
 * - Whole numbers display without trailing decimals (e.g. 120 -> "₹120")
 * - Fractional numbers display with two decimal places (e.g. 19.05 -> "₹19.05", 61.9 -> "₹61.90")
 */
export function formatInrPrice(amount: number): string {
  if (Number.isInteger(amount)) {
    return `₹${amount}`;
  }
  return `₹${amount.toFixed(2)}`;
}

/**
 * Normalizes a category name into a URL-safe anchor slug.
 */
export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Determines whether a menu item has Half and Full pricing variants.
 */
export function hasHalfFullPricing(item: MenuItem): item is MenuItem & { half: number; full: number } {
  return typeof item.half === 'number' && typeof item.full === 'number';
}

/**
 * Counts total menu items across all provided categories.
 */
export function getTotalItemCount(categories: MenuCategory[]): number {
  return categories.reduce((sum, category) => sum + category.items.length, 0);
}

export type DietaryFilter = 'all' | DietaryType;

/**
 * Filters menu categories by optional selected category, search query, and dietary choice.
 * Search matches dish name, description, or category name (case-insensitive).
 */
export function filterMenuCategories(
  categories: MenuCategory[],
  options: {
    selectedCategory: string;
    searchQuery: string;
    dietaryFilter?: DietaryFilter;
  }
): MenuCategory[] {
  const { selectedCategory, searchQuery, dietaryFilter = 'all' } = options;
  const trimmedQuery = searchQuery.trim().toLowerCase();

  const categoryScoped =
    selectedCategory === 'all'
      ? categories
      : categories.filter((category) => category.name === selectedCategory);

  if (!trimmedQuery && dietaryFilter === 'all') {
    return categoryScoped;
  }

  return categoryScoped
    .map((category) => {
      const categoryMatches = trimmedQuery ? category.name.toLowerCase().includes(trimmedQuery) : false;

      const matchingItems = category.items.filter((item) => {
        if (dietaryFilter !== 'all' && getDietaryType(item) !== dietaryFilter) {
          return false;
        }
        if (!trimmedQuery || categoryMatches) {
          return true;
        }
        const nameMatch = item.name.toLowerCase().includes(trimmedQuery);
        const descMatch = item.description ? item.description.toLowerCase().includes(trimmedQuery) : false;
        return nameMatch || descMatch;
      });

      return {
        ...category,
        items: matchingItems,
      };
    })
    .filter((category) => category.items.length > 0);
}

/**
 * Converts a formatted phone string like "+91 85868 89025" into a valid tel: href ("tel:+918586889025").
 */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

/**
 * Validates that the loaded menu dataset contains all expected structural fields.
 */
export function validateMenuDataShape(data: MenuData): {
  valid: boolean;
  categoryCount: number;
  itemCount: number;
} {
  const categoryCount = Array.isArray(data.categories) ? data.categories.length : 0;
  const itemCount = categoryCount > 0 ? getTotalItemCount(data.categories) : 0;
  const valid =
    Boolean(data.restaurant?.name) &&
    Boolean(data.restaurant?.address) &&
    Boolean(data.restaurant?.phone) &&
    Boolean(data.restaurant?.google_maps) &&
    categoryCount === 21 &&
    itemCount > 0;

  return { valid, categoryCount, itemCount };
}

export interface SignatureDishEntry {
  categoryName: string;
  item: MenuItem;
}

/**
 * Extracts all dishes explicitly carrying the Samrat house signature name
 * directly from the single-source-of-truth menu categories.
 */
export function getSignatureDishes(categories: MenuCategory[]): SignatureDishEntry[] {
  const results: SignatureDishEntry[] = [];
  for (const category of categories) {
    for (const item of category.items) {
      if (item.name.toLowerCase().includes('samrat')) {
        results.push({
          categoryName: category.name,
          item,
        });
      }
    }
  }
  return results;
}

export interface TextHighlightSegment {
  text: string;
  matched: boolean;
}

/**
 * Splits text into non-overlapping segments for safe search highlighting,
 * escaping regex metacharacters and matching case-insensitively.
 */
export function splitTextByQuery(text: string, query: string): TextHighlightSegment[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [{ text, matched: false }];
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  const lowerTrimmed = trimmed.toLowerCase();
  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      matched: part.toLowerCase() === lowerTrimmed,
    }));
}

const NON_VEG_PATTERN =
  /\b(chicken|mutton|lamb|goat|fish|prawns?|shrimp|crab|seafood|eggs?|omelette|keema|meat|non[- ]veg|bacon|ham|pepperoni|pork|beef)\b/i;

/**
 * Determines whether a menu item is Vegetarian or Non-Vegetarian.
 * Honors explicit item.dietary metadata if supplied, otherwise inspects
 * item name and description with word-boundary matching.
 */
export function getDietaryType(item: MenuItem): DietaryType {
  if (item.dietary === 'veg' || item.dietary === 'non-veg') {
    return item.dietary;
  }

  const combinedText = item.description ? `${item.name} ${item.description}` : item.name;
  return NON_VEG_PATTERN.test(combinedText) ? 'non-veg' : 'veg';
}
