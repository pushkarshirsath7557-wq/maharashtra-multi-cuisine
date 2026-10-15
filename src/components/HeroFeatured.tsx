import React from 'react';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { BlogArticle } from '../types/blog';

interface HeroFeaturedProps {
  article: BlogArticle;
  onReadArticle: (id: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ article, onReadArticle }) => {
  return (
    <section className="relative border-b border-stone-200/90 bg-[#F5EFE6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        
        {/* Curatorial Header */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs uppercase tracking-widest text-stone-600 font-sans border-b border-stone-300/70 pb-3">
          <span>Curator's Lead Chronicle · Volume I</span>
          <span className="hidden sm:inline">The Living Table of Maharashtra</span>
        </div>

        {/* 2-Column Split: Lead Story Narrative & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-medium text-stone-700 tracking-wide">
              <span className="text-amber-800 font-semibold">{article.region}</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                {article.readTime}
              </span>
            </div>

            {/* Lead Story Headline */}
            <h2 
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              <a
                href={`/${article.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle(article.id);
                }}
                className="hover:text-amber-950 transition-colors"
              >
                {article.title}
              </a>
            </h2>

            {/* Subtitle / Excerpt */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-sans">
              {article.subtitle}
            </p>

            <p className="text-sm text-stone-600 line-clamp-2 max-w-2xl">
              {article.excerpt}
            </p>

            {/* Byline & CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href={`/${article.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle(article.id);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-900 text-stone-100 text-sm font-medium rounded-lg hover:bg-amber-950 active:scale-[0.98] transition-all shadow-sm group"
              >
                <span>Read Full Chronicle</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="text-xs text-stone-600">
                <span className="font-medium text-stone-900">{article.author.name}</span>
                <span className="mx-1.5 text-stone-400">/</span>
                <span>{article.publishedDate}</span>
              </div>
            </div>

          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5">
            <a
              href={`/${article.id}`}
              onClick={(e) => {
                e.preventDefault();
                onReadArticle(article.id);
              }}
              className="block relative rounded-xl overflow-hidden border border-stone-300/80 shadow-md group cursor-pointer bg-stone-200 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/3]"
            >
              <img
                src={article.image}
                alt={article.imageAlt || article.imageCaption || article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.classList.add('opacity-0');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-3 left-4 right-4 text-xs text-stone-200 line-clamp-1 italic font-serif">
                {article.imageCaption}
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
