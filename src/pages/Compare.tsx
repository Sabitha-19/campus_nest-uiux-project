import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Scale, X, Plus, Star, MapPin, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACCOMMODATIONS } from '../data/accommodations';
import { RoomPhotoVisual } from '../components/common/RoomPhotoVisual';

export const Compare: React.FC = () => {
  const { compareIds, removeCompare, clearCompare } = useApp();

  const comparedProperties = ACCOMMODATIONS.filter((item) => compareIds.includes(item.id));

  // Determine best values for highlights:
  // Lowest rent
  const lowestRent = comparedProperties.length > 0 ? Math.min(...comparedProperties.map((p) => p.monthlyRent)) : 0;
  // Lowest distance
  const lowestDistance = comparedProperties.length > 0 ? Math.min(...comparedProperties.map((p) => p.distanceKm)) : 0;
  // Highest rating
  const highestRating = comparedProperties.length > 0 ? Math.max(...comparedProperties.map((p) => p.rating)) : 0;

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#D99A8F]/40 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Side-by-Side Analysis
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2421] mt-1">
              Compare Accommodations
            </h1>
            <p className="text-sm text-[#756762] mt-1">
              Evaluate up to 3 student rooms on price, location, amenities, and security.
            </p>
          </div>

          {comparedProperties.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="text-xs font-semibold text-[#B85C52] hover:underline self-start sm:self-auto"
            >
              Clear Comparison ({comparedProperties.length})
            </button>
          )}
        </div>

        {comparedProperties.length === 0 ? (
          /* Empty Compare State */
          <div className="mt-12 rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center mx-auto text-2xl">
              ⚖️
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2D2421]">No properties to compare</h2>
            <p className="text-sm text-[#756762]">
              Select up to 3 properties from the Explore page or click below to browse student accommodations near your campus.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-sm"
            >
              Explore Accommodations
            </Link>
          </div>
        ) : (
          /* Comparison Grid */
          <div className="mt-10 overflow-x-auto pb-6">
            <div className="min-w-[700px] grid grid-cols-4 gap-4">
              {/* Attribute labels column */}
              <div className="space-y-6 pt-52">
                <div className="h-12 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Monthly Rent
                </div>
                <div className="h-12 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Campus Distance
                </div>
                <div className="h-12 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Campus Walking Time
                </div>
                <div className="h-12 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Student Rating
                </div>
                <div className="h-12 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Room Format
                </div>
                <div className="h-20 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Included Facilities
                </div>
                <div className="h-12 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Availability
                </div>
                <div className="h-20 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Safety Features
                </div>
                <div className="h-20 flex items-center font-serif text-sm font-bold text-[#2D2421] border-b border-[#D99A8F]/30">
                  Nearby Transport
                </div>
              </div>

              {/* Property Columns */}
              {comparedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-4 shadow-sm flex flex-col space-y-6 relative"
                >
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeCompare(prop.id)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-[#756762] hover:text-[#B85C52] flex items-center justify-center transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Header: Photo & Title */}
                  <div className="h-48 flex flex-col justify-between">
                    <div className="rounded-[12px] overflow-hidden">
                      <RoomPhotoVisual
                        theme={prop.visualTheme}
                        imageUrl={prop.coverImage}
                        type={prop.type}
                        aspect="aspect-[16/10]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#B85C52] font-semibold">{prop.type}</span>
                      <h3 className="font-serif text-base font-bold text-[#2D2421] line-clamp-1">{prop.title}</h3>
                      <p className="text-[11px] text-[#756762] line-clamp-1">{prop.area}</p>
                    </div>
                  </div>

                  {/* Monthly Rent Row */}
                  <div className="h-12 flex items-center justify-between border-b border-[#D99A8F]/30">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#2D2421]">
                        ₹{prop.monthlyRent.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#756762]">/mo</span>
                    </div>
                    {prop.monthlyRent === lowestRent && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
                        Best Value
                      </span>
                    )}
                  </div>

                  {/* Distance Row */}
                  <div className="h-12 flex items-center justify-between border-b border-[#D99A8F]/30 text-xs">
                    <span className="text-[#2D2421] font-medium">{prop.distanceKm} km ({prop.distanceText.split('from')[0]})</span>
                    {prop.distanceKm === lowestDistance && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
                        Nearest
                      </span>
                    )}
                  </div>

                  {/* Campus Walking Time Row */}
                  <div className="h-12 flex items-center justify-between border-b border-[#D99A8F]/30 text-xs">
                    <span className="text-[#2D2421] font-medium">
                      ~{prop.landmarks[0]?.walkingMinutes || Math.round(prop.distanceKm * 12)} min walk
                    </span>
                    <span className="text-[10px] text-[#756762] truncate max-w-[90px]">
                      {prop.landmarks[0]?.name.split(' ')[0] || 'Gate'}
                    </span>
                  </div>

                  {/* Rating Row */}
                  <div className="h-12 flex items-center justify-between border-b border-[#D99A8F]/30 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C99A4A] text-[#C99A4A]" />
                      <strong className="text-[#2D2421]">{prop.rating.toFixed(1)}</strong>
                      <span className="text-[#756762]">({prop.reviewsCount})</span>
                    </div>
                    {prop.rating === highestRating && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
                        Top Rated
                      </span>
                    )}
                  </div>

                  {/* Room Format */}
                  <div className="h-12 flex items-center border-b border-[#D99A8F]/30 text-xs text-[#2D2421]">
                    {prop.roomSharing} ({prop.genderPreference})
                  </div>

                  {/* Facilities */}
                  <div className="h-20 flex flex-wrap items-center gap-1 border-b border-[#D99A8F]/30 text-[11px] overflow-hidden">
                    {prop.facilities.slice(0, 5).map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded bg-[#F7F1E8] border border-[#D99A8F]/40 text-[#2D2421]">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="h-12 flex items-center border-b border-[#D99A8F]/30 text-xs font-semibold text-[#B85C52]">
                    {prop.availability}
                  </div>

                  {/* Safety */}
                  <div className="h-20 flex flex-col justify-center border-b border-[#D99A8F]/30 text-[11px] text-[#756762] space-y-1">
                    {prop.safetyFeatures.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="line-clamp-1">✓ {s}</div>
                    ))}
                  </div>

                  {/* Nearby Transport */}
                  <div className="h-20 flex flex-col justify-center border-b border-[#D99A8F]/30 text-[11px] text-[#756762] space-y-1">
                    {prop.transportNearby.slice(0, 2).map((t, idx) => (
                      <div key={idx} className="line-clamp-1">🚌 {t}</div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="pt-2">
                    <Link
                      to={`/accommodation/${prop.id}`}
                      className="w-full flex items-center justify-center h-10 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}

              {/* Empty Slots if < 3 */}
              {Array.from({ length: 3 - comparedProperties.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-[20px] border-2 border-dashed border-[#D99A8F] p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[500px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center">
                    <Plus className="w-6 h-6 text-[#B85C52]" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#2D2421]">Add another slot</h4>
                  <p className="text-xs text-[#756762]">Pick another accommodation to compare</p>
                  <Link
                    to="/explore"
                    className="px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-semibold text-[#2D2421] hover:border-[#B85C52]"
                  >
                    Browse Rooms
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Honest Comparisons
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Need a second opinion on your shortlisted choices?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Our student housing counselors know every street around Chennai universities. Message us your shortlist for personalized guidance.
          </p>
        </div>
      </section>
    </div>
  );
};
