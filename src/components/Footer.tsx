import { restaurantInfo } from '../data/menuData';
import { toTelHref } from '../utils/menuHelpers';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="bg-[#091320] text-[#FAF7F2] border-t border-[#C59B3B]/25 pt-10 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <BrandLogo size="sm" />
          <div>
            <p className="font-display text-xl font-bold text-[#FAF7F2]">{restaurantInfo.name}</p>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 mt-1">{restaurantInfo.address}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#FAF7F2]/85">
          <a
            href={toTelHref(restaurantInfo.phone)}
            className="hover:text-[#DEC073] transition-colors tabular-nums"
          >
            {restaurantInfo.phone}
          </a>
          <span aria-hidden="true" className="text-[#C59B3B]/60">
            ·
          </span>
          <a
            href={restaurantInfo.google_maps}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DEC073] transition-colors"
          >
            Google Maps
          </a>
          <span aria-hidden="true" className="text-[#C59B3B]/60">
            ·
          </span>
          <a href="#menu" className="hover:text-[#DEC073] transition-colors">
            Digital Menu
          </a>
        </div>
      </div>
    </footer>
  );
}
