import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, INITIAL_COMMENTS } from './data/articles';
import { BlogArticle, SpiceLevel, UserComment } from './types/blog';
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
import { ShortUrlModal } from './components/ShortUrlModal';
import { ArrowRight, BookOpen } from 'lucide-react';
import { updateDocumentSeo } from './utils/seo';

export type NavTab = 'articles' | 'regions' | 'spices' | 'about' | 'bookmarks';

interface RouteState {
  tab: NavTab;
  articleId: string | null;
}

// Redirect dictionary for backward compatibility and ultra-short URLs
const REDIRECT_MAP: Record<string, string> = {
  // Ultra-short memorable URLs & aliases
  'street-food': 'maharashtrian-street-food',
  'vada-pav': 'maharashtrian-street-food',
  'misal-pav': 'maharashtrian-street-food',
  'kolhapuri': 'kolhapuri-cuisine',
  'kolhapur': 'kolhapuri-cuisine',
  'malvani': 'malvani-cuisine',
  'malvan': 'malvani-cuisine',
  'thali': 'maharashtrian-thali',
  'saoji': 'saoji-cuisine',
  'khandesh': 'khandeshi-cuisine',
  'khandeshi': 'khandeshi-cuisine',
  'puneri': 'puneri-cuisine',
  'pune': 'puneri-cuisine',
  'marathwada': 'marathwada-cuisine',
  'modak': 'ukdiche-modak',
  'preserves': 'traditional-preserves',
  'lonche': 'traditional-preserves',
  'koli': 'koli-seafood',
  'seafood': 'koli-seafood',

  // Tab shortcuts / short tab URLs
  'regions': 'regional-cuisines',
  'spices': 'spice-heritage',
  'saved': 'bookmarks',
  'saved-stories': 'bookmarks',

  // Legacy / long article IDs -> canonical clean URLs
  'architecture-of-maharashtrian-thali': 'maharashtrian-thali',
  'fire-of-vidarbha-saoji-cuisine': 'saoji-cuisine',
  'khandesh-black-gold-kala-masala-shev-bhaji': 'khandeshi-cuisine',
  'brahmin-kitchens-of-pune-goda-masala': 'puneri-cuisine',
  'marathwada-rustic-resilience-pithla-bhakri': 'marathwada-cuisine',
  'steamed-jewels-ukdiche-modak-festive-sweets': 'ukdiche-modak',
  'street-food-symphony-mumbai-misal-vada-pav': 'maharashtrian-street-food',
  'fermented-preserved-sun-dried-lonche-sandge': 'traditional-preserves',
  'koli-fisherfolk-bounties-bombil-crabs': 'koli-seafood',
  'konkan-malvan-coastal-alchemy': 'malvani-cuisine',
  'kolhapur-royal-rassa-tambda-pandhra': 'kolhapuri-cuisine',
};

// Helper to resolve route path and eliminate any #, symbols, random numbers or IDs
function resolveCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { tab: 'articles', articleId: null };
  }

  // 1. Read pathname and hash
  let rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const rawHash = window.location.hash.replace('#', '').toLowerCase();

  // If hash was provided (e.g., #regional-cuisines or #article-saoji-cuisine), resolve it to clean path
  let candidate = rawPath;
  if (!candidate && rawHash) {
    if (rawHash.startsWith('article-')) {
      candidate = rawHash.replace('article-', '');
    } else {
      candidate = rawHash;
    }
  }

  // Check redirects
  if (REDIRECT_MAP[candidate]) {
    candidate = REDIRECT_MAP[candidate];
  }

  // Tab routes
  if (candidate === 'regional-cuisines') {
    if (window.location.pathname !== '/regional-cuisines' || window.location.hash) {
      window.history.replaceState({}, '', '/regional-cuisines');
    }
    return { tab: 'regions', articleId: null };
  }

  if (candidate === 'spice-heritage') {
    if (window.location.pathname !== '/spice-heritage' || window.location.hash) {
      window.history.replaceState({}, '', '/spice-heritage');
    }
    return { tab: 'spices', articleId: null };
  }

  if (candidate === 'about') {
    if (window.location.pathname !== '/about' || window.location.hash) {
      window.history.replaceState({}, '', '/about');
    }
    return { tab: 'about', articleId: null };
  }

  if (candidate === 'bookmarks') {
    if (window.location.pathname !== '/bookmarks' || window.location.hash) {
      window.history.replaceState({}, '', '/bookmarks');
    }
    return { tab: 'bookmarks', articleId: null };
  }

  // Article routes (by canonical ID or short slug)
  const matchedArticle = ARTICLES.find((a) => a.id === candidate || a.shortSlug === candidate);
  if (matchedArticle) {
    if (window.location.pathname !== `/${matchedArticle.id}` || window.location.hash) {
      window.history.replaceState({}, '', `/${matchedArticle.id}`);
    }
    return { tab: 'articles', articleId: matchedArticle.id };
  }

  // Fallback to Homepage /
  if (window.location.hash || (window.location.pathname !== '/' && window.location.pathname !== '')) {
    window.history.replaceState({}, '', '/');
  }
  return { tab: 'articles', articleId: null };
}

