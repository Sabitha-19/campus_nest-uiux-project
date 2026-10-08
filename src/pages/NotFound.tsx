import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Search, ArrowRight } from 'lucide-react';
import { CampusNestLogo } from '../components/common/CampusNestLogo';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12">
        <div className="flex justify-center mb-4">
          <CampusNestLogo variant="stacked" size="md" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
          Error 404 • Page Not Found
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2D2421]">
          Looks like you took a wrong turn.
        </h1>

        <p className="text-base sm:text-lg text-[#756762] max-w-md mx-auto leading-relaxed">
          The page or accommodation you are searching for might have moved, or the link may be mistyped. Let's guide you back to comfortable student living.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#B85C52] text-[#FFFDF9] text-sm font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-sm"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-[#2D2421] text-sm font-semibold hover:border-[#B85C52] transition-colors"
          >
            <Search className="w-4 h-4 text-[#B85C52]" />
            <span>Explore All Rooms</span>
          </Link>
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-28 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Need Guidance?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Can't find your campus?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Contact our student housing help desk at hello@campusnest.co and we will help you find rooms near your specific institution.
          </p>
        </div>
      </section>
    </div>
  );
};
