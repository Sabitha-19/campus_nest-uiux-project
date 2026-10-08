import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, MapPin, Wifi, Shield, Utensils, Wind, Check, Scale } from 'lucide-react';
import { Accommodation } from '../../types';
import { useApp } from '../../context/AppContext';
import { RoomPhotoVisual } from './RoomPhotoVisual';

interface PropertyCardProps {
  property: Accommodation;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, priority = false }) => {
  const { isSaved, toggleSave, isInCompare, toggleCompare } = useApp();
  const saved = isSaved(property.id);
  const compared = isInCompare(property.id);
  const [heartPopping, setHeartPopping] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartPopping(true);
    setTimeout(() => setHeartPopping(false), 600);
    toggleSave(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(property.id);
  };

  // Facility icon mapping
  const renderFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'wi-fi':
      case 'wifi':
        return <Wifi className="w-3.5 h-3.5 text-[#756762]" />;
      case 'meals':
        return <Utensils className="w-3.5 h-3.5 text-[#756762]" />;
      case 'ac':
        return <Wind className="w-3.5 h-3.5 text-[#756762]" />;
      case 'security':
        return <Shield className="w-3.5 h-3.5 text-[#756762]" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`group flex flex-col h-full rounded-[20px] bg-[#FFFDF9] border transition-all duration-300 shadow-[0_12px_32px_rgba(45,36,33,0.08)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(45,36,33,0.14)] ${
        compared ? 'border-[#B85C52] ring-2 ring-[#B85C52]/30' : 'border-[#D99A8F] hover:border-[#B85C52]'
      }`}
    >
      {/* 16:10 Photo Area with slow zoom */}
      <div className="relative overflow-hidden rounded-t-[19px] p-2">
        <Link to={`/accommodation/${property.id}`} className="block overflow-hidden rounded-[14px]">
          <RoomPhotoVisual
            theme={property.visualTheme}
            imageUrl={property.coverImage}
            title={property.title}
            type={property.type}
            roomLabel={property.roomLabel}
            aspect="aspect-[16/10]"
            showOverlay
            priority={priority}
          />
        </Link>

        {/* Verified Badge (Gold) */}
        {property.isVerified && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9] text-[#2D2421] border border-[#C99A4A] shadow-sm backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#C99A4A]" />
            <span className="text-[11px] font-bold text-[#C99A4A] tracking-wider uppercase">Verified</span>
          </div>
        )}

        {/* Heart Save Button */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={saved ? 'Remove from saved' : 'Save accommodation'}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FFFDF9]/90 border border-[#D99A8F] flex items-center justify-center shadow-md hover:bg-[#FFFDF9] transition-transform active:scale-90"
        >
          <motion.div
            animate={heartPopping ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                saved ? 'fill-[#B85C52] text-[#B85C52]' : 'text-[#756762] hover:text-[#B85C52]'
              }`}
            />
          </motion.div>

          {/* Burst of small rose and gold dots on save */}
          <AnimatePresence>
            {heartPopping && (
              <>
                <motion.span
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.2, x: 12, y: -12 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-2 h-2 rounded-full bg-[#C99A4A]"
                />
                <motion.span
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.2, x: -14, y: -10 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-2 h-2 rounded-full bg-[#D99A8F]"
                />
                <motion.span
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.2, x: 10, y: 14 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#B85C52]"
                />
              </>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-5 pt-3">
        {/* Type Tag (Rose) + Gender + Rating Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D99A8F]/25 text-[#2D2421] border border-[#D99A8F]">
              {property.type} • {property.genderPreference}
            </span>
            <span className="text-xs text-[#756762] font-medium">
              {property.roomSharing}
            </span>
          </div>

          {/* Gold Rating Stars */}
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-[#C99A4A] text-[#C99A4A]" />
            <span className="text-xs font-bold text-[#2D2421]">{property.rating.toFixed(1)}</span>
            <span className="text-[11px] text-[#756762]">({property.reviewsCount})</span>
          </div>
        </div>

        {/* Accommodation Name (Vollkorn serif 24px) */}
        <Link to={`/accommodation/${property.id}`} className="group-hover:text-[#B85C52] transition-colors">
          <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#2D2421] leading-snug line-clamp-1">
            {property.title}
          </h3>
        </Link>

        {/* Location & Distance from Campus */}
        <div className="mt-1.5 flex items-start gap-1.5 text-xs text-[#756762]">
          <MapPin className="w-3.5 h-3.5 text-[#B85C52] shrink-0 mt-0.5" />
          <span className="line-clamp-1">
            {property.distanceText}
          </span>
        </div>

        {/* Facility Icons Row */}
        <div className="mt-3.5 pt-3 border-t border-[#D99A8F]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {property.facilities.slice(0, 4).map((f) => (
              <span key={f} className="flex items-center gap-1 text-[11px] text-[#756762]" title={f}>
                {renderFacilityIcon(f)}
                <span className="hidden sm:inline">{f}</span>
              </span>
            ))}
          </div>
          <span className="text-[11px] text-[#B85C52] font-medium">
            {property.availability}
          </span>
        </div>

        {/* Rent & Action Buttons */}
        <div className="mt-auto pt-4 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-serif text-2xl sm:text-[26px] font-bold text-[#2D2421]">
                ₹{property.monthlyRent.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#756762] ml-1">/month</span>
            </div>
            <span className="text-[11px] text-[#756762]">Zero Brokerage</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={`/accommodation/${property.id}`}
              className="flex items-center justify-center h-11 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold tracking-wide hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all active:scale-[0.98]"
            >
              View Details
            </Link>

            <button
              type="button"
              onClick={handleCompareClick}
              className={`flex items-center justify-center gap-1.5 h-11 rounded-full border text-xs font-semibold transition-all active:scale-[0.98] ${
                compared
                  ? 'bg-[#2D2421] text-[#F7F1E8] border-[#2D2421]'
                  : 'bg-[#FFFDF9] text-[#2D2421] border-[#D99A8F] hover:border-[#B85C52] hover:text-[#B85C52]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{compared ? 'Compared ✓' : 'Compare'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
