export type RegionType = 
  | 'All'
  | 'Pan-Maharashtra'
  | 'Konkan & Malvan'
  | 'Kolhapur'
  | 'Vidarbha & Saoji'
  | 'Khandesh'
  | 'Pune & Desh'
  | 'Marathwada'
  | 'Mumbai & Street';

export type SpiceLevel = 'Mild' | 'Medium' | 'Fiery' | 'Blazing';

export interface Author {
  name: string;
  role: string;
  avatarText: string;
}

export interface ArticleSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  quote?: string;
  quoteAttribution?: string;
  ingredientSpotlight?: {
    name: string;
    marathiName?: string;
    description: string;
  };
}

export interface RecipeHighlight {
  dishName: string;
  marathiName: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  keyIngredients: string[];
  proTip: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  subtitle: string;
  region: RegionType;
  category: string;
  diet: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  spiceLevel: SpiceLevel;
  readTime: string;
  publishedDate: string;
  author: Author;
  image: string;
  imageCaption: string;
  imageAlt?: string;
  excerpt: string;
  introduction: string[];
  keyHighlights: string[];
  sections: ArticleSection[];
  recipeHighlight?: RecipeHighlight;
  conclusion: string;
  tags: string[];
  featured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  mainKeyword?: string;
  relatedKeywords?: string[];
  canonicalUrl?: string;
  h1Title?: string;
}

export interface UserComment {
  id: string;
  articleId: string;
  author: string;
  date: string;
  comment: string;
  location?: string;
}
