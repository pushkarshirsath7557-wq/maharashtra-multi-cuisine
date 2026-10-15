import React, { useState } from 'react';
import { Bookmark, Menu, X, Compass, Sparkles, Link as LinkIcon } from 'lucide-react';

interface NavbarProps {
  currentTab: 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks';
  onSelectTab: (tab: 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks') => void;
  bookmarkCount: number;
  onOpenArticle?: (id: string) => void;
  onSelectRegion?: (region: string) => void;
  onOpenShortUrls?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  bookmarkCount,
  onOpenShortUrls
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('articles');
              }}
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
            </a>
          </div>

          {/* Zone 2: Clean 4–5 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('articles');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'articles' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              All Articles
              {currentTab === 'articles' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </a>
            <a
              href="/regional-cuisines"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('regions');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'regions' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              Regional Cuisines
              {currentTab === 'regions' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </a>
            <a
              href="/spice-heritage"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('spices');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'spices' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              Spice Heritage
              {currentTab === 'spices' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('about');
              }}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                currentTab === 'about' ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              About Pangat
              {currentTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800" />
              )}
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenShortUrls && (
              <button
                type="button"
                onClick={onOpenShortUrls}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-amber-950 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300 transition-colors shrink-0 shadow-xs"
                title="View and copy all short URLs"
              >
                <LinkIcon className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">Short URLs</span>
              </button>
            )}

            <a
              href="/bookmarks"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('bookmarks');
              }}
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
            </a>

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
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('articles');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'articles' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              All Articles (11 Chronicles)
            </a>
            <a
              href="/regional-cuisines"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('regions');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'regions' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Regional Cuisines
            </a>
            <a
              href="/spice-heritage"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('spices');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'spices' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Spice Heritage
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('about');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'about' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              About Pangat
            </a>
            <a
              href="/bookmarks"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('bookmarks');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === 'bookmarks' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              Saved Stories ({bookmarkCount})
            </a>
            {onOpenShortUrls && (
              <button
                type="button"
                onClick={() => {
                  onOpenShortUrls();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold rounded-md text-amber-950 bg-amber-100/60 hover:bg-amber-100 flex items-center gap-2 transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-amber-800" />
                <span>Short URLs Directory (Quick Copy)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
