import React from 'react';
import { Clock, Bookmark, ArrowUpRight, Flame } from 'lucide-react';
import { BlogArticle } from '../types/blog';

interface ArticleCardProps {
  article: BlogArticle;
  onReadArticle: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article 
      onClick={() => onReadArticle(article.id)}
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 cursor-pointer text-left"
    >
      {/* Visual Frame */}
      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle scrim for clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

        {/* Bookmark Action Overlay */}
        <button
          onClick={(e) => onToggleBookmark(article.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950'
          }`}
          title={isBookmarked ? 'Remove from saved' : 'Save chronicle'}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Diet indicator - clean typography indicator */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-medium tracking-wide text-stone-200 drop-shadow-sm">
          {article.diet === 'Vegetarian' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator (NO PILL BOXES) */}
          <div className="flex items-center gap-2 text-xs text-stone-700 font-sans tracking-wide mb-2">
            <span className="text-amber-800 font-semibold">{article.region}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px] tabular-nums text-stone-700">
              <Clock className="w-3 h-3 text-stone-500" />
              {article.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h3 
            className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug line-clamp-2"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-stone-600 line-clamp-2 font-sans leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Author & Spice Level */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-semibold flex items-center justify-center font-mono">
              {article.author.avatarText}
            </div>
            <span className="font-medium text-stone-800 truncate max-w-[130px]">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-0.5 text-amber-800">
              <Flame className="w-3 h-3" />
              <span className="font-sans text-[11px]">{article.spiceLevel}</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </article>
  );
};
