import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { RegionType } from '../types/blog';

interface FooterProps {
  onSelectTab: (tab: 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks') => void;
  onSelectRegion: (region: RegionType) => void;
  onReadArticle: (articleId: string) => void;
  onOpenShortUrls?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectRegion,
  onReadArticle,
  onOpenShortUrls
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        {/* Top 3-Column Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-stone-800">
          
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Pangat
              </span>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-sans">
                पांगत
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed font-sans max-w-sm">
              An archival journal documenting the regional multi-cuisines of Maharashtra—honoring the sacred geometry of the thali, ancient spices, and agrarian heritage.
            </p>
            <div className="pt-2 text-xs text-stone-500 italic font-serif">
              "Anna he poorna Brahma — Food is the Supreme Reality."
            </div>
          </div>

          {/* Regional Cuisines Directory & Featured Pages */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-stone-400 font-semibold">
              Featured Articles & Terroirs
            </h4>
            <div className="flex flex-col gap-1.5 text-xs text-stone-400">
              <a 
                href="/maharashtrian-street-food"
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle('maharashtrian-street-food');
                }}
                className="text-left hover:text-white transition-colors"
              >
                Maharashtrian Street Food: Famous Local Dishes
              </a>
              <a 
                href="/kolhapuri-cuisine"
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle('kolhapuri-cuisine');
                }}
                className="text-left hover:text-white transition-colors"
              >
                Kolhapuri Cuisine: Famous Dishes and Flavours
              </a>
              <a 
                href="/malvani-cuisine"
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle('malvani-cuisine');
                }}
                className="text-left hover:text-white transition-colors"
              >
                Malvani Cuisine: Traditional Coastal Food
              </a>
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-stone-400 border-t border-stone-800/80">
                <a 
                  href="/saoji-cuisine"
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle('saoji-cuisine');
                  }}
                  className="text-left hover:text-white transition-colors"
                >
                  Vidarbha Saoji
                </a>
                <a 
                  href="/khandeshi-cuisine"
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle('khandeshi-cuisine');
                  }}
                  className="text-left hover:text-white transition-colors"
                >
                  Khandesh Shev Bhaji
                </a>
                <a 
                  href="/puneri-cuisine"
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle('puneri-cuisine');
                  }}
                  className="text-left hover:text-white transition-colors"
                >
                  Puneri Goda Masala
                </a>
                <a 
                  href="/spice-heritage"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTab('spices');
                  }}
                  className="text-left hover:text-white transition-colors text-amber-500 font-medium"
                >
                  Spice Atlas →
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Dispatches */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-stone-400 font-semibold">
              Chronicle Dispatches
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Receive newly researched recipes, archival stories, and seasonal food rituals directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-md transition-colors"
                  aria-label="Subscribe to dispatches"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Welcome to the Pangat table circle.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>© 2026 Pangat Journal. All rights reserved. Celebrating indigenous culinary biodiversity.</p>
          <div className="flex items-center gap-6">
            <a 
              href="/about" 
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('about');
              }} 
              className="hover:text-stone-300 transition-colors"
            >
              Editorial Policy
            </a>
            <a 
              href="/spice-heritage" 
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('spices');
              }} 
              className="hover:text-stone-300 transition-colors"
            >
              Spice Glossary
            </a>
            {onOpenShortUrls && (
              <button
                type="button"
                onClick={onOpenShortUrls}
                className="hover:text-amber-400 text-amber-500/90 font-medium transition-colors"
              >
                ⚡ Short URLs
              </button>
            )}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('articles');
              }} 
              className="hover:text-stone-300 transition-colors"
            >
              Article Archive
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
