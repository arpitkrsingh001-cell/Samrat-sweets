import { ChevronLeft, ChevronRight, UtensilsCrossed, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GALLERY_ITEMS } from '../data/galleryData';
import type { GalleryPhoto } from '../types/menu';

function GalleryCard({
  item,
  onSelect,
  featured = false,
}: {
  item: GalleryPhoto;
  onSelect: (photo: GalleryPhoto) => void;
  featured?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={`Preview ${item.title}`}
      className={`group relative text-left w-full rounded-2xl overflow-hidden bg-[#13233B] border border-[#0D1B2A]/15 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D1B2A] ${
        featured ? 'h-full min-h-[280px]' : 'aspect-[4/3]'
      }`}
    >
      {!failed ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#FAF7F2]">
          <UtensilsCrossed className="w-8 h-8 text-[#DEC073] mb-2" aria-hidden="true" />
          <span className="font-display text-lg">{item.title}</span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/60 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-[11px] font-semibold text-[#DEC073]">{item.categoryLabel}</p>
        <h3
          className={`font-display font-bold text-[#FAF7F2] mt-0.5 ${
            featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          }`}
        >
          {item.title}
        </h3>
        {featured && (
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 mt-1 max-w-lg line-clamp-2">
            {item.caption}
          </p>
        )}
      </div>
    </button>
  );
}

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  const featuredItem = GALLERY_ITEMS[0];
  const gridItems = GALLERY_ITEMS.slice(1);

  return (
    <section
      id="gallery"
      className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[#F3EDE2] border-y border-[#0D1B2A]/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#8A6518] tracking-wide">
              Culinary Gallery
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0D1B2A] mt-1 text-balance">
              Flavours from Our Kitchen &amp; Mithai Counter
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#243B55] max-w-md leading-relaxed">
            Illustrative dish presentations inspired by our menu specialties rather than actual photographs of our dining hall.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <div className="lg:col-span-6">
            <GalleryCard item={featuredItem} onSelect={() => setSelectedIndex(0)} featured />
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {gridItems.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedIndex(idx + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Prev/Next */}
      {selectedPhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="fixed inset-0 z-50 bg-[#0A1628]/88 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-[#C59B3B]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#13233B]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                referrerPolicy="no-referrer"
                className="w-full max-h-[65vh] object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close image preview"
                className="absolute top-3 right-3 min-w-[44px] min-h-[44px] rounded-full bg-[#0A1628]/85 text-[#FAF7F2] hover:bg-[#0A1628] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
                }
                aria-label="Previous dish image"
                className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-[#0A1628]/80 text-[#FAF7F2] hover:bg-[#0A1628] flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedIndex((selectedIndex + 1) % GALLERY_ITEMS.length)}
                aria-label="Next dish image"
                className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-[#0A1628]/80 text-[#FAF7F2] hover:bg-[#0A1628] flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold text-[#8A6518]">
                {selectedPhoto.categoryLabel}
              </p>
              <h3
                id="gallery-modal-title"
                className="font-display text-2xl font-bold text-[#0D1B2A] mt-1"
              >
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-[#243B55] mt-2 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
