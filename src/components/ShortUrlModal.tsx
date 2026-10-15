import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Link as LinkIcon, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface ShortUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

interface QuickUrlItem {
  name: string;
  category: string;
  canonicalPath: string;
  shortPath: string;
  description: string;
}

const STATIC_ROUTES: QuickUrlItem[] = [
  {
    name: 'Homepage / All Articles',
    category: 'Core Navigation',
    canonicalPath: '/',
    shortPath: '/',
    description: 'Explore Maharashtra cuisine and living food traditions'
  },
  {
    name: 'Regional Cuisines Guide',
    category: 'Core Navigation',
    canonicalPath: '/regional-cuisines',
    shortPath: '/regions',
    description: 'Six terroir food systems across Maharashtra'
  },
  {
    name: 'Spice Heritage Atlas',
    category: 'Core Navigation',
    canonicalPath: '/spice-heritage',
    shortPath: '/spices',
    description: 'Traditional masala blends (Goda, Malvani, Saoji, Kala)'
  },
  {
    name: 'About Pangat Journal',
    category: 'Core Navigation',
    canonicalPath: '/about',
    shortPath: '/about',
    description: 'Curatorial manifesto and cultural lineage'
  },
  {
    name: 'Saved Reading List',
    category: 'Core Navigation',
    canonicalPath: '/bookmarks',
    shortPath: '/saved',
    description: 'Bookmarked chronicles and recipes'
  }
];

export const ShortUrlModal: React.FC<ShortUrlModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const articleItems: QuickUrlItem[] = ARTICLES.map((art) => ({
    name: art.title,
    category: art.region,
    canonicalPath: `/${art.id}`,
    shortPath: `/${art.shortSlug || art.id}`,
    description: art.metaDescription || art.excerpt
  }));

  const allItems = [...STATIC_ROUTES, ...articleItems];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-amber-800 font-semibold mb-1">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>URL Architecture Directory</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Short URLs & Canonical Slugs
            </h2>
            <p className="text-xs text-stone-600 mt-1 font-sans">
              All routes are lowercase, hyphen-separated with zero # or random symbols. Both ultra-short and canonical paths route seamlessly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Directory List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {allItems.map((item) => {
            const shortFull = `${origin}${item.shortPath}`;
            const canonicalFull = `${origin}${item.canonicalPath}`;

            return (
              <div 
                key={item.canonicalPath}
                className="p-3.5 rounded-xl border border-stone-200/90 hover:border-amber-300 bg-stone-50/60 hover:bg-amber-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800 font-sans">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs font-mono">
                    <span className="text-amber-900 font-semibold bg-amber-100/80 px-2 py-0.5 rounded">
                      Short: {item.shortPath}
                    </span>
                    <span className="text-stone-500 text-[11px]">
                      Canonical: {item.canonicalPath}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleCopy(shortFull, `short-${item.shortPath}`)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-md transition-colors"
                    title={`Copy ${shortFull}`}
                  >
                    {copiedKey === `short-${item.shortPath}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-stone-500" />
                        <span>Copy Short</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigate(item.canonicalPath);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-amber-900 hover:bg-amber-950 text-white rounded-md transition-colors"
                    title={`Go to ${item.canonicalPath}`}
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-600 shrink-0">
          <span>{allItems.length} clean URLs configured</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
