import { BookOpen, Home, Image, MapPin } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: 'home' | 'menu' | 'gallery' | 'visit';
  onNavigate: (section: 'home' | 'menu' | 'gallery' | 'visit') => void;
}

const NAV_ITEMS: Array<{
  id: 'home' | 'menu' | 'gallery' | 'visit';
  label: string;
  href: string;
  icon: typeof Home;
}> = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'menu', label: 'Menu', href: '#menu', icon: BookOpen },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: Image },
  { id: 'visit', label: 'Contact', href: '#visit', icon: MapPin },
];

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-15 bg-[#0D1B2A]/95 backdrop-blur-md border-t border-[#C59B3B]/25"
    >
      <div className="grid grid-cols-4 h-full max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'location' : undefined}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                isActive ? 'text-[#DEC073]' : 'text-[#FAF7F2]/70 hover:text-[#FAF7F2]'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
              <span className="text-[11px] font-medium mt-0.5 leading-none">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
