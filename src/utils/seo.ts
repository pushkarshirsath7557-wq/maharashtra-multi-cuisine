export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  authorName?: string;
  structuredData?: Record<string, unknown>;
}

export function updateDocumentSeo(config: PageSeoConfig): void {
  // 1. Update Title
  document.title = config.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attribute: 'name' | 'property', name: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update Standard Meta Tags
  setMetaTag('name', 'description', config.description);
  if (config.keywords) {
    setMetaTag('name', 'keywords', config.keywords);
  }

  // 4. Update Canonical Link
  const fullCanonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${config.canonicalPath}`
    : `https://maharashtra-multi-cuisine-silk.vercel.app${config.canonicalPath}`;

  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonicalUrl);

  // 5. OpenGraph Tags
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:type', config.type || 'website');
  if (config.imageUrl) {
    const fullImageUrl = config.imageUrl.startsWith('http')
      ? config.imageUrl
      : `${window.location.origin}${config.imageUrl}`;
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('name', 'twitter:image', fullImageUrl);
  }

  // 6. Twitter Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);

  // 7. Structured Data (JSON-LD)
  let scriptLd = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
  if (!scriptLd) {
    scriptLd = document.createElement('script');
    scriptLd.id = 'seo-jsonld';
    scriptLd.type = 'application/ld+json';
    document.head.appendChild(scriptLd);
  }

  if (config.structuredData) {
    scriptLd.textContent = JSON.stringify(config.structuredData);
  }
}
