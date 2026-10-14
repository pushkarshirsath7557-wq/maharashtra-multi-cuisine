import React from 'react';
import { Bookmark, ArrowRight, Trash2, BookOpen } from 'lucide-react';
import { BlogArticle } from '../types/blog';
import { ArticleCard } from './ArticleCard';

interface BookmarksViewProps {
  bookmarkedArticles: BlogArticle[];
  onReadArticle: (id: string) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onExploreAll: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarkedArticles,
  onReadArticle,
  onToggleBookmark,
  onExploreAll
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-amber-800 font-semibold mb-1">
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>Curated Reading List</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          Your Saved Pangat Chronicles
        </h2>
        <p className="text-base text-stone-600 font-sans">
          Articles bookmarked for your quiet reading, kitchen experiments, or culinary journeys.
        </p>
      </div>

      {bookmarkedArticles.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-stone-200/90 rounded-2xl max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800">
            No chronicles saved yet
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            As you browse through the 10 chronicles across Konkan, Kolhapur, Vidarbha, and Desh, tap the bookmark icon on any card or article to preserve it here.
          </p>
          <div className="pt-2">
            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-900 text-stone-100 text-sm font-medium rounded-lg hover:bg-amber-950 transition-colors"
            >
              <span>Explore All 10 Chronicles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bookmarkedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadArticle={onReadArticle}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};
