import { useState } from 'react';
import { ArrowDown, ArrowRight, MapPin, UtensilsCrossed } from 'lucide-react';
import { HERO_FOOD_IMAGE } from '../data/galleryData';
import { menuCategories, restaurantInfo } from '../data/menuData';
import { getTotalItemCount } from '../utils/menuHelpers';
import { BrandLogo } from './BrandLogo';

interface HeroSectionProps {
  onQuickSelectCategory: (categoryName: string) => void;
}

const QUICK_HIGHLIGHTS = [
  {
    category: 'Special Thalis',
    subtitle: 'Eco & Samrat SPL Thalis',
  },
  {
    category: 'Indian Specialities',
    subtitle: '24 Curries · Half & Full',
  },
  {
    category: 'Desserts',
    subtitle: 'Desi Ghee Mithai & Halwa',
  },
  {
    category: 'South Indian',
    subtitle: 'Dosa, Idli & Uttapam',
  },
];

export function HeroSection({ onQuickSelectCategory }: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const totalCategories = menuCategories.length;
  const totalDishes = getTotalItemCount(menuCategories);

  return (
    <section
      id="home"
      className="scroll-mt-20 relative overflow-hidden bg-[#0A1628] text-[#FAF7F2] border-b border-[#C59B3B]/30"
    >
      {/* Subtle warm radial brass ambiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[#C59B3B]/10 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left column: Editorial Branding, Headline, Tagline, Primary CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3.5">
              <BrandLogo size="md" />
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#DEC073] flex flex-wrap items-center gap-2">
                <span>IMT Manesar</span>
                <span aria-hidden="true">·</span>
                <span>Gurugram, Haryana</span>
                <span aria-hidden="true">·</span>
                <span>{totalCategories} Categories</span>
              </p>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-[#FAF7F2] mt-4 text-balance">
              Welcome to Samrat Sweets
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[#C59B3B]/70" />
              <p className="font-display italic text-xl sm:text-2xl text-[#DEC073]">
                Delicious Taste, Memorable Moments
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed mt-5 max-w-xl">
              Explore all {totalDishes} freshly prepared dishes across our dine-in menu—from royal thalis and North Indian curries to crispy dosas, chaat, and traditional sweets—then share your selection verbally with your waiter.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-lg bg-[#C59B3B] hover:bg-[#D8AE4D] text-[#0A1628] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DEC073]"
              >
                <span>Explore Our Menu</span>
                <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={restaurantInfo.google_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 min-h-[48px] rounded-lg border border-[#FAF7F2]/20 hover:border-[#DEC073]/60 text-sm font-medium text-[#FAF7F2]/90 hover:text-[#DEC073] transition-colors whitespace-nowrap shrink-0"
              >
                <MapPin className="w-4 h-4 shrink-0 text-[#DEC073]" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right column: Clean framed food showcase */}
          <div className="lg:col-span-6">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#C59B3B]/40 bg-[#13233B] shadow-2xl aspect-[16/10] lg:aspect-[4/3]">
              {!imageFailed ? (
                <img
                  src={HERO_FOOD_IMAGE.src}
                  alt={HERO_FOOD_IMAGE.alt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#13233B] to-[#0A1628]">
                  <UtensilsCrossed className="w-10 h-10 text-[#DEC073] mb-3" aria-hidden="true" />
                  <p className="font-display text-xl text-[#FAF7F2]">Samrat Sweets</p>
                  <p className="text-sm text-[#FAF7F2]/70 mt-1">North Indian Kitchen &amp; Traditional Mithai</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Quick-Jump Category Strip below Hero */}
        <div className="mt-10 pt-7 border-t border-[#C59B3B]/20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {QUICK_HIGHLIGHTS.map((highlight) => (
            <a
              key={highlight.category}
              href="#menu"
              onClick={() => onQuickSelectCategory(highlight.category)}
              className="group rounded-xl bg-[#13233B]/80 hover:bg-[#192D4B] border border-[#C59B3B]/25 hover:border-[#DEC073]/60 p-3.5 sm:p-4 transition-colors flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="font-display text-base sm:text-lg font-semibold text-[#FAF7F2] group-hover:text-[#DEC073] transition-colors truncate">
                  {highlight.category}
                </p>
                <p className="text-xs text-[#FAF7F2]/70 mt-0.5 truncate">
                  {highlight.subtitle}
                </p>
              </div>
              <ArrowRight
                className="w-4 h-4 text-[#DEC073] shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
