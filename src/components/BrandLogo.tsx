interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'h-9 w-[66px] rounded-md',
  md: 'h-11 w-[81px] rounded-lg',
  lg: 'h-14 w-[103px] rounded-lg',
};

/**
 * Renders the official Samrat Sweets signboard emblem cropped cleanly from the
 * uploaded storefront brand logo asset.
 */
export function BrandLogo({ size = 'sm', className = '' }: BrandLogoProps) {
  return (
    <span
      className={`relative block overflow-hidden aspect-[221/120] shrink-0 border border-[#C59B3B]/60 bg-[#C8232C] shadow-xs ${SIZE_CLASSES[size]} ${className}`}
    >
      <img
        src="/assets/aistudio/Screenshot_20261113-102756_be949dc4.png"
        alt="Samrat Sweets logo"
        className="absolute max-w-none w-[162.9%] h-auto -left-[22.2%] -top-[160.8%] select-none pointer-events-none"
      />
    </span>
  );
}
