import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ArrowRight, Building, MapPin, Calendar, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACCOMMODATIONS } from '../data/accommodations';

export const EnquiryConfirmation: React.FC = () => {
  const { lastEnquiry } = useApp();

  // Fallback property summary if visited directly
  const property = lastEnquiry
    ? {
        title: lastEnquiry.propertyTitle,
        area: lastEnquiry.propertyArea,
        rent: lastEnquiry.monthlyRent,
        date: lastEnquiry.submittedAt
      }
    : {
        title: ACCOMMODATIONS[0].title,
        area: ACCOMMODATIONS[0].area,
        rent: ACCOMMODATIONS[0].monthlyRent,
        date: new Date().toLocaleDateString('en-IN')
      };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Animated Draw-in Success Check */}
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Pulsing ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.9, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-[#B85C52]/15 border-2 border-[#B85C52]"
            />
            {/* Inner check circle */}
            <div className="w-14 h-14 rounded-full bg-[#B85C52] text-[#FFFDF9] flex items-center justify-center shadow-lg relative z-10">
              <motion.div
                initial={{ pathLength: 0, scale: 0 }}
                animate={{ pathLength: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </motion.div>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2421]">
            Your enquiry has been sent successfully!
          </h1>
          <p className="text-base text-[#756762] max-w-lg mx-auto">
            The property owner and warden have received your inquiry. There are zero broker charges associated with this booking.
          </p>
        </div>

        {/* Property Summary Card */}
        <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 shadow-[0_12px_32px_rgba(45,36,33,0.08)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-4">
            <span className="text-xs uppercase tracking-wider text-[#756762] font-semibold">
              Enquiry Summary
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
              Status: Sent ✓
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <span className="text-xs text-[#756762] block">Accommodation</span>
              <h3 className="font-serif text-xl font-bold text-[#2D2421] mt-0.5">{property.title}</h3>
              <p className="text-xs text-[#756762] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B85C52]" />
                <span>{property.area}</span>
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-[#756762] block">Quoted Monthly Rent</span>
              <p className="font-serif text-2xl font-bold text-[#2D2421] mt-0.5">
                ₹{property.rent.toLocaleString('en-IN')}<span className="text-xs font-sans text-[#756762]">/month</span>
              </p>
              <p className="text-[11px] text-[#B85C52] font-medium mt-1">Zero Brokerage Guarantee</p>
            </div>
          </div>
        </div>

        {/* "What Happens Next" 4 Steps */}
        <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2D2421]">What Happens Next?</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div className="pt-0.5">
                <h3 className="font-serif text-base font-bold text-[#2D2421]">Property receives your enquiry</h3>
                <p className="text-xs sm:text-sm text-[#756762] mt-0.5">
                  The verified warden or landlord receives your requested move-in timeline and student profile.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div className="pt-0.5">
                <h3 className="font-serif text-base font-bold text-[#2D2421]">Availability is confirmed</h3>
                <p className="text-xs sm:text-sm text-[#756762] mt-0.5">
                  The host confirms current vacant bed allotment and schedules your personal or family campus visit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div className="pt-0.5">
                <h3 className="font-serif text-base font-bold text-[#2D2421]">You receive further details</h3>
                <p className="text-xs sm:text-sm text-[#756762] mt-0.5">
                  You receive the property's direct warden contact, directions from campus gates, and meal schedules.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                4
              </div>
              <div className="pt-0.5">
                <h3 className="font-serif text-base font-bold text-[#2D2421]">You can proceed with the accommodation</h3>
                <p className="text-xs sm:text-sm text-[#756762] mt-0.5">
                  Inspect the room in person, finalize your deposit directly with no middleman fees, and move in peacefully!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button "Continue Exploring" */}
        <div className="text-center pt-4">
          <Link
            to="/explore"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-medium text-base tracking-wide hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-md active:scale-98"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Dedicated Student Concierge
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Need immediate assistance or room recommendations?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Our student housing counselors are happy to answer any questions about hostel security, lease agreements, or campus bus lines.
          </p>
        </div>
      </section>
    </div>
  );
};
