import React from 'react';
import { Search, Flame, SlidersHorizontal, Check } from 'lucide-react';
import { REGIONAL_FILTERS } from '../data/articles';
import { RegionType, SpiceLevel } from '../types/blog';

interface RegionalFilterBarProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDiet: 'All' | 'Vegetarian' | 'Non-Vegetarian';
  onSelectDiet: (diet: 'All' | 'Vegetarian' | 'Non-Vegetarian') => void;
  selectedSpice: 'All' | SpiceLevel;
  onSelectSpice: (spice: 'All' | SpiceLevel) => void;
  totalCount: number;
}

export const RegionalFilterBar: React.FC<RegionalFilterBarProps> = ({
  selectedRegion,
  onSelectRegion,
  searchQuery,
  onSearchChange,
  selectedDiet,
  onSelectDiet,
  selectedSpice,
  onSelectSpice,
  totalCount
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Top Search & Micro-Toggles */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by dish, spice, region, or technique..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 focus:border-amber-800 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Secondary Diet and Spice Segmented Selectors */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Diet selector */}
          <div className="flex items-center p-1 bg-stone-200/70 rounded-lg border border-stone-300/60">
            {(['All', 'Vegetarian', 'Non-Vegetarian'] as const).map((diet) => (
              <button
                key={diet}
                onClick={() => onSelectDiet(diet)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap shrink-0 ${
                  selectedDiet === diet
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {diet === 'All' ? 'All Diets' : diet}
              </button>
            ))}
          </div>

          {/* Spice selector */}
          <div className="flex items-center p-1 bg-stone-200/70 rounded-lg border border-stone-300/60">
            <span className="px-2 text-stone-500 font-medium flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-700" />
            </span>
            {(['All', 'Mild', 'Medium', 'Fiery', 'Blazing'] as const).map((spice) => (
              <button
                key={spice}
                onClick={() => onSelectSpice(spice)}
                className={`px-2 py-1 rounded-md font-medium transition-all whitespace-nowrap shrink-0 ${
                  selectedSpice === spice
                    ? 'bg-amber-900 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {spice}
              </button>
            ))}
          </div>

          {/* Result counter */}
          <span className="text-xs text-stone-500 font-mono tabular-nums pl-1">
            {totalCount} {totalCount === 1 ? 'chronicle' : 'chronicles'}
          </span>
        </div>
      </div>

      {/* Regional Segmented Buttons / Tabs */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max p-1 bg-stone-100 border border-stone-200/80 rounded-xl">
          {REGIONAL_FILTERS.map((rf) => {
            const isActive = selectedRegion === rf.id;
            return (
              <button
                key={rf.id}
                onClick={() => onSelectRegion(rf.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-900 text-stone-50 shadow-xs font-semibold'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
              >
                {rf.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
