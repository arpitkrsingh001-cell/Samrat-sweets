/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Navbar } from './components/Navbar';
import { RestaurantInfoSection } from './components/RestaurantInfoSection';
import { SignatureDishesSection } from './components/SignatureDishesSection';

type SectionId = 'home' | 'menu' | 'gallery' | 'visit';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const sectionIds: SectionId[] = ['home', 'menu', 'gallery', 'visit'];

    const updateActiveFromScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current: SectionId = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, []);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    requestAnimationFrame(() => {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0D1B2A]">
      <Navbar />

      <main className="flex-1">
        <HeroSection onQuickSelectCategory={handleSelectCategory} />
        <SignatureDishesSection onSelectCategory={handleSelectCategory} />
        <MenuSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <GallerySection />
        <RestaurantInfoSection />
      </main>

      <Footer />
      <MobileBottomNav activeSection={activeSection} onNavigate={setActiveSection} />
    </div>
  );
}
