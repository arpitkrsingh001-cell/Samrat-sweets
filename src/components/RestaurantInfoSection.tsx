import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';
import { toTelHref } from '../utils/menuHelpers';
import { BrandLogo } from './BrandLogo';

export function RestaurantInfoSection() {
  return (
    <section id="visit" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Restaurant Details & Contact */}
        <div className="bg-white border border-[#0D1B2A]/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#8A6518] tracking-wide">
                Restaurant Information &amp; Contact
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mt-2">
                <BrandLogo size="md" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0D1B2A]">
                  {restaurantInfo.name}
                </h2>
              </div>

              <div className="mt-6 space-y-5 divide-y divide-[#0D1B2A]/10">
                <div className="flex items-start gap-3.5 pt-1">
                  <MapPin className="w-5 h-5 text-[#8A6518] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#243B55]">Address</p>
                    <p className="text-base font-medium text-[#0D1B2A] mt-0.5 leading-relaxed">
                      {restaurantInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-5">
                  <Phone className="w-5 h-5 text-[#8A6518] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#243B55]">Phone</p>
                    <a
                      href={toTelHref(restaurantInfo.phone)}
                      className="text-base font-semibold text-[#0D1B2A] hover:text-[#8A6518] transition-colors mt-0.5 inline-block tabular-nums"
                    >
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-5">
                  <Clock className="w-5 h-5 text-[#8A6518] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#243B55]">Opening Hours</p>
                    <p className="text-sm sm:text-base text-[#0D1B2A] mt-0.5 leading-relaxed">
                      Opening hours are not listed on this menu. Please call{' '}
                      <a
                        href={toTelHref(restaurantInfo.phone)}
                        className="font-semibold underline underline-offset-4 decoration-[#C59B3B]"
                      >
                        {restaurantInfo.phone}
                      </a>{' '}
                      to confirm today&rsquo;s dine-in and mithai counter hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="mt-8 pt-6 border-t border-[#0D1B2A]/12 flex flex-col sm:flex-row gap-3.5">
              <a
                href={toTelHref(restaurantInfo.phone)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg bg-[#0D1B2A] hover:bg-[#16283E] text-[#FAF7F2] text-sm sm:text-base font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#DEC073]" aria-hidden="true" />
                <span>Call {restaurantInfo.phone}</span>
              </a>

              <a
                href={restaurantInfo.google_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg bg-[#C59B3B] hover:bg-[#D8AE4D] text-[#0D1B2A] text-sm sm:text-base font-semibold transition-colors"
              >
                <span>Open Google Maps Directions</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}
