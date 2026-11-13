import type { DietaryType } from '../types/menu';

interface DietaryIndicatorProps {
  type: DietaryType;
  showLabel?: boolean;
  decorative?: boolean;
  className?: string;
}

/**
 * Standard Indian dietary emblem:
 * - Veg: Green circle inside a green bordered square
 * - Non-Veg: Red circle inside a red bordered square
 */
export function DietaryIndicator({
  type,
  showLabel = false,
  decorative = false,
  className = '',
}: DietaryIndicatorProps) {
  const isVeg = type === 'veg';
  const label = isVeg ? 'Vegetarian' : 'Non-Vegetarian';
  const shortLabel = isVeg ? 'Veg' : 'Non-Veg';

  return (
    <span
      className={`inline-flex items-center gap-1.5 shrink-0 ${className}`}
      title={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative || showLabel ? undefined : label}
      role={decorative || showLabel ? undefined : 'img'}
    >
      <span
        aria-hidden="true"
        className={`w-3.5 h-3.5 rounded-[3px] border-[1.5px] flex items-center justify-center bg-white ${
          isVeg ? 'border-[#15803D]' : 'border-[#B91C1C]'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isVeg ? 'bg-[#15803D]' : 'bg-[#B91C1C]'
          }`}
        />
      </span>
      {showLabel && (
        <span
          className={`text-xs font-semibold ${
            isVeg ? 'text-[#15803D]' : 'text-[#B91C1C]'
          }`}
        >
          {shortLabel}
        </span>
      )}
    </span>
  );
}
