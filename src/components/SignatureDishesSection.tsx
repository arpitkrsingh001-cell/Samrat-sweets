import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import samratSpecialPizzaImg from '../assets/images/samrat_special_pizza_1794546286968.jpg';
import { GALLERY_ITEMS } from '../data/galleryData';
import { menuCategories } from '../data/menuData';
import {
  formatInrPrice,
  getDietaryType,
  getSignatureDishes,
  hasHalfFullPricing,
} from '../utils/menuHelpers';
import { DietaryIndicator } from './DietaryIndicator';

interface SignatureDishesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

const IMAGE_FOR_CATEGORY: Record<string, string> = {
  'Special Thalis': GALLERY_ITEMS[0].src,
  Pizza: samratSpecialPizzaImg,
  Chinese: GALLERY_ITEMS[2].src,
  'South Indian': GALLERY_ITEMS[3].src,
};

export function SignatureDishesSection({ onSelectCategory }: SignatureDishesSectionProps) {
  const signatures = useMemo(() => getSignatureDishes(menuCategories), []);

  return (
    <section
      id="signatures"
      className="scroll-mt-20 py-10 sm:py-14 bg-[#F3EDE2] border-b border-[#0D1B2A]/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#8A6518] tracking-wide">
              House Signatures
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D1B2A] mt-1">
              Samrat Special Creations
            </h2>
          </div>
          <a
            href="#menu"
            onClick={() => onSelectCategory('all')}
            className="text-sm font-semibold text-[#0D1B2A] hover:text-[#8A6518] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Browse all 21 categories</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {signatures.map(({ categoryName, item }) => {
            const thumbSrc = IMAGE_FOR_CATEGORY[categoryName] ?? GALLERY_ITEMS[0].src;
            const isHalfFull = hasHalfFullPricing(item);

            return (
              <a
                key={`${categoryName}-${item.name}`}
                href="#menu"
                onClick={() => onSelectCategory(categoryName)}
                className="group bg-white rounded-xl border border-[#0D1B2A]/12 hover:border-[#C59B3B] p-4 sm:p-5 flex gap-4 items-center transition-colors shadow-2xs"
              >
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden bg-[#13233B] shrink-0">
                  <img
                    src={thumbSrc}
                    alt={`${item.name} illustrative presentation`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-[#8A6518]">{categoryName}</p>
                  <div className="flex items-start gap-2 mt-0.5">
                    <DietaryIndicator type={getDietaryType(item)} className="mt-[4px]" />
                    <h3 className="font-display text-lg font-bold text-[#0D1B2A] leading-snug">
                      {item.name}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-xs text-[#243B55] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="text-sm font-bold text-[#0D1B2A] tabular-nums">
                      {isHalfFull ? (
                        <span>
                          Half {formatInrPrice(item.half)} · Full {formatInrPrice(item.full)}
                        </span>
                      ) : typeof item.price === 'number' ? (
                        <span>{formatInrPrice(item.price)}</span>
                      ) : null}
                    </div>
                    <span className="text-xs font-semibold text-[#8A6518] group-hover:text-[#0D1B2A] transition-colors shrink-0">
                      View →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
