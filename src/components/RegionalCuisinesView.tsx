import React from 'react';
import { ArrowRight, Compass, MapPin } from 'lucide-react';
import { RegionType } from '../types/blog';

interface RegionalCuisinesViewProps {
  onSelectRegionAndFilter: (region: RegionType) => void;
  onReadArticle: (articleId: string) => void;
}

interface RegionInfo {
  name: RegionType;
  title: string;
  marathiName: string;
  landscape: string;
  flavorSummary: string;
  keyStaples: string[];
  flagshipArticleId: string;
}

const REGIONS: RegionInfo[] = [
  {
    name: 'Konkan & Malvan',
    title: 'The Coastal Belt & Estuaries',
    marathiName: 'कोकण आणि मालवण',
    landscape: 'Sun-drenched Arabian Sea coastline, red laterite cliffs, coconut groves, and mangrove backwaters.',
    flavorSummary: 'Tart, fresh, aromatic: anchored by Kokum (Aamsul), fresh wet coconut, wild Tirphal, and morning catch.',
    keyStaples: ['Surmai & Pomfret Curry', 'Solkadhi', 'Ghavane (Rice Crepes)', 'Tisrya Masala (Clams)'],
    flagshipArticleId: 'konkan-malvan-coastal-alchemy'
  },
  {
    name: 'Kolhapur',
    title: 'The Royal Maratha Heartland',
    marathiName: 'कोल्हापूर संस्थान',
    landscape: 'Panchganga river basin, historic wrestling akharas, royal palaces, and sugarcane country.',
    flavorSummary: 'Bold, royal, and binary: fiery red Tambda Rassa paired with soothing, ivory-white Pandhra Rassa.',
    keyStaples: ['Tambda Rassa', 'Pandhra Rassa', 'Mutton Sukka', 'Jowar Bhakri', 'Kolhapuri Misal'],
    flagshipArticleId: 'kolhapur-royal-rassa-tambda-pandhra'
  },
  {
    name: 'Vidarbha & Saoji',
    title: 'The Cotton Belt & Forested East',
    marathiName: 'विदर्भ आणि सावजी',
    landscape: 'Arid black cotton soils, teak forests of Tadoba, and historic handloom weaving settlements in Nagpur.',
    flavorSummary: 'Complex, persistent heat: slow-rendered whole spices, Dagad Phool, poppy seeds, and fiery floating Tarri.',
    keyStaples: ['Saoji Mutton / Chicken', 'Patodi Rassa', 'Gola Bhaat', 'Poha Chivda'],
    flagshipArticleId: 'fire-of-vidarbha-saoji-cuisine'
  },
  {
    name: 'Khandesh',
    title: 'The Tapi Basin & Northern Edge',
    marathiName: 'खानदेश परिसर',
    landscape: 'Satpura mountain ranges, fertile banana plantations of Jalgaon, and dry plateau highways.',
    flavorSummary: 'Smoky, midnight-dark: charcoal-roasted coconut and coriander seeds in iron pots, yielding deep umami.',
    keyStaples: ['Shev Bhaji', 'Jalgaon Baingan Bharta', 'Kalna Puri', 'Khandeshi Khichdi'],
    flagshipArticleId: 'khandesh-black-gold-kala-masala-shev-bhaji'
  },
  {
    name: 'Pune & Desh',
    title: 'The Western Ghats Foothills',
    marathiName: 'पुणे आणि देश',
    landscape: 'Sahyadri river valleys, historic Peshwa wadas, fertile Krishna and Bhima river plains.',
    flavorSummary: 'Gentle, balanced, sweet-tangy: stone flower and cinnamon-infused Goda Masala, jaggery, and pure cow ghee.',
    keyStaples: ['Varan Bhaat with Toop', 'Puran Poli', 'Katachi Amti', 'Bharli Vangi', 'Matar Karanji'],
    flagshipArticleId: 'brahmin-kitchens-of-pune-goda-masala'
  },
  {
    name: 'Marathwada',
    title: 'The Historic Arid Plateau',
    marathiName: 'मराठवाडा',
    landscape: 'Semi-arid basalt plateaus, Ajanta & Ellora caves, ancient Godavari river towns.',
    flavorSummary: 'Rustic, nourishing, and resilient: dryland millets, golden gram flour stews, and cast-iron pounded garlic thecha.',
    keyStaples: ['Pithla Bhakri', 'Mirchi cha Thecha', 'Zunka', 'Sesame Bajra Bhakri'],
    flagshipArticleId: 'marathwada-rustic-resilience-pithla-bhakri'
  }
];

export const RegionalCuisinesView: React.FC<RegionalCuisinesViewProps> = ({
  onSelectRegionAndFilter,
  onReadArticle
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-semibold">
          Culinary Topography
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-3">
          The Regional Multi-Cuisines of Maharashtra
        </h2>
        <p className="text-base text-stone-600 leading-relaxed font-sans">
          Maharashtra spans over 300,000 square kilometers, encompassing high-rainfall coastal belts, fertile river deltas, and dry rain-shadow plateaus. Each distinct ecosystem has nurtured a culinary idiom with unique spice blends, cooking fats, and signature staples.
        </p>
      </div>

      {/* 6-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONS.map((reg) => (
          <div
            key={reg.name}
            className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-700 font-sans mb-1">
                <span className="uppercase tracking-wider font-semibold text-amber-800">
                  {reg.name}
                </span>
                <span className="text-stone-700 font-medium">{reg.marathiName}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-stone-950 mb-2">
                {reg.title}
              </h3>

              <p className="text-xs text-stone-600 italic mb-3 font-serif">
                {reg.landscape}
              </p>

              <p className="text-xs text-stone-700 leading-relaxed font-sans mb-4">
                {reg.flavorSummary}
              </p>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-600 font-semibold block mb-1.5">
                  Canon Preparations:
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] text-stone-600 font-sans">
                  {reg.keyStaples.map((staple, sIdx) => (
                    <span key={staple} className="text-stone-700">
                      {staple} {sIdx < reg.keyStaples.length - 1 && <span className="text-stone-300">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onReadArticle(reg.flagshipArticleId)}
                className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 group"
              >
                <span>Read Chronicle</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectRegionAndFilter(reg.name)}
                className="px-2.5 py-1 text-[11px] font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
              >
                Filter Articles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
