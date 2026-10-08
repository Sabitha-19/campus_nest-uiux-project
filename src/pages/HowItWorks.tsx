import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Scale, Send, ShieldCheck, CheckCircle2, HeartHandshake, Eye, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
            Simple & Transparent
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D2421] mt-1.5">
            How CampusNest Works
          </h1>
          <p className="text-base text-[#756762] mt-2">
            A student-centered journey designed to eliminate stress, fake photos, and expensive broker commissions.
          </p>
        </div>

        {/* Vertical Timeline: Search, Compare, Enquire */}
        <div className="max-w-3xl mx-auto relative pl-8 sm:pl-16 space-y-12 mb-24 border-l-2 border-[#D99A8F]">
          {/* Step 1: Search */}
          <div className="relative group">
            <div className="absolute -left-[45px] sm:-left-[77px] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] flex items-center justify-center font-serif text-lg font-bold shadow-md">
              1
            </div>
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 shadow-[0_12px_32px_rgba(45,36,33,0.06)] space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#B85C52]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2421]">1. Search Near Your Campus</h3>
              </div>
              <p className="text-sm text-[#756762] leading-relaxed">
                Filter accommodations by walking distance to your specific university gate, whether you study at SRM, Loyola, Anna University, or IIT Madras. Narrow results by rent, meals, AC, and gender preferences.
              </p>
            </div>
          </div>

          {/* Step 2: Compare */}
          <div className="relative group">
            <div className="absolute -left-[45px] sm:-left-[77px] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] flex items-center justify-center font-serif text-lg font-bold shadow-md">
              2
            </div>
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 shadow-[0_12px_32px_rgba(45,36,33,0.06)] space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#B85C52]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2421]">2. Compare Side by Side</h3>
              </div>
              <p className="text-sm text-[#756762] leading-relaxed">
                Add up to 3 shortlisted properties to your comparison dashboard. Inspect monthly rent, transit options, deposit amounts, and verified senior reviews side-by-side to find the best value.
              </p>
            </div>
          </div>

          {/* Step 3: Enquire */}
          <div className="relative group">
            <div className="absolute -left-[45px] sm:-left-[77px] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] flex items-center justify-center font-serif text-lg font-bold shadow-md">
              3
            </div>
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 shadow-[0_12px_32px_rgba(45,36,33,0.06)] space-y-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-[#B85C52]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2421]">3. Enquire & Move In</h3>
              </div>
              <p className="text-sm text-[#756762] leading-relaxed">
                Send a free direct enquiry to lock in bed availability and schedule an on-premise visit. Enjoy zero brokerage fees, clear rental terms, and continuous student support.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Cards: Listing Verification, Safety, Student Support, Transparent Information */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Core Pillars
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2421] mt-1">
              Built on Trust and Student Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Listing Verification</h3>
              <p className="text-xs text-[#756762] leading-relaxed">
                Physical premises checks confirming room dimensions, bed conditions, Wi-Fi connectivity, and hygienic dining.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Safety Protocols</h3>
              <p className="text-xs text-[#756762] leading-relaxed">
                Round-the-clock security guards, verified female wardens, biometric access control, and fire safety systems.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Student Support</h3>
              <p className="text-xs text-[#756762] leading-relaxed">
                Dedicated student onboarding assistance to ensure easy transitions into new hostel environments.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Transparent Information</h3>
              <p className="text-xs text-[#756762] leading-relaxed">
                Upfront rent breakdowns, clear deposit refund policies, exact walking distances, and honest senior feedback.
              </p>
            </div>
          </div>
        </div>

        {/* End with "Find Your Accommodation" */}
        <div className="text-center pt-8">
          <Link
            to="/explore"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-medium text-base tracking-wide hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-md active:scale-98"
          >
            <span>Find Your Accommodation</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Zero Brokerage Commitment
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Never pay a broker or middleman again.
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Every listing on CampusNest is direct with the building warden or property owner, saving college students thousands of rupees every semester.
          </p>
        </div>
      </section>
    </div>
  );
};
