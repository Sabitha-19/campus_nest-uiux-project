import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  MapPin,
  List,
  Map as MapIcon,
  RotateCcw,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import { ACCOMMODATIONS } from '../data/accommodations';
import { PropertyCard } from '../components/common/PropertyCard';
import { useApp } from '../context/AppContext';

export const Explore: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);

  const availableFacilities = ['Wi-Fi', 'Meals', 'AC', 'Laundry', 'Security', 'Study Desk'];

  // Real filtering and sorting logic
  const filteredListings = useMemo(() => {
    return ACCOMMODATIONS.filter((item) => {
      // Query filter: matches title, area, collegeNearby, or city
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.area.toLowerCase().includes(q) ||
          item.collegeNearby.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.colleges.some((c) => c.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Budget filter
      if (item.monthlyRent > filters.budgetMax) {
        return false;
      }

      // Distance filter
      if (item.distanceKm > filters.distanceMax) {
        return false;
      }

      // Type filter
      if (filters.type !== 'All' && item.type !== filters.type) {
        return false;
      }

      // Gender filter
      if (filters.gender !== 'All' && item.genderPreference !== filters.gender && item.genderPreference !== 'Unisex') {
        return false;
      }

      // Facilities filter
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((f) =>
          item.facilities.some((itemF) => itemF.toLowerCase() === f.toLowerCase())
        );
        if (!hasAllFacilities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.monthlyRent - b.monthlyRent;
      if (filters.sortBy === 'price-desc') return b.monthlyRent - a.monthlyRent;
      if (filters.sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [filters]);

  const toggleFacility = (facility: string) => {
    setFilters((prev) => {
      const exists = prev.facilities.includes(facility);
      return {
        ...prev,
        facilities: exists ? prev.facilities.filter((f) => f !== facility) : [...prev.facilities, facility]
      };
    });
  };

  const removeChip = (key: string, value?: string) => {
    setFilters((prev) => {
      if (key === 'search') return { ...prev, searchQuery: '' };
      if (key === 'type') return { ...prev, type: 'All' };
      if (key === 'gender') return { ...prev, gender: 'All' };
      if (key === 'budget') return { ...prev, budgetMax: 20000 };
      if (key === 'distance') return { ...prev, distanceMax: 5 };
      if (key === 'facility' && value) {
        return { ...prev, facilities: prev.facilities.filter((f) => f !== value) };
      }
      return prev;
    });
  };

  // Check active chips
  const activeChips: { key: string; label: string; value?: string }[] = [];
  if (filters.searchQuery) activeChips.push({ key: 'search', label: `Keyword: "${filters.searchQuery}"` });
  if (filters.type !== 'All') activeChips.push({ key: 'type', label: `Type: ${filters.type}` });
  if (filters.gender !== 'All') activeChips.push({ key: 'gender', label: `Gender: ${filters.gender}` });
  if (filters.budgetMax < 20000) activeChips.push({ key: 'budget', label: `Max ₹${filters.budgetMax.toLocaleString('en-IN')}` });
  if (filters.distanceMax < 5) activeChips.push({ key: 'distance', label: `Within ${filters.distanceMax} km` });
  filters.facilities.forEach((f) => activeChips.push({ key: 'facility', label: f, value: f }));

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-24 pb-20">
      {/* Sticky Search & Bar */}
      <div className="sticky top-16 z-30 bg-[#F7F1E8]/95 backdrop-blur-md border-b border-[#D99A8F]/50 py-3 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#B85C52] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search college (SRM, Loyola, Anna Univ), area or city..."
                className="w-full h-11 pl-10 pr-9 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] placeholder:text-[#756762]/70 focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756762] hover:text-[#2D2421]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Actions: Filter Drawer Button (mobile), View Mode Toggle, Result Count */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 h-11 px-4 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-semibold text-[#2D2421]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#B85C52]" />
                <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
              </button>

              {/* List / Map Toggle */}
              <div className="flex items-center rounded-full bg-[#FFFDF9] border border-[#D99A8F] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-[#B85C52] text-[#FFFDF9]' : 'text-[#756762] hover:text-[#2D2421]'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    viewMode === 'map' ? 'bg-[#B85C52] text-[#FFFDF9]' : 'text-[#756762] hover:text-[#2D2421]'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                className="h-11 px-3 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-medium text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="distance">Nearest to Campus</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Active Chips Row */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <span className="text-xs text-[#756762]">Filters:</span>
              {activeChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    onClick={() => removeChip(chip.key, chip.value)}
                    className="hover:text-[#B85C52]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#B85C52] hover:underline flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area: Sidebar Filters + Cards Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-4">
          <p className="text-sm text-[#756762]">
            Showing <strong className="text-[#2D2421]">{filteredListings.length}</strong> student accommodations near Chennai campuses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-36 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-5 shadow-[0_12px_32px_rgba(45,36,33,0.06)] space-y-6">
              <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#2D2421]">Refine Search</h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#B85C52] hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Budget Range Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#2D2421]">
                  <span>Monthly Budget</span>
                  <span className="text-[#B85C52]">Up to ₹{filters.budgetMax.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="6000"
                  max="20000"
                  step="500"
                  value={filters.budgetMax}
                  onChange={(e) => setFilters((prev) => ({ ...prev, budgetMax: Number(e.target.value) }))}
                  className="w-full accent-[#B85C52]"
                />
                <div className="flex justify-between text-[10px] text-[#756762]">
                  <span>₹6,000</span>
                  <span>₹20,000+</span>
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#2D2421]">
                  <span>Max Distance from Campus</span>
                  <span className="text-[#B85C52]">{filters.distanceMax} km</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={filters.distanceMax}
                  onChange={(e) => setFilters((prev) => ({ ...prev, distanceMax: Number(e.target.value) }))}
                  className="w-full accent-[#B85C52]"
                />
                <div className="flex justify-between text-[10px] text-[#756762]">
                  <span>500m</span>
                  <span>5 km</span>
                </div>
              </div>

              {/* Accommodation Type */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#2D2421]">Accommodation Type</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['All', 'PG', 'Hostel', 'Shared Room', 'Flat'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, type: t }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        filters.type === t
                          ? 'bg-[#B85C52] text-[#FFFDF9]'
                          : 'bg-[#F7F1E8] text-[#2D2421] border border-[#D99A8F]/60 hover:bg-[#D99A8F]/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#2D2421]">Gender Preference</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['All', 'Boys', 'Girls'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        filters.gender === g
                          ? 'bg-[#B85C52] text-[#FFFDF9]'
                          : 'bg-[#F7F1E8] text-[#2D2421] border border-[#D99A8F]/60 hover:bg-[#D99A8F]/20'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities Checkboxes */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#2D2421]">Facilities Included</label>
                <div className="space-y-1.5">
                  {availableFacilities.map((facility) => {
                    const isChecked = filters.facilities.includes(facility);
                    return (
                      <label
                        key={facility}
                        className="flex items-center gap-2.5 text-xs text-[#2D2421] cursor-pointer hover:text-[#B85C52] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFacility(facility)}
                          className="rounded border-[#D99A8F] accent-[#B85C52] focus:ring-[#B85C52]"
                        />
                        <span>{facility}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Area: Listings Grid or Styled Map Area */}
          <div className="lg:col-span-3">
            {viewMode === 'map' ? (
              /* Styled Map Area with interactive pins */
              <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] overflow-hidden p-6 shadow-sm min-h-[540px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#D99A8F]/40">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#2D2421]">Interactive Campus Map</h3>
                      <p className="text-xs text-[#756762]">Click pins to inspect proximity to Chennai colleges</p>
                    </div>
                    <span className="text-xs bg-[#D99A8F]/30 text-[#2D2421] px-3 py-1 rounded-full border border-[#D99A8F]">
                      {filteredListings.length} Pins Active
                    </span>
                  </div>

                  {/* Visual Map Canvas in 7-Color Palette */}
                  <div className="relative mt-6 w-full h-[360px] rounded-2xl bg-[#F7F1E8] border border-[#D99A8F] overflow-hidden">
                    {/* Stylized road grid and campus boundaries */}
                    <svg viewBox="0 0 800 400" className="w-full h-full" fill="none">
                      {/* Campus green zones / lake */}
                      <path d="M50 80 Q140 20 220 90 T400 120" stroke="#D99A8F" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                      <path d="M100 240 Q300 200 500 280 T750 210" stroke="#D99A8F" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                      {/* Main arterial roads */}
                      <line x1="0" y1="150" x2="800" y2="150" stroke="#FFFDF9" strokeWidth="12" />
                      <line x1="0" y1="150" x2="800" y2="150" stroke="#756762" strokeWidth="1.5" strokeDasharray="8 8" />
                      <line x1="380" y1="0" x2="380" y2="400" stroke="#FFFDF9" strokeWidth="12" />
                      <line x1="380" y1="0" x2="380" y2="400" stroke="#756762" strokeWidth="1.5" strokeDasharray="8 8" />
                      {/* Metro line */}
                      <path d="M50 350 L750 50" stroke="#B85C52" strokeWidth="3" opacity="0.4" strokeDasharray="6 6" />

                      {/* College landmarks */}
                      <g transform="translate(180, 100)">
                        <rect x="-10" y="-10" width="130" height="30" rx="6" fill="#2D2421" />
                        <text x="55" y="10" fill="#FFFDF9" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                          🎓 SRM IST Campus
                        </text>
                      </g>
                      <g transform="translate(420, 80)">
                        <rect x="-10" y="-10" width="130" height="30" rx="6" fill="#2D2421" />
                        <text x="55" y="10" fill="#FFFDF9" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                          🎓 Loyola College
                        </text>
                      </g>
                      <g transform="translate(450, 260)">
                        <rect x="-10" y="-10" width="130" height="30" rx="6" fill="#2D2421" />
                        <text x="55" y="10" fill="#FFFDF9" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                          🎓 Anna University
                        </text>
                      </g>
                    </svg>

                    {/* Interactive pins */}
                    {filteredListings.slice(0, 8).map((prop, index) => {
                      // Distributed pseudo-coordinates
                      const positions = [
                        { left: '26%', top: '38%' },
                        { left: '60%', top: '32%' },
                        { left: '65%', top: '74%' },
                        { left: '78%', top: '65%' },
                        { left: '20%', top: '70%' },
                        { left: '55%', top: '48%' },
                        { left: '48%', top: '35%' },
                        { left: '82%', top: '42%' }
                      ];
                      const pos = positions[index % positions.length];
                      const isSelected = selectedMapPin === prop.id;

                      return (
                        <button
                          key={prop.id}
                          type="button"
                          onClick={() => setSelectedMapPin(prop.id)}
                          style={{ left: pos.left, top: pos.top }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-md transition-all hover:scale-110 z-20 ${
                            isSelected
                              ? 'bg-[#B85C52] text-[#FFFDF9] border-[#FFFDF9] ring-2 ring-[#B85C52]'
                              : 'bg-[#FFFDF9] text-[#2D2421] border-[#B85C52]'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C99A4A]" />
                          <span className="text-xs font-bold font-serif whitespace-nowrap">
                            ₹{prop.monthlyRent.toLocaleString('en-IN')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Pin Details Card */}
                {selectedMapPin && (
                  <div className="mt-4 p-4 rounded-xl bg-[#F7F1E8] border border-[#D99A8F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {(() => {
                      const prop = ACCOMMODATIONS.find((p) => p.id === selectedMapPin);
                      if (!prop) return null;
                      return (
                        <>
                          <div>
                            <span className="text-xs font-semibold text-[#B85C52]">
                              {prop.type} • {prop.roomSharing}
                            </span>
                            <h4 className="font-serif text-base font-bold text-[#2D2421]">{prop.title}</h4>
                            <p className="text-xs text-[#756762]">{prop.distanceText}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-lg font-bold text-[#2D2421]">
                              ₹{prop.monthlyRent.toLocaleString('en-IN')}/mo
                            </span>
                            <a
                              href={`/accommodation/${prop.id}`}
                              className="px-4 py-2 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421]"
                            >
                              View Details
                            </a>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : filteredListings.length === 0 ? (
              /* Empty State */
              <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2D2421]">
                  No matches yet. Try widening your filters.
                </h3>
                <p className="text-sm text-[#756762] max-w-md mx-auto">
                  We couldn't find accommodations matching all your exact parameters. Try increasing the maximum budget or relaxing facility filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold tracking-wide hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Cards Grid: 3 columns desktop, 2 tablet, 1 mobile */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((prop, idx) => (
                  <PropertyCard key={prop.id} property={prop} priority={idx < 4} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-[#2D2421]/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[#FFFDF9] border-t border-[#D99A8F] rounded-t-[28px] max-h-[85vh] overflow-y-auto p-6 space-y-6 z-10"
            >
              <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-3">
                <h3 className="font-serif text-xl font-bold text-[#2D2421]">Filter Accommodations</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full border border-[#D99A8F] text-[#2D2421]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Budget slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Monthly Budget</span>
                  <span className="text-[#B85C52]">Up to ₹{filters.budgetMax.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="6000"
                  max="20000"
                  step="500"
                  value={filters.budgetMax}
                  onChange={(e) => setFilters((prev) => ({ ...prev, budgetMax: Number(e.target.value) }))}
                  className="w-full accent-[#B85C52]"
                />
              </div>

              {/* Distance */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Distance from Campus</span>
                  <span className="text-[#B85C52]">{filters.distanceMax} km</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={filters.distanceMax}
                  onChange={(e) => setFilters((prev) => ({ ...prev, distanceMax: Number(e.target.value) }))}
                  className="w-full accent-[#B85C52]"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold">Room Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'PG', 'Hostel', 'Shared Room', 'Flat'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, type: t }))}
                      className={`py-2 rounded-xl text-xs font-medium ${
                        filters.type === t ? 'bg-[#B85C52] text-[#FFFDF9]' : 'bg-[#F7F1E8] text-[#2D2421]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold">Facilities Included</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableFacilities.map((facility) => (
                    <label key={facility} className="flex items-center gap-2 text-xs text-[#2D2421]">
                      <input
                        type="checkbox"
                        checked={filters.facilities.includes(facility)}
                        onChange={() => toggleFacility(facility)}
                        className="rounded border-[#D99A8F] accent-[#B85C52]"
                      />
                      <span>{facility}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-full border border-[#D99A8F] text-xs font-semibold text-[#2D2421]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold"
                >
                  Apply Filters ({filteredListings.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ONE Dark Deep Brown showcase section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Zero Brokerage Promise
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Need help choosing the right room for your college semester?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Our student housing guides are available to help you compare properties, calculate transit times, and coordinate visits.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all"
            >
              Talk to Student Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
