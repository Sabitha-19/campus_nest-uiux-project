import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Scale, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACCOMMODATIONS } from '../data/accommodations';
import { PropertyCard } from '../components/common/PropertyCard';

export const Saved: React.FC = () => {
  const { savedIds, toggleSave } = useApp();

  const savedProperties = ACCOMMODATIONS.filter((item) => savedIds.includes(item.id));

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#D99A8F]/40 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Personal Shortlist
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2421] mt-1">
              Saved Accommodations
            </h1>
            <p className="text-sm text-[#756762] mt-1">
              Keep track of rooms you love and compare them before booking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-semibold text-[#2D2421] hover:border-[#B85C52] transition-colors"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B85C52]" />
            </Link>
          </div>
        </div>

        {savedProperties.length === 0 ? (
          /* Empty State */
          <div className="mt-16 rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center mx-auto text-2xl">
              ❤️
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2D2421]">
              No saved rooms yet. Start exploring.
            </h2>
            <p className="text-sm text-[#756762]">
              Tap the heart icon on any accommodation card to save it to your personal shortlist.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-sm"
            >
              Start Exploring Rooms
            </Link>
          </div>
        ) : (
          /* Cards Grid */
          <div className="mt-10">
            <p className="text-xs text-[#756762] mb-6">
              You have <strong className="text-[#2D2421]">{savedProperties.length}</strong> saved accommodation{savedProperties.length > 1 ? 's' : ''} in your shortlist.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Next Steps
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Ready to enquire or schedule an on-campus visit?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Your saved rooms stay synced on this device. When you're ready, submit a free enquiry to check current bed availability.
          </p>
        </div>
      </section>
    </div>
  );
};