export default function App() {
  // Navigation & View State
  const initialRoute = resolveCurrentRoute();
  const [currentTab, setCurrentTab] = useState<NavTab>(initialRoute.tab);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(initialRoute.articleId);
  const [shortUrlModalOpen, setShortUrlModalOpen] = useState<boolean>(false);

  // Filters State
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<'All' | 'Vegetarian' | 'Non-Vegetarian'>('All');
  const [selectedSpice, setSelectedSpice] = useState<'All' | SpiceLevel>('All');

  // Bookmarks State (persisted in localStorage)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pangat_bookmarks');
      return saved ? JSON.parse(saved) : ['maharashtrian-street-food', 'kolhapuri-cuisine', 'malvani-cuisine'];
    } catch {
      return ['maharashtrian-street-food'];
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
      // ignore
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

  // Handle browser popstate (back/forward) and route changes
  useEffect(() => {
    const handlePopState = () => {
      const route = resolveCurrentRoute();
      setCurrentTab(route.tab);
      setActiveArticleId(route.articleId);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    setActiveArticleId(null);
    let path = '/';
    if (tab === 'regions') path = '/regional-cuisines';
    else if (tab === 'spices') path = '/spice-heritage';
    else if (tab === 'about') path = '/about';
    else if (tab === 'bookmarks') path = '/bookmarks';

    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (id: string) => {
    const targetArticle = ARTICLES.find((a) => a.id === id || a.shortSlug === id);
    const targetId = targetArticle ? targetArticle.id : (REDIRECT_MAP[id] || id);
    setActiveArticleId(targetId);
    setCurrentTab('articles');
    window.history.pushState({}, '', `/${targetId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveArticleId(null);
    setCurrentTab('articles');
    window.history.pushState({}, '', '/');
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

  // Active Article
  const activeArticle = useMemo(() => {
    if (!activeArticleId) return null;
    return ARTICLES.find((a) => a.id === activeArticleId) || null;
  }, [activeArticleId]);

  // Dynamic SEO Metadata Synchronization for All Pages
  useEffect(() => {
    if (activeArticle) {
      // 1. Dedicated Article Page SEO Metadata
      const seoTitle = activeArticle.seoTitle || `${activeArticle.title} | Maharashtra Cuisine`;
      const metaDescription = activeArticle.metaDescription || activeArticle.excerpt;
      const canonicalPath = `/${activeArticle.id}`;
      const keywords = activeArticle.relatedKeywords ? [activeArticle.mainKeyword || '', ...activeArticle.relatedKeywords].filter(Boolean).join(', ') : activeArticle.tags.join(', ');
      const questionH2s = activeArticle.sections.filter((s) => s.heading.includes('?'));

      updateDocumentSeo({
        title: seoTitle,
        description: metaDescription,
        canonicalPath: canonicalPath,
        keywords: keywords,
        imageUrl: activeArticle.image,
        type: 'article',
        publishedDate: activeArticle.publishedDate,
        authorName: activeArticle.author.name,
        structuredData: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              'headline': activeArticle.h1Title || activeArticle.title,
              'description': metaDescription,
              'image': activeArticle.image,
              'author': {
                '@type': 'Person',
                'name': activeArticle.author.name,
                'jobTitle': activeArticle.author.role
              },
              'datePublished': activeArticle.publishedDate,
              'publisher': {
                '@type': 'Organization',
                'name': 'Pangat Maharashtra Multi-Cuisine'
              }
            },
            ...(questionH2s.length > 0 ? [{
              '@type': 'FAQPage',
              'mainEntity': questionH2s.map((q) => ({
                '@type': 'Question',
                'name': q.heading,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': q.paragraphs[0]
                }
              }))
            }] : [])
          ]
        }
      });
    } else if (currentTab === 'regions') {
      // 2. Regional Cuisines Page SEO Metadata
      updateDocumentSeo({
        title: 'Regional Cuisines of Maharashtra: Traditional Food Guide',
        description: 'Explore the diverse regional multi-cuisines of Maharashtra across Konkan, Kolhapur, Vidarbha, Khandesh, Pune, and Marathwada.',
        canonicalPath: '/regional-cuisines',
        keywords: 'regional cuisines of Maharashtra, Konkan cuisine, Kolhapur cuisine, Vidarbha food, Khandesh cuisine, Puneri cuisine',
        imageUrl: '/images/maharashtra-cuisine-traditional-thali.jpg',
        type: 'website'
      });
    } else if (currentTab === 'spices') {
      // 3. Spice Heritage Page SEO Metadata
      updateDocumentSeo({
        title: 'Spice Heritage of Maharashtra: Traditional Masala Atlas',
        description: 'Discover the authentic spice blends of Maharashtra, including Goda Masala, Malvani Masala, Saoji Masala, and Kanda Lasun Masala.',
        canonicalPath: '/spice-heritage',
        keywords: 'Maharashtra spices, Goda masala, Malvani masala, Saoji masala, Kanda lasun masala, Kala masala',
        imageUrl: '/images/kolhapuri-cuisine-tambda-pandhra-rassa.jpg',
        type: 'website'
      });
    } else if (currentTab === 'about') {
      // 4. About Pangat Page SEO Metadata
      updateDocumentSeo({
        title: 'About Pangat: Celebrating Maharashtra Multi Cuisine',
        description: 'Learn about Pangat, an archival culinary journal celebrating the sacred traditions, literary lineage, and diverse multi-cuisines of Maharashtra.',
        canonicalPath: '/about',
        keywords: 'About Pangat, Maharashtra cuisine history, culinary traditions of Maharashtra, Manasollasa',
        imageUrl: '/images/maharashtra-cuisine-traditional-thali.jpg',
        type: 'website'
      });
    } else if (currentTab === 'bookmarks') {
      // 5. Bookmarks Page SEO Metadata
      updateDocumentSeo({
        title: 'Saved Articles: Your Maharashtra Cuisine Reading List',
        description: 'View your saved articles and bookmarked recipes exploring the rich multi-cuisine traditions of Maharashtra.',
        canonicalPath: '/bookmarks',
        keywords: 'saved articles, bookmarked recipes, Maharashtra food reading list',
        imageUrl: '/images/maharashtra-cuisine-traditional-thali.jpg',
        type: 'website'
      });
    } else {
      // 6. Homepage (/) SEO Metadata
      updateDocumentSeo({
        title: 'Maharashtra Cuisine: Traditional Food and Flavours',
        description: 'Explore Maharashtra cuisine, from famous street foods and traditional Maharashtrian meals to spicy Kolhapuri dishes and coastal Malvani specialities.',
        canonicalPath: '/',
        keywords: 'Maharashtra cuisine, Maharashtrian food, traditional food of Maharashtra, Kolhapuri cuisine, Malvani cuisine, Maharashtrian street food, vada pav, misal pav',
        imageUrl: '/images/maharashtra-cuisine-traditional-thali.jpg',
        type: 'website',
        structuredData: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://maharashtra-multi-cuisine-silk.vercel.app/#website',
              'name': 'Maharashtra Cuisine: Traditional Food and Flavours',
              'url': 'https://maharashtra-multi-cuisine-silk.vercel.app/',
              'description': 'Explore Maharashtra cuisine, from famous street foods and traditional Maharashtrian meals to spicy Kolhapuri dishes and coastal Malvani specialities.'
            },
            {
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': 'What is Maharashtra cuisine known for?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Maharashtra cuisine is known for its remarkable regional diversity, spanning coconut-rich coastal seafood and fragrant solkadhi along the Konkan to fiery mutton broths in Kolhapur and wholesome millet flatbreads across the Deccan plateau. It masterfully balances the six Ayurvedic tastes (Shadrasas) through indigenous staples like goda masala, roasted peanuts, kokum, jowar, and cold-pressed peanut oil.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': 'What is the traditional food of Maharashtra?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'The traditional food of Maharashtra includes iconic culinary preparations such as Puran Poli, Varan Bhaat, Pithla Bhakri, Kolhapuri tambda rassa, Malvani fish curry, and beloved street snacks like vada pav and misal pav. These time-tested dishes celebrate seasonal eating, agrarian resilience, and deep hospitality rooted in the historic Pangat communal banquet tradition.'
                  }
                }
              ]
            }
          ]
        }
      });
    }
  }, [activeArticle, activeArticleId, currentTab]);

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
      // Search query check
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

  const bookmarkedArticleObjects = useMemo(() => {
    return ARTICLES.filter((a) => bookmarks.includes(a.id));
  }, [bookmarks]);

  // Featured lead article
  const leadArticle = ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      {/* Strict 3-Zone Navigation Header with Clean URLs */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        bookmarkCount={bookmarks.length}
        onOpenArticle={handleOpenArticle}
        onOpenShortUrls={() => setShortUrlModalOpen(true)}
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
              handleSelectTab('articles');
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
              setSelectedRegion('All');
              setSelectedDiet('All');
              setSelectedSpice('All');
              setSearchQuery('');
              handleSelectTab('articles');
            }}
          />
        ) : currentTab === 'about' ? (
          <AboutView />
        ) : (
          /* Homepage: All 11 Chronicles & Lead Story */
          <div>
            {/* Semantic Single H1 Header for Homepage */}
            <header className="border-b border-stone-200/90 bg-[#F5EFE6]/40 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-2 font-sans">
                  The Living Culinary Archive of Western India
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.12] mb-4">
                  Maharashtra Cuisine: Traditional Food and Flavours
                </h1>
                <p className="text-base sm:text-lg text-stone-700 max-w-3xl font-sans leading-relaxed">
                  Explore Maharashtra cuisine, from famous street foods and traditional Maharashtrian meals to spicy Kolhapuri dishes and coastal Malvani specialities.
                </p>
              </div>
            </header>

            {/* Dominant Hero Featured Story */}
            <HeroFeatured
              article={leadArticle}
              onReadArticle={handleOpenArticle}
            />

            {/* Substantial Useful Article Content & Question-Based H2s for Homepage */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-stone-200/90">
              <div className="max-w-4xl space-y-12">
                
                {/* Question-Based Heading 1 with Immediate Direct Answer */}
                <article className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                    What is Maharashtra cuisine known for?
                  </h2>
                  <div className="text-base text-stone-700 leading-relaxed font-sans space-y-3">
                    <p className="font-medium text-stone-900">
                      Maharashtra cuisine is known for its remarkable regional diversity, spanning coconut-rich coastal seafood and fragrant solkadhi along the Konkan to fiery mutton broths in Kolhapur and wholesome millet flatbreads across the Deccan plateau. It masterfully balances the six Ayurvedic tastes (Shadrasas) through indigenous staples like goda masala, roasted peanuts, kokum, jowar, and cold-pressed peanut oil.
                    </p>
                    <p>
                      Geographically split between the humid Arabian Sea coastline and the dry interior plateaus of the Sahyadri ranges, Maharashtrian food relies on micro-climatic terroir. Coastal kitchens celebrate fresh catch and wild berries like <em>Tirphal</em>, while inland farming communities in Khandesh, Marathwada, and Vidarbha champion drought-resilient grains, flame-roasted whole spices, and rich legume curries.
                    </p>
                  </div>
                </article>

                {/* Question-Based Heading 2 with Immediate Direct Answer */}
                <article className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                    What is the traditional food of Maharashtra?
                  </h2>
                  <div className="text-base text-stone-700 leading-relaxed font-sans space-y-3">
                    <p className="font-medium text-stone-900">
                      The traditional food of Maharashtra includes iconic culinary preparations such as Puran Poli, Varan Bhaat, Pithla Bhakri, Kolhapuri tambda rassa, Malvani fish curry, and beloved street snacks like vada pav and misal pav. These time-tested dishes celebrate seasonal eating, agrarian resilience, and deep hospitality rooted in the historic Pangat communal banquet tradition.
                    </p>
                    <p>
                      At the heart of festive dining sits the sacred Maharashtrian thali, organized with mathematical geometry on a freshly cut banana leaf. Salt sits as the cosmic anchor at the top-center, accompanied on the left by palate-stimulating chutneys and pickles, while hand-patted bhakris, puran polis, and golden lentils nourish the diner from the right.
                    </p>
                  </div>
                </article>

                {/* Signature Cuisines Showcase with Descriptive Anchor Links */}
                <article className="space-y-4 pt-4 border-t border-stone-200">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                    Famous Regional Dishes & Culinary Specialties of Maharashtra
                  </h2>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    Explore our in-depth chronicles covering Maharashtra’s most famous culinary traditions, each complete with historical context, ingredient profiles, and heritage recipes:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <a
                      href="/maharashtrian-street-food"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenArticle('maharashtrian-street-food');
                      }}
                      className="p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-800 hover:shadow-md transition-all group block"
                    >
                      <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                        Mumbai & Urban Centers
                      </span>
                      <h3 className="font-serif text-base font-bold text-stone-950 group-hover:text-amber-900 transition-colors mb-2">
                        Maharashtrian Street Food: Famous Local Dishes
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        Discover Maharashtrian street food, including vada pav, misal pav and other popular local snacks.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-3">
                        Read street food guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>

                    <a
                      href="/kolhapuri-cuisine"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenArticle('kolhapuri-cuisine');
                      }}
                      className="p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-800 hover:shadow-md transition-all group block"
                    >
                      <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                        Royal Maratha Heartland
                      </span>
                      <h3 className="font-serif text-base font-bold text-stone-950 group-hover:text-amber-900 transition-colors mb-2">
                        Kolhapuri Cuisine: Famous Dishes and Flavours
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        Discover Kolhapuri cuisine, famous for bold spices, Kolhapuri misal and tambda rassa.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-3">
                        Read Kolhapuri guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>

                    <a
                      href="/malvani-cuisine"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenArticle('malvani-cuisine');
                      }}
                      className="p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-800 hover:shadow-md transition-all group block"
                    >
                      <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                        South Konkan Coast
                      </span>
                      <h3 className="font-serif text-base font-bold text-stone-950 group-hover:text-amber-900 transition-colors mb-2">
                        Malvani Cuisine: Traditional Coastal Food
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        Explore Malvani cuisine from Maharashtra's Konkan coast, including fish curry, coconut-based dishes and aromatic Malvani masala.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-3">
                        Read Malvani guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://www.maharashtratourism.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-stone-600 hover:text-stone-900 underline decoration-stone-300 hover:decoration-stone-600 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Explore official Maharashtra tourism culinary heritage attractions</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>

              </div>
            </section>

            {/* Articles Gallery Section: All 11 Chronicles */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
              
              {/* Section Kicker */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-stone-200/90 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1 font-sans">
                    Complete Anthology
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    The Complete Pangat Chronicles (11 Essays)
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
                    Try adjusting your search query, or clear your dietary or spice filters to view all 11 Maharashtrian culinary essays.
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
                  <a
                    href="/regional-cuisines"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectTab('regions');
                    }}
                    className="px-5 py-2.5 bg-amber-900 text-stone-100 text-xs font-medium rounded-lg hover:bg-amber-950 transition-colors flex items-center gap-2 group"
                  >
                    <span>Explore Terroirs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/spice-heritage"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectTab('spices');
                    }}
                    className="px-4 py-2.5 bg-white text-stone-800 border border-stone-300 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    Spice Atlas
                  </a>
                </div>
              </div>

            </section>
          </div>
        )}
      </main>

      {/* Editorial Footer with Clean URLs */}
      <Footer
        onSelectTab={handleSelectTab}
        onSelectRegion={(reg) => {
          setSelectedRegion(reg);
          handleSelectTab('articles');
        }}
        onReadArticle={handleOpenArticle}
        onOpenShortUrls={() => setShortUrlModalOpen(true)}
      />

      {/* Interactive Short URLs Directory Modal */}
      <ShortUrlModal
        isOpen={shortUrlModalOpen}
        onClose={() => setShortUrlModalOpen(false)}
        onNavigate={(path) => {
          const cleanPath = path.replace(/^\/+|\/+$/g, '');
          if (!cleanPath) {
            handleBackToHome();
          } else if (cleanPath === 'regional-cuisines' || cleanPath === 'regions') {
            handleSelectTab('regions');
          } else if (cleanPath === 'spice-heritage' || cleanPath === 'spices') {
            handleSelectTab('spices');
          } else if (cleanPath === 'about') {
            handleSelectTab('about');
          } else if (cleanPath === 'bookmarks' || cleanPath === 'saved') {
            handleSelectTab('bookmarks');
          } else {
            handleOpenArticle(cleanPath);
          }
        }}
      />
    </div>
  );
}
