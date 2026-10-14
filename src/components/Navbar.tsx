import React, { useState } from 'react';
import { Bookmark, Menu, X, Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks';
  onSelectTab: (tab: 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks') => void;
  bookmarkCount: number;
  onOpenArticle?: (id: string) => void;
  onSelectRegion?: (region: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  bookmarkCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('articles')}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                  Pangat
                </span>
                <span className="text-xs font-sans tracking-widest text-amber-800 uppercase hidden sm:inline">
                  पांगत
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-stone-700 hidden md:block">
                Chronicles of Maharashtrian Multi-Cuisine
              </p>
            </button>
          </div>

          {/* Zone 2: Clean 4–5 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => onSelectTab('articles')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'articles' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              All Articles
              {currentTab === 'articles' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </button>
            <button
              onClick={() => onSelectTab('regions')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'regions' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              Regional Cuisines
              {currentTab === 'regions' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </button>
            <button
              onClick={() => onSelectTab('spices')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'spices' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              Spice Heritage
              {currentTab === 'spices' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'about' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              About Pangat
              {currentTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('bookmarks')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 border ${
                currentTab === 'bookmarks'
                  ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                  : 'bg-stone-100/90 text-stone-800 border-stone-300 hover:bg-stone-200 hover:border-stone-400'
              }`}
              title="Saved reading list"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarkCount > 0 ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Saved Stories</span>
              <span className="font-mono text-xs tabular-nums opacity-90">
                ({bookmarkCount})
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 md:hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200/80 bg-[#FAF7F2] space-y-2">
            <button
              onClick={() => {
                onSelectTab('articles');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'articles' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              All Articles (10 Chronicles)
            </button>
            <button
              onClick={() => {
                onSelectTab('regions');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'regions' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Regional Cuisines
            </button>
            <button
              onClick={() => {
                onSelectTab('spices');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'spices' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Spice Heritage
            </button>
            <button
              onClick={() => {
                onSelectTab('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'about' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              About Pangat
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
