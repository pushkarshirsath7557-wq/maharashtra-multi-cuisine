import React from 'react';
import { BookOpen, MapPin, Feather, HeartHandshake } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Editorial Header */}
      <div className="border-b border-stone-300 pb-8 mb-10">
        <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-semibold block mb-1">
          Curatorial Manifesto
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          Pangat: The Sacred Living Table of Maharashtra
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-stone-700 mt-4 leading-relaxed">
          "A Pangat is more than people dining in a row; it is a vow of equality, where every soul receives the same seasonal blessing from the earth."
        </p>
      </div>

      {/* Main Prose */}
      <div className="prose-editorial text-base sm:text-lg text-stone-800 space-y-6">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-900">
          The Marathi word <strong className="font-serif font-bold text-stone-900">Pangat (पांगत)</strong> derives from the Sanskrit <em className="font-serif">Pankti</em>—signifying a dignified row of seated diners gathered in egalitarian fellowship. At a traditional feast, kings and farmers, scholars and artisans sat side by side on wooden patters, with banana leaves unfurled before them. No one was served until all were seated, and no one rose until all had eaten to their heart's content.
        </p>

        <p>
          Too often in contemporary global gastronomy, Indian cuisine is collapsed into a single generic caricature dominated by heavy cream, restaurant butter chicken, and generic garam masala. This journal was founded to dismantle that myth by archiving the astonishing diversity of Maharashtra's multi-cuisine landscape.
        </p>

        <h2 className="font-serif text-2xl font-bold text-stone-900 pt-4">
          The Six Micro-Climates of Taste
        </h2>
        <p>
          Within Maharashtra’s borders exist culinary traditions as distinct as nations in Europe. The coconut and kokum-drenched fish curries of Malvan have virtually nothing in common with the fiery, 24-spice black stews of the Halba Koshti weavers in Vidarbha. The royal dual-rassa broths of Kolhapur reflect Maratha military heritage, while the stone-flower-scented Goda Masala of Pune reflects monastic Brahmin restraint. In Khandesh, spices are intentionally smoke-roasted to the edge of darkness, while in Marathwada, dryland millets and pounded garlic thechas testify to agrarian survival against drought.
        </p>

        <div className="my-8 p-6 bg-[#F5EFE6] border border-stone-200/90 rounded-2xl">
          <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">
            The Literary Lineage We Honor
          </h3>
          <ul className="space-y-3 text-sm text-stone-700">
            <li>
              <strong className="text-stone-900">Manasollasa (1129 CE): </strong>
              The 12th-century Sanskrit encyclopaedia composed by Kalyani Chalukya King Someshvara III, which first documented marinating meat with sour pomegranate and slow-simmering lentils with asafoetida in the Deccan.
            </li>
            <li>
              <strong className="text-stone-900">Bhojana Kutuhala (1675 CE): </strong>
              Raghunatha Navahasta’s treatise exploring the medicinal chemistry and sequential digestive harmony of Western Indian foods.
            </li>
            <li>
              <strong className="text-stone-900">Ruchira (1970): </strong>
              Kamalabai Ogale’s monumental modern cookbook that codified home recipes and elevated everyday Maharashtrian domestic culinary art into a national classic.
            </li>
          </ul>
        </div>

        <h2 className="font-serif text-2xl font-bold text-stone-900 pt-4">
          Our Editorial Principles
        </h2>
        <p>
          Every article published in Pangat adheres to three strict commitments:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-stone-800">
          <li><strong>No Restaurant Shortcuts:</strong> We celebrate indigenous home and rural techniques—from sun-drying Sandge on summer terraces to hand-patting Jowar Bhakris on iron tawas.</li>
          <li><strong>Zero Synthetic Flavoring:</strong> We document how ancient natural souring agents (Kokum, raw mango, tamarind) and indigenous aromatics (Tirphal, Dagad Phool, Nagkeshar) provide superior complexity.</li>
          <li><strong>Honoring the Hands:</strong> We credit the matriarchs, farmers, mill workers, pehelwans, and fisherfolk whose daily labor created this rich culinary tapestry.</li>
        </ol>
      </div>
    </div>
  );
};
