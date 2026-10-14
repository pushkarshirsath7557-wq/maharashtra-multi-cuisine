import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { RegionType } from '../types/blog';

interface FooterProps {
  onSelectTab: (tab: 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks') => void;
  onSelectRegion: (region: RegionType) => void;
  onReadArticle: (articleId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectRegion,
  onReadArticle
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

          {/* Regional Cuisines Directory */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-stone-400 font-semibold">
              Regional Chronicles
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Konkan & Malvan'); }}
                className="text-left hover:text-white transition-colors"
              >
                Konkan & Malvan
              </button>
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Kolhapur'); }}
                className="text-left hover:text-white transition-colors"
              >
                Kolhapur Rassa
              </button>
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Vidarbha & Saoji'); }}
                className="text-left hover:text-white transition-colors"
              >
                Vidarbha Saoji
              </button>
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Khandesh'); }}
                className="text-left hover:text-white transition-colors"
              >
                Khandesh Kala Masala
              </button>
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Pune & Desh'); }}
                className="text-left hover:text-white transition-colors"
              >
                Pune & Goda Masala
              </button>
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Marathwada'); }}
                className="text-left hover:text-white transition-colors"
              >
                Marathwada Millets
              </button>
              <button 
                onClick={() => { onSelectTab('articles'); onSelectRegion('Mumbai & Street'); }}
                className="text-left hover:text-white transition-colors"
              >
                Mumbai Street Food
              </button>
              <button 
                onClick={() => onSelectTab('spices')}
                className="text-left hover:text-white transition-colors text-amber-500 font-medium"
              >
                Spice Atlas →
              </button>
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
            <button onClick={() => onSelectTab('about')} className="hover:text-stone-300 transition-colors">
              Editorial Policy
            </button>
            <button onClick={() => onSelectTab('spices')} className="hover:text-stone-300 transition-colors">
              Spice Glossary
            </button>
            <button onClick={() => onSelectTab('articles')} className="hover:text-stone-300 transition-colors">
              Article Archive
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
