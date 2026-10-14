import React, { useState } from 'react';
import { MAHARASHTRIAN_SPICES, SpiceItem } from '../data/spices';
import { Sparkles, ArrowRight, Flame, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface SpiceHeritageViewProps {
  onReadArticle: (articleId: string) => void;
}

export const SpiceHeritageView: React.FC<SpiceHeritageViewProps> = ({ onReadArticle }) => {
  const [activeSpiceId, setActiveSpiceId] = useState<string>(MAHARASHTRIAN_SPICES[0].id);

  const activeSpice = MAHARASHTRIAN_SPICES.find((s) => s.id === activeSpiceId) || MAHARASHTRIAN_SPICES[0];

  // Find related articles for this spice
  const relatedArticles = ARTICLES.filter((art) => {
    if (activeSpice.id === 'goda-masala') return art.id.includes('pune') || art.id.includes('architecture');
    if (activeSpice.id === 'malvani-masala') return art.id.includes('konkan') || art.id.includes('koli');
    if (activeSpice.id === 'saoji-masala') return art.id.includes('vidarbha');
    if (activeSpice.id === 'khandeshi-kala-masala') return art.id.includes('khandesh');
    if (activeSpice.id === 'kanda-lasun-masala') return art.id.includes('kolhapur');
    if (activeSpice.id === 'kokum-aamsul') return art.id.includes('konkan') || art.id.includes('thali');
    return false;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-semibold">
          Terroir & Alchemy
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-3">
          The Spice Atlas of Maharashtra
        </h2>
        <p className="text-base text-stone-600 leading-relaxed font-sans">
          Maharashtra does not use a singular curry powder. Each agro-climatic sub-region—from the humid red laterite coast to the basaltic black cotton plateaus—roasts, pounds, and tempers a distinct spice matrix that mirrors its soil and community spirit.
        </p>
      </div>

      {/* Interactive 2-Column Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Spice Selection List */}
        <div className="lg:col-span-5 space-y-2">
          {MAHARASHTRIAN_SPICES.map((spice) => {
            const isSelected = spice.id === activeSpiceId;
            return (
              <button
                key={spice.id}
                onClick={() => setActiveSpiceId(spice.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-white border-amber-800/80 shadow-sm ring-1 ring-amber-800/20'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-base text-stone-900">
                      {spice.name}
                    </span>
                    <span className="text-xs text-amber-800 font-sans font-medium">
                      {spice.marathiName}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-700 font-sans">
                    {spice.region.split('(')[0]}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 line-clamp-1">
                  {spice.flavorProfile}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Deep Dive Pane */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-5">
            <div className="text-xs font-sans uppercase tracking-wider text-amber-800 font-semibold">
              {activeSpice.region}
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                {activeSpice.name}
              </h3>
              <span className="font-sans text-stone-700 text-lg">
                ({activeSpice.marathiName})
              </span>
            </div>
            <p className="mt-3 text-sm text-stone-700 leading-relaxed italic font-serif">
              "{activeSpice.flavorProfile}"
            </p>
          </div>

          {/* Historical Lore */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold mb-2">
              Cultural Genesis & Terroir
            </h4>
            <p className="text-sm text-stone-800 leading-relaxed font-sans">
              {activeSpice.historicalContext}
            </p>
          </div>

          {/* Composition */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold mb-2">
              Key Botanical Components
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {activeSpice.keyIngredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md border border-stone-200 font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Preparations */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold mb-2">
              Canon Dishes
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-stone-700">
              {activeSpice.signatureDishes.map((dish, idx) => (
                <span key={dish} className="font-medium text-stone-900">
                  {dish} {idx < activeSpice.signatureDishes.length - 1 && <span className="text-stone-300 ml-2">/</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Associated Chronicles CTA */}
          {relatedArticles.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold mb-3">
                Featured in Pangat Chronicles
              </h4>
              <div className="space-y-2">
                {relatedArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => onReadArticle(art.id)}
                    className="w-full text-left p-3 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[11px] text-amber-800 font-semibold block">
                        {art.region}
                      </span>
                      <span className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-950">
                        {art.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-900 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
