import { Phone } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';
import { toTelHref } from '../utils/menuHelpers';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  return (
    <header className="relative md:sticky md:top-0 z-40 bg-[#0D1B2A]/95 backdrop-blur-md border-b border-[#C59B3B]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand logo + single-line wordmark */}
        <a
          href="#home"
          className="inline-flex items-center gap-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#FAF7F2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DEC073]"
        >
          <BrandLogo size="sm" />
          <span>Samrat Sweets</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#FAF7F2]/85"
        >
          <a
            href="#home"
            className="hover:text-[#DEC073] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#DEC073]/60"
          >
            Home
          </a>
          <a
            href="#signatures"
            className="hover:text-[#DEC073] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#DEC073]/60"
          >
            Signatures
          </a>
          <a
            href="#menu"
            className="hover:text-[#DEC073] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#DEC073]/60"
          >
            Menu
          </a>
          <a
            href="#gallery"
            className="hover:text-[#DEC073] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#DEC073]/60"
          >
            Gallery
          </a>
          <a
            href="#visit"
            className="hover:text-[#DEC073] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#DEC073]/60"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Single primary contact action */}
        <div className="flex items-center shrink-0">
          <a
            href={toTelHref(restaurantInfo.phone)}
            aria-label={`Call ${restaurantInfo.name} at ${restaurantInfo.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg border border-[#C59B3B]/60 text-[#DEC073] hover:bg-[#C59B3B] hover:text-[#0D1B2A] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DEC073]"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
