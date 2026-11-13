import { Clock, LayoutGrid, RotateCcw, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { menuCategories } from '../data/menuData';
import type { MenuItem } from '../types/menu';
import {
  type DietaryFilter,
  filterMenuCategories,
  formatInrPrice,
  getDietaryType,
  getTotalItemCount,
  hasHalfFullPricing,
  slugifyCategory,
  splitTextByQuery,
} from '../utils/menuHelpers';
import { DietaryIndicator } from './DietaryIndicator';

interface MenuSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const segments = splitTextByQuery(text, query);

  return (
    <>
      {segments.map((segment, index) =>
        segment.matched ? (
          <mark
            key={`${index}-${segment.text}`}
            className="bg-[#C59B3B]/30 text-[#0D1B2A] rounded-xs px-0.5 font-semibold"
          >
            {segment.text}
          </mark>
        ) : (
          <span key={`${index}-${segment.text}`}>{segment.text}</span>
        )
      )}
    </>
  );
}

function MenuItemRow({ item, searchQuery }: { item: MenuItem; searchQuery: string }) {
  const isHalfFull = hasHalfFullPricing(item);
  const dietaryType = getDietaryType(item);

  return (
    <div className="py-4 border-b border-[#0D1B2A]/10 flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1 flex items-start gap-2.5">
        <DietaryIndicator type={dietaryType} className="mt-[4px]" />
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-[#0D1B2A] leading-snug">
            <HighlightedText text={item.name} query={searchQuery} />
          </h4>
          {item.description && (
            <p className="text-xs sm:text-sm text-[#243B55] mt-1 leading-relaxed">
              <HighlightedText text={item.description} query={searchQuery} />
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right tabular-nums">
        {isHalfFull ? (
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div>
              <span className="block text-[11px] font-medium text-[#243B55] leading-none">
                Half
              </span>
              <span className="block text-sm sm:text-base font-semibold text-[#0D1B2A] mt-1">
                {formatInrPrice(item.half)}
              </span>
            </div>
            <div className="pl-3.5 sm:pl-5 border-l border-[#0D1B2A]/12">
              <span className="block text-[11px] font-medium text-[#8A6518] leading-none">
                Full
              </span>
              <span className="block text-sm sm:text-base font-bold text-[#0D1B2A] mt-1">
                {formatInrPrice(item.full)}
              </span>
            </div>
          </div>
        ) : typeof item.price === 'number' ? (
          <span className="text-base font-bold text-[#0D1B2A]">
            {formatInrPrice(item.price)}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function MenuSection({ selectedCategory, onSelectCategory }: MenuSectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [mobileSheetOpen, setMobileSheetOpen] = useState<boolean>(false);

  const totalDishesCount = useMemo(() => getTotalItemCount(menuCategories), []);

  const filteredCategories = useMemo(
    () =>
      filterMenuCategories(menuCategories, {
        selectedCategory,
        searchQuery,
        dietaryFilter,
      }),
    [selectedCategory, searchQuery, dietaryFilter]
  );

  const visibleDishesCount = useMemo(
    () => getTotalItemCount(filteredCategories),
    [filteredCategories]
  );

  const isFiltered =
    selectedCategory !== 'all' || searchQuery.trim().length > 0 || dietaryFilter !== 'all';

  const handleReset = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setDietaryFilter('all');
  };

  useEffect(() => {
    if (!mobileSheetOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSheetOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileSheetOpen]);

  return (
    <section id="menu" className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#0D1B2A]/12">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#8A6518] tracking-wide">
              Digital Menu · {menuCategories.length} Categories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0D1B2A] mt-1 text-balance">
              Explore Our Dishes &amp; Prices
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#243B55] max-w-md">
            All prices in INR (₹). When ready, simply share your chosen dishes verbally with your waiter.
          </p>
        </div>

        {/* Desktop 2-Column Sidebar + Menu Layout; Mobile Stacked + Category Drawer */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sticky Category Index */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 bg-white border border-[#0D1B2A]/12 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#0D1B2A]/10">
              <h3 className="font-display text-lg font-bold text-[#0D1B2A]">Categories</h3>
              <span className="text-xs font-medium text-[#8A6518] tabular-nums">
                {menuCategories.length} total
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Desktop menu categories"
              className="space-y-0.5 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => onSelectCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between gap-2 transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#0D1B2A] text-[#FAF7F2]'
                    : 'text-[#0D1B2A] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>All Categories</span>
                <span
                  className={`text-xs tabular-nums ${
                    selectedCategory === 'all' ? 'text-[#DEC073]' : 'text-[#243B55]/75'
                  }`}
                >
                  {totalDishesCount}
                </span>
              </button>

              {menuCategories.map((category) => {
                const isSelected = selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`${category.name} (${category.items.length} items)`}
                    onClick={() => onSelectCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between gap-2 transition-colors ${
                      isSelected
                        ? 'bg-[#0D1B2A] text-[#FAF7F2]'
                        : 'text-[#0D1B2A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className="truncate">{category.name}</span>
                    <span
                      aria-hidden="true"
                      className={`text-xs tabular-nums shrink-0 ${
                        isSelected ? 'text-[#DEC073]' : 'text-[#243B55]/70'
                      }`}
                    >
                      {category.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Menu Canvas */}
          <div className="lg:col-span-9 min-w-0">
            {/* Search & Mobile Category Selector Bar */}
            <div id="menu-controls" className="scroll-mt-20 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Dish Search Field */}
                <div className="relative flex-1">
                  <label htmlFor="menu-search" className="sr-only">
                    Search dishes across all menu categories
                  </label>
                  <Search
                    className="w-4 h-4 text-[#243B55] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="menu-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes (e.g. Paneer, Dosa, Thali)"
                    className="w-full min-h-[46px] pl-10 pr-10 py-2.5 rounded-lg bg-white border border-[#0D1B2A]/18 text-sm sm:text-base text-[#0D1B2A] placeholder:text-[#243B55]/60 focus:outline-none focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#C59B3B]/40"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                      className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-[#243B55] hover:text-[#0D1B2A] hover:bg-[#FAF7F2]"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Mobile All-21-Categories Sheet Trigger */}
                <button
                  type="button"
                  onClick={() => setMobileSheetOpen(true)}
                  className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[46px] rounded-lg bg-[#0D1B2A] text-[#FAF7F2] text-sm font-semibold whitespace-nowrap shrink-0"
                >
                  <LayoutGrid className="w-4 h-4 text-[#DEC073]" aria-hidden="true" />
                  <span>
                    {selectedCategory === 'all' ? 'All 21 Categories' : selectedCategory}
                  </span>
                </button>
              </div>

              {/* Mobile Horizontal Scrollable Category Tabs */}
              <div
                role="tablist"
                aria-label="Menu categories"
                className="lg:hidden flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'all'}
                  onClick={() => onSelectCategory('all')}
                  className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                    selectedCategory === 'all'
                      ? 'bg-[#0D1B2A] text-[#FAF7F2] border-[#0D1B2A]'
                      : 'bg-white text-[#0D1B2A] border-[#0D1B2A]/15'
                  }`}
                >
                  All ({menuCategories.length})
                </button>

                {menuCategories.map((category) => {
                  const isSelected = selectedCategory === category.name;
                  return (
                    <button
                      key={category.name}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`${category.name} (${category.items.length} items)`}
                      onClick={() => onSelectCategory(category.name)}
                      className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                        isSelected
                          ? 'bg-[#0D1B2A] text-[#FAF7F2] border-[#0D1B2A]'
                          : 'bg-white text-[#0D1B2A] border-[#0D1B2A]/15'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span
                        aria-hidden="true"
                        className={`ml-1.5 text-[11px] tabular-nums ${
                          isSelected ? 'text-[#DEC073]' : 'text-[#243B55]/70'
                        }`}
                      >
                        {category.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filter Summary & Dietary Filter Toggle */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#243B55]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                <p className="tabular-nums">
                  Showing <span className="font-semibold text-[#0D1B2A]">{visibleDishesCount}</span>{' '}
                  {visibleDishesCount === 1 ? 'dish' : 'dishes'} across{' '}
                  <span className="font-semibold text-[#0D1B2A]">{filteredCategories.length}</span>{' '}
                  {filteredCategories.length === 1 ? 'category' : 'categories'}
                </p>

                <div
                  role="group"
                  aria-label="Filter by dietary preference"
                  className="inline-flex items-center rounded-lg bg-white border border-[#0D1B2A]/15 p-1 gap-1"
                >
                  <button
                    type="button"
                    aria-pressed={dietaryFilter === 'all'}
                    onClick={() => setDietaryFilter('all')}
                    className={`min-h-[36px] px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      dietaryFilter === 'all'
                        ? 'bg-[#0D1B2A] text-[#FAF7F2]'
                        : 'text-[#243B55] hover:text-[#0D1B2A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    aria-pressed={dietaryFilter === 'veg'}
                    onClick={() => setDietaryFilter('veg')}
                    className={`min-h-[36px] px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                      dietaryFilter === 'veg'
                        ? 'bg-[#15803D]/12 text-[#14532D] ring-1 ring-[#15803D]/40'
                        : 'text-[#243B55] hover:text-[#0D1B2A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <DietaryIndicator type="veg" decorative />
                    <span>Veg</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={dietaryFilter === 'non-veg'}
                    onClick={() => setDietaryFilter('non-veg')}
                    className={`min-h-[36px] px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                      dietaryFilter === 'non-veg'
                        ? 'bg-[#B91C1C]/12 text-[#7F1D1D] ring-1 ring-[#B91C1C]/40'
                        : 'text-[#243B55] hover:text-[#0D1B2A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <DietaryIndicator type="non-veg" decorative />
                    <span>Non-Veg</span>
                  </button>
                </div>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8A6518] hover:text-[#0D1B2A] transition-colors py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            {/* Menu Categories Output */}
            {filteredCategories.length === 0 ? (
              <div className="mt-6 bg-white border border-[#0D1B2A]/12 rounded-2xl p-8 sm:p-12 text-center">
                <p className="font-display text-2xl font-bold text-[#0D1B2A]">
                  {dietaryFilter === 'non-veg' && !searchQuery.trim()
                    ? 'No Non-Veg dishes listed'
                    : 'No matching dishes found'}
                </p>
                <p className="text-sm sm:text-base text-[#243B55] mt-2 max-w-md mx-auto">
                  {searchQuery.trim() ? (
                    <>
                      We could not find any{' '}
                      {dietaryFilter === 'all'
                        ? 'items'
                        : dietaryFilter === 'veg'
                          ? 'Veg items'
                          : 'Non-Veg items'}{' '}
                      matching &ldquo;{searchQuery}&rdquo;
                      {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}.
                    </>
                  ) : (
                    <>
                      There are currently no{' '}
                      {dietaryFilter === 'veg' ? 'Veg' : 'Non-Veg'} dishes listed
                      {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}.
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg bg-[#0D1B2A] text-[#FAF7F2] hover:bg-[#16283E] text-sm font-semibold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Reset Search &amp; Filters</span>
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-8" data-testid="menu-categories-list">
                {filteredCategories.map((category) => (
                  <article
                    key={category.name}
                    id={`category-${slugifyCategory(category.name)}`}
                    className="bg-white border border-[#0D1B2A]/12 rounded-2xl p-5 sm:p-7 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#0D1B2A]/15">
                      <div>
                        <h3 className="font-display text-2xl sm:text-[1.75rem] font-bold text-[#0D1B2A]">
                          <HighlightedText text={category.name} query={searchQuery} />
                        </h3>
                        {category.notes && (
                          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8A6518]">
                            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{category.notes}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs sm:text-sm font-medium text-[#243B55] tabular-nums">
                          {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                        </span>
                        {!isFiltered && (
                          <a
                            href="#menu-controls"
                            className="lg:hidden text-xs font-semibold text-[#8A6518] hover:text-[#0D1B2A] transition-colors whitespace-nowrap"
                          >
                            ↑ Categories
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                      {category.items.map((item) => (
                        <MenuItemRow
                          key={`${category.name}-${item.name}`}
                          item={item}
                          searchQuery={searchQuery}
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet: Quick Jump Across All 21 Categories */}
      {mobileSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-categories-title"
          className="lg:hidden fixed inset-0 z-50 bg-[#0A1628]/70 backdrop-blur-xs flex items-end"
          onClick={() => setMobileSheetOpen(false)}
        >
          <div
            className="w-full bg-[#FAF7F2] rounded-t-3xl border-t border-[#C59B3B]/40 max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-[#0D1B2A]/20 rounded-full mx-auto mt-3" />

            <div className="px-5 py-4 border-b border-[#0D1B2A]/10 flex items-center justify-between">
              <div>
                <h3
                  id="mobile-categories-title"
                  className="font-display text-xl font-bold text-[#0D1B2A]"
                >
                  All 21 Menu Categories
                </h3>
                <p className="text-xs text-[#243B55] mt-0.5 tabular-nums">
                  {totalDishesCount} dishes available
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileSheetOpen(false)}
                aria-label="Close categories selector"
                className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#0D1B2A] hover:bg-[#0D1B2A]/5"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  setMobileSheetOpen(false);
                }}
                className={`col-span-2 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between border ${
                  selectedCategory === 'all'
                    ? 'bg-[#0D1B2A] text-[#FAF7F2] border-[#0D1B2A]'
                    : 'bg-white text-[#0D1B2A] border-[#0D1B2A]/15'
                }`}
              >
                <span>All Categories</span>
                <span className="text-xs tabular-nums opacity-80">{totalDishesCount} items</span>
              </button>

              {menuCategories.map((category) => {
                const isSelected = selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => {
                      onSelectCategory(category.name);
                      setMobileSheetOpen(false);
                    }}
                    className={`min-h-[52px] px-3.5 py-2.5 rounded-xl text-left border flex flex-col justify-center ${
                      isSelected
                        ? 'bg-[#0D1B2A] text-[#FAF7F2] border-[#0D1B2A]'
                        : 'bg-white text-[#0D1B2A] border-[#0D1B2A]/15'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold leading-tight">
                      {category.name}
                    </span>
                    <span
                      className={`text-[11px] tabular-nums mt-0.5 ${
                        isSelected ? 'text-[#DEC073]' : 'text-[#243B55]/75'
                      }`}
                    >
                      {category.items.length} items
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
