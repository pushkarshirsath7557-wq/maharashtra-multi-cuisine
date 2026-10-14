import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, INITIAL_COMMENTS } from './data/articles';
import { BlogArticle, RegionType, SpiceLevel, UserComment } from './types/blog';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { RegionalFilterBar } from './components/RegionalFilterBar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { RegionalCuisinesView } from './components/RegionalCuisinesView';
import { SpiceHeritageView } from './components/SpiceHeritageView';
import { BookmarksView } from './components/BookmarksView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { ArrowRight, BookOpen, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'articles' | 'regions' | 'spices' | 'about' | 'bookmarks'>('articles');
  
  // Filters State
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<'All' | 'Vegetarian' | 'Non-Vegetarian'>('All');
  const [selectedSpice, setSelectedSpice] = useState<'All' | SpiceLevel>('All');

  // Bookmarks State (persisted in localStorage)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pangat_bookmarks');
      return saved ? JSON.parse(saved) : ['architecture-of-maharashtrian-thali', 'konkan-malvan-coastal-alchemy'];
    } catch {
      return ['architecture-of-maharashtrian-thali'];
    }
  });

  // Comments State (persisted in localStorage)
  const [comments, setComments] = useState<UserComment[]>(() => {
    try {
      const saved = localStorage.getItem('pangat_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('pangat_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore in restricted environments
    }
  }, [bookmarks]);

  // Sync Comments to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('pangat_comments', JSON.stringify(comments));
    } catch {
      // ignore
    }
  }, [comments]);

  // Sync URL hash with article view
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('article-')) {
        const articleId = hash.replace('article-', '');
        const exists = ARTICLES.find((a) => a.id === articleId);
        if (exists) {
          setActiveArticleId(articleId);
        }
      } else if (!hash) {
        setActiveArticleId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenArticle = (id: string) => {
    setActiveArticleId(id);
    window.location.hash = `article-${id}`;
  };

  const handleBackToHome = () => {
    setActiveArticleId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddComment = (newCommentData: Omit<UserComment, 'id' | 'date'>) => {
    const newComment: UserComment = {
      ...newCommentData,
      id: `c_${Date.now()}`,
      date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  // Filtered Articles calculation
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Region check
      if (selectedRegion !== 'All' && article.region !== selectedRegion) {
        return false;
      }
      // Diet check
      if (selectedDiet !== 'All' && article.diet !== selectedDiet) {
        return false;
      }
      // Spice check
      if (selectedSpice !== 'All' && article.spiceLevel !== selectedSpice) {
        return false;
      }
      // Search query check (title, subtitle, region, tags, excerpt, ingredients)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(q);
        const matchSubtitle = article.subtitle.toLowerCase().includes(q);
        const matchExcerpt = article.excerpt.toLowerCase().includes(q);
        const matchRegion = article.region.toLowerCase().includes(q);
        const matchCategory = article.category.toLowerCase().includes(q);
        const matchTags = article.tags.some((t) => t.toLowerCase().includes(q));
        const matchIngredients = article.recipeHighlight?.keyIngredients.some((i) => i.toLowerCase().includes(q));
        return matchTitle || matchSubtitle || matchExcerpt || matchRegion || matchCategory || matchTags || matchIngredients;
      }
      return true;
    });
  }, [selectedRegion, selectedDiet, selectedSpice, searchQuery]);

  const activeArticle = useMemo(() => {
    if (!activeArticleId) return null;
    return ARTICLES.find((a) => a.id === activeArticleId) || null;
  }, [activeArticleId]);

  const bookmarkedArticleObjects = useMemo(() => {
    return ARTICLES.filter((a) => bookmarks.includes(a.id));
  }, [bookmarks]);

  // Featured lead article
  const leadArticle = ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      {/* Strict 3-Zone Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveArticleId(null);
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarkCount={bookmarks.length}
        onOpenArticle={handleOpenArticle}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeArticle ? (
          <ArticleView
            article={activeArticle}
            allArticles={ARTICLES}
            onBack={handleBackToHome}
            onReadArticle={handleOpenArticle}
            isBookmarked={bookmarks.includes(activeArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            comments={comments}
            onAddComment={handleAddComment}
          />
        ) : currentTab === 'regions' ? (
          <RegionalCuisinesView
            onSelectRegionAndFilter={(reg) => {
              setSelectedRegion(reg);
              setCurrentTab('articles');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReadArticle={handleOpenArticle}
          />
        ) : currentTab === 'spices' ? (
          <SpiceHeritageView onReadArticle={handleOpenArticle} />
        ) : currentTab === 'bookmarks' ? (
          <BookmarksView
            bookmarkedArticles={bookmarkedArticleObjects}
            onReadArticle={handleOpenArticle}
            onToggleBookmark={handleToggleBookmark}
            onExploreAll={() => {
              setCurrentTab('articles');
              setSelectedRegion('All');
              setSelectedDiet('All');
              setSelectedSpice('All');
              setSearchQuery('');
            }}
          />
        ) : currentTab === 'about' ? (
          <AboutView />
        ) : (
          /* Homepage: All 10 Articles & Lead Story */
          <div>
            {/* Featured Lead Article Hero */}
            <HeroFeatured
              article={leadArticle}
              onReadArticle={handleOpenArticle}
            />

            {/* Articles Gallery Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
              
              {/* Section Kicker */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-stone-200/90 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
                    Anthology
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    The Complete Pangat Chronicles (10 Essays)
                  </h2>
                </div>
                <p className="text-xs text-stone-700 max-w-md font-sans">
                  From coastal Malvani fish curries to Vidarbha's fiery Saoji stews and Pune's sacred Puran Poli—an authoritative survey of Maharashtrian regional food culture.
                </p>
              </div>

              {/* Interactive Filter Bar */}
              <RegionalFilterBar
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDiet={selectedDiet}
                onSelectDiet={setSelectedDiet}
                selectedSpice={selectedSpice}
                onSelectSpice={setSelectedSpice}
                totalCount={filteredArticles.length}
              />

              {/* Cards Grid */}
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white border border-stone-200/90 rounded-2xl max-w-lg mx-auto space-y-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 mx-auto flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800">
                    No matching chronicles found
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Try adjusting your search query, or clear your dietary or spice filters to view all 10 Maharashtrian culinary essays.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRegion('All');
                      setSelectedDiet('All');
                      setSelectedSpice('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-amber-900 text-white text-xs font-medium rounded-lg hover:bg-amber-950 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onReadArticle={handleOpenArticle}
                      isBookmarked={bookmarks.includes(article.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              )}

              {/* Regional Discovery Banner */}
              <div className="mt-16 p-8 bg-[#F5EFE6] border border-stone-300/80 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-2 max-w-xl text-center md:text-left">
                  <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-bold">
                    Interactive Regional Guide
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-950">
                    Uncover the 6 Distinct Culinary Terroirs of Maharashtra
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    Dive into our curatorial topography comparing the geography, climate, and foundational cooking fats of Konkan, Kolhapur, Vidarbha, Khandesh, Pune, and Marathwada.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setCurrentTab('regions');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-amber-900 text-stone-100 text-xs font-medium rounded-lg hover:bg-amber-950 transition-colors flex items-center gap-2 group"
                  >
                    <span>Explore Terroirs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('spices');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 bg-white text-stone-800 border border-stone-300 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    Spice Atlas
                  </button>
                </div>
              </div>

            </section>
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveArticleId(null);
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectRegion={(reg) => {
          setSelectedRegion(reg);
          setCurrentTab('articles');
          setActiveArticleId(null);
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReadArticle={handleOpenArticle}
      />
    </div>
  );
}
