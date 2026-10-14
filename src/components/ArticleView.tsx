import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Clock, 
  Flame, 
  ChefHat, 
  Quote, 
  CheckCircle2, 
  Send, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Printer
} from 'lucide-react';
import { BlogArticle, UserComment } from '../types/blog';

interface ArticleViewProps {
  article: BlogArticle;
  allArticles: BlogArticle[];
  onBack: () => void;
  onReadArticle: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e?: React.MouseEvent) => void;
  comments: UserComment[];
  onAddComment: (comment: Omit<UserComment, 'id' | 'date'>) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
  comments,
  onAddComment,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'relaxed'>('standard');
  const [copiedToast, setCopiedToast] = useState(false);

  // New comment form state
  const [commentName, setCommentName] = useState('');
  const [commentLocation, setCommentLocation] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll to top upon opening article
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    onAddComment({
      articleId: article.id,
      author: commentName.trim(),
      comment: commentText.trim(),
      location: commentLocation.trim() || 'Maharashtra',
    });

    setCommentName('');
    setCommentLocation('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  const articleComments = comments.filter((c) => c.articleId === article.id);

  // Related articles (excluding current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-[1.9]';
      case 'relaxed':
        return 'text-xl leading-[2.1]';
      case 'standard':
      default:
        return 'text-base leading-[1.8]';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* Reading Progress Bar (Fixed Top) */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-800 z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Navigation Bar */}
      <div className="sticky top-20 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chronicles</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size adjuster */}
            <div className="hidden sm:flex items-center p-0.5 bg-stone-200/70 rounded-md border border-stone-300/60 text-xs">
              <button
                onClick={() => setFontSize('standard')}
                className={`px-2 py-0.5 rounded font-mono ${fontSize === 'standard' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'}`}
                title="Standard Text Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded font-mono text-sm ${fontSize === 'large' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'}`}
                title="Large Text Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('relaxed')}
                className={`px-2 py-0.5 rounded font-mono text-base ${fontSize === 'relaxed' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'}`}
                title="Relaxed Reading Size"
              >
                A++
              </button>
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors hidden sm:block"
              title="Print Article"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md border border-stone-300 transition-colors"
              title="Share article link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all border ${
                isBookmarked
                  ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                  : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Article link copied to clipboard</span>
        </div>
      )}

      {/* Main Article Content Container (Constrained measure 65-75ch) */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* Curatorial Kicker & Region (Clean unboxed text with typographic separators) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-700 tracking-wider font-sans mb-4">
          <span className="text-amber-800 font-semibold uppercase">{article.region}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{article.category}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{article.diet}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-amber-800">
            <Flame className="w-3.5 h-3.5" />
            {article.spiceLevel} Heat
          </span>
        </div>

        {/* Article Headline */}
        <h1 
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 leading-[1.18] tracking-tight mb-4"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h1>

        {/* Subtitle Deck */}
        <p className="text-lg sm:text-xl text-stone-700 font-serif italic leading-relaxed mb-6 border-b border-stone-200/80 pb-6">
          {article.subtitle}
        </p>

        {/* Author Byline & Accession Details */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 text-xs text-stone-600 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-900 text-stone-100 flex items-center justify-center font-serif text-sm font-semibold">
              {article.author.avatarText}
            </div>
            <div>
              <p className="font-semibold text-stone-900 text-sm">{article.author.name}</p>
              <p className="text-stone-500">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-stone-500 font-mono text-[11px] tabular-nums">
            <span>Published {article.publishedDate}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Lead Hero Visual Framing */}
        <figure className="mb-10">
          <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-md aspect-[16/10] bg-stone-100">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-xs font-serif italic text-stone-600 text-center mt-3">
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Key Highlights Card */}
        {article.keyHighlights && article.keyHighlights.length > 0 && (
          <div className="mb-10 p-6 bg-[#F6F1EA] border border-stone-200 rounded-xl">
            <h3 className="font-serif text-base font-bold text-amber-950 uppercase tracking-wider mb-3">
              Essential Culinary Tenets
            </h3>
            <ul className="space-y-2 text-sm text-stone-800 leading-relaxed">
              {article.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-800 font-bold shrink-0 mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Introduction with Drop Cap */}
        <div className={`prose-editorial ${getFontSizeClass()} mb-10`}>
          {article.introduction.map((para, idx) => (
            <p 
              key={idx}
              className={idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-900' : ''}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {article.sections.map((section, sIdx) => (
            <section key={sIdx} className="border-t border-stone-200/80 pt-8">
              
              {/* Section Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-2">
                {section.heading}
              </h2>
              {section.subheading && (
                <h3 className="text-sm font-sans uppercase tracking-widest text-amber-900 font-semibold mb-4">
                  {section.subheading}
                </h3>
              )}

              {/* Section Paragraphs */}
              <div className={`prose-editorial ${getFontSizeClass()} space-y-4`}>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Pull Quote (if provided) */}
              {section.quote && (
                <div className="my-8 py-6 px-8 border-y border-stone-300/80 bg-stone-50/70 text-center">
                  <blockquote className="font-serif italic text-lg sm:text-xl text-stone-800 leading-relaxed max-w-xl mx-auto">
                    "{section.quote}"
                  </blockquote>
                  {section.quoteAttribution && (
                    <cite className="block not-italic text-xs font-sans uppercase tracking-wider text-stone-500 mt-3">
                      — {section.quoteAttribution}
                    </cite>
                  )}
                </div>
              )}

              {/* Ingredient Spotlight Box */}
              {section.ingredientSpotlight && (
                <div className="my-6 p-5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-xs font-sans uppercase tracking-wider text-amber-900 font-bold">
                    <span>Indigenous Ingredient Spotlight</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      {section.ingredientSpotlight.name}
                    </h4>
                    {section.ingredientSpotlight.marathiName && (
                      <span className="text-sm text-stone-600 font-sans">
                        ({section.ingredientSpotlight.marathiName})
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    {section.ingredientSpotlight.description}
                  </p>
                </div>
              )}

            </section>
          ))}
        </div>

        {/* Recipe Blueprint Box (if available) */}
        {article.recipeHighlight && (
          <div className="mt-12 p-6 sm:p-8 bg-[#F5EFE6] border border-stone-300 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-300 pb-4 mb-5">
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-bold">
                  Heritage Recipe Blueprint
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-950 mt-1">
                  {article.recipeHighlight.dishName}
                </h3>
                <span className="text-xs text-stone-600">
                  {article.recipeHighlight.marathiName}
                </span>
              </div>
              <div className="text-right text-xs text-stone-600 font-mono space-y-0.5">
                <div>Prep: {article.recipeHighlight.prepTime}</div>
                <div>Cook: {article.recipeHighlight.cookTime}</div>
                <div>Yield: {article.recipeHighlight.servings}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800 mb-2">
                  Key Ingredients Matrix
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {article.recipeHighlight.keyIngredients.map((ing, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-stone-300/80">
                <p className="text-xs text-stone-800 leading-relaxed">
                  <strong className="text-amber-950 font-semibold">Master Cook's Pro Tip: </strong>
                  {article.recipeHighlight.proTip}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Conclusion Section */}
        <section className="mt-12 pt-8 border-t border-stone-200/90">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
            Curatorial Epilogue
          </h2>
          <div className={`prose-editorial ${getFontSizeClass()}`}>
            <p className="text-stone-800 font-serif italic text-lg leading-relaxed">
              {article.conclusion}
            </p>
          </div>
        </section>

        {/* Article Tags (Clean unboxed text with typographic separators) */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="font-semibold text-stone-700">Chronicle Tags:</span>
          {article.tags.map((tag, tIdx) => (
            <React.Fragment key={tag}>
              <span className="text-stone-700 font-medium">#{tag}</span>
              {tIdx < article.tags.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-6 bg-white border border-stone-200 rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-900 text-stone-100 flex items-center justify-center font-serif text-xl font-bold shrink-0">
            {article.author.avatarText}
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-stone-900">
              {article.author.name}
            </h4>
            <p className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2">
              {article.author.role}
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dr. Deshmukh and our culinary contributors conduct primary field research across Maharashtra's 36 districts, interviewing matriarchs, temple cooks, and pehelwans to archive endangered cooking techniques.
            </p>
          </div>
        </div>

        {/* Community Dialogue / Comments Section */}
        <section className="mt-14 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Pangat Table Dialogue
            </h3>
            <span className="text-xs text-stone-500 font-mono tabular-nums">
              {articleComments.length} {articleComments.length === 1 ? 'reflection' : 'reflections'}
            </span>
          </div>

          {/* Comment submission form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 p-5 bg-stone-100/70 border border-stone-200 rounded-xl space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">
              Share Your Family Tradition or Reflection
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your Name (e.g. Anand Paranjape)"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
              />
              <input
                type="text"
                value={commentLocation}
                onChange={(e) => setCommentLocation(e.target.value)}
                placeholder="City / Region (e.g. Kolhapur, Ratnagiri)"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
              />
            </div>

            <textarea
              required
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What memories, recipes, or regional nuances does this chronicle evoke for you?"
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-stone-500 italic">
                {commentSubmitted ? '✓ Thank you! Your reflection has been seated at the table.' : 'All community dialogues are published respectfully.'}
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-900 text-stone-100 text-xs font-medium rounded-lg hover:bg-amber-950 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Seat Reflection</span>
              </button>
            </div>
          </form>

          {/* List of comments */}
          <div className="space-y-4">
            {articleComments.length === 0 ? (
              <p className="text-xs text-stone-500 italic py-4 text-center">
                Be the first to seat your reflection at this chronicle's table.
              </p>
            ) : (
              articleComments.map((com) => (
                <div key={com.id} className="p-4 bg-white border border-stone-200 rounded-lg shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-900">
                      {com.author} {com.location && <span className="font-normal text-stone-500">· {com.location}</span>}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">{com.date}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {com.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Articles Carousel / Grid */}
        <section className="mt-16 pt-10 border-t border-stone-300">
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
            Continue Journeying Across Maharashtra
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onReadArticle(rel.id)}
                className="group cursor-pointer bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[11px] text-amber-800 font-semibold mb-1">
                      {rel.region} · {rel.category}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-950 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>{rel.readTime}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
};
