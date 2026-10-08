import React from 'react';
import { Accommodation } from '../../types';
import { CampusNestMark } from './CampusNestLogo';

interface RoomPhotoVisualProps {
  theme: Accommodation['visualTheme'];
  imageUrl?: string;
  title?: string;
  type?: string;
  roomLabel?: string;
  className?: string;
  aspect?: string;
  showOverlay?: boolean;
  priority?: boolean;
}

export const RoomPhotoVisual: React.FC<RoomPhotoVisualProps> = ({
  theme,
  imageUrl,
  title,
  type = 'PG',
  roomLabel,
  className = '',
  aspect = 'aspect-[16/10]',
  showOverlay = false,
  priority = false
}) => {
  const [imageError, setImageError] = React.useState(false);

  const isPriority = priority === true;
  const isWebp = Boolean(imageUrl && imageUrl.endsWith('.webp') && !imageUrl.includes('-600w'));
  const srcSet = isWebp && imageUrl
    ? `${imageUrl.replace('.webp', '-600w.webp')} 600w, ${imageUrl} 1200w`
    : undefined;
  // Theme specifics: distinct architectural layout & visual motifs for each of the 12 rooms
  const renderInteriorGraphic = () => {
    switch (theme) {
      case 'study_haven':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Wall background with soft window light */}
            <path d="M0 0 L400 0 L400 170 L0 170 Z" fill="#FFFDF9" />
            <path d="M0 170 L400 170 L400 250 L0 250 Z" fill="#F7F1E8" stroke="#D99A8F" strokeWidth="1" />
            {/* Large Window */}
            <rect x="230" y="20" width="130" height="110" rx="4" fill="#FFFDF9" stroke="#D99A8F" strokeWidth="2" />
            <line x1="295" y1="20" x2="295" y2="130" stroke="#D99A8F" strokeWidth="1.5" />
            <line x1="230" y1="75" x2="360" y2="75" stroke="#D99A8F" strokeWidth="1.5" />
            {/* Window Curtains in rose */}
            <path d="M220 18 Q235 65 228 135" stroke="#B85C52" strokeWidth="8" strokeLinecap="round" />
            <path d="M370 18 Q355 65 362 135" stroke="#B85C52" strokeWidth="8" strokeLinecap="round" />
            {/* Study Desk & Laptop */}
            <rect x="200" y="115" width="170" height="65" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <line x1="215" y1="180" x2="215" y2="230" stroke="#2D2421" strokeWidth="3" />
            <line x1="355" y1="180" x2="355" y2="230" stroke="#2D2421" strokeWidth="3" />
            {/* Laptop */}
            <path d="M260 120 L290 120 L294 135 L256 135 Z" fill="#756762" stroke="#2D2421" strokeWidth="1" />
            <rect x="262" y="105" width="26" height="16" rx="2" fill="#2D2421" />
            {/* Desk lamp in terracotta */}
            <path d="M215 115 L225 90 L240 92" stroke="#B85C52" strokeWidth="2" fill="none" />
            <path d="M236 88 L248 96 L242 102 Z" fill="#C99A4A" />
            {/* Comfy Bed on the Left */}
            <rect x="20" y="125" width="160" height="75" rx="6" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <path d="M20 120 L30 120 L30 195 L20 195 Z" fill="#2D2421" rx="2" />
            <rect x="35" y="130" width="40" height="25" rx="4" fill="#D99A8F" />
            <rect x="75" y="135" width="105" height="65" rx="4" fill="#B85C52" />
            {/* Wall Pinboard with notes */}
            <rect x="40" y="30" width="120" height="70" rx="4" fill="#F7F1E8" stroke="#D99A8F" strokeWidth="2" />
            <rect x="52" y="42" width="24" height="24" rx="2" fill="#D99A8F" />
            <rect x="85" y="46" width="30" height="18" rx="2" fill="#C99A4A" />
            <rect x="55" y="72" width="40" height="16" rx="2" fill="#FFFDF9" stroke="#756762" strokeWidth="0.5" />
          </svg>
        );

      case 'balcony_twin':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Sliding Balcony Glass Doors */}
            <rect x="120" y="15" width="160" height="160" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <line x1="200" y1="15" x2="200" y2="175" stroke="#2D2421" strokeWidth="2" />
            {/* Balcony Railing outside */}
            <line x1="125" y1="110" x2="275" y2="110" stroke="#D99A8F" strokeWidth="1.5" />
            <line x1="145" y1="110" x2="145" y2="170" stroke="#D99A8F" strokeWidth="1" />
            <line x1="180" y1="110" x2="180" y2="170" stroke="#D99A8F" strokeWidth="1" />
            <line x1="220" y1="110" x2="220" y2="170" stroke="#D99A8F" strokeWidth="1" />
            <line x1="255" y1="110" x2="255" y2="170" stroke="#D99A8F" strokeWidth="1" />
            {/* Twin Beds on opposite sides */}
            {/* Bed 1 Left */}
            <rect x="15" y="110" width="90" height="110" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="25" y="115" width="45" height="22" rx="3" fill="#D99A8F" />
            <rect x="20" y="145" width="85" height="75" rx="3" fill="#B85C52" />
            {/* Bed 2 Right */}
            <rect x="295" y="110" width="90" height="110" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="330" y="115" width="45" height="22" rx="3" fill="#D99A8F" />
            <rect x="295" y="145" width="85" height="75" rx="3" fill="#B85C52" />
            {/* Center bedside drawer & plant */}
            <rect x="175" y="180" width="50" height="40" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="1.5" />
            <circle cx="200" cy="172" r="7" fill="#C99A4A" />
            {/* Ceiling AC Unit */}
            <rect x="150" y="10" width="100" height="16" rx="3" fill="#FFFDF9" stroke="#756762" strokeWidth="1" />
          </svg>
        );

      case 'sunset_room':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Warm room tone */}
            <rect x="0" y="0" width="400" height="165" fill="#FFFDF9" />
            {/* Large arch wall art */}
            <path d="M40 140 C40 60, 110 60, 110 140 Z" fill="#D99A8F" opacity="0.4" />
            {/* Bed with warm peach/terracotta duvet */}
            <rect x="140" y="90" width="180" height="110" rx="6" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            {/* Pillows */}
            <rect x="155" y="98" width="45" height="25" rx="4" fill="#D99A8F" />
            <rect x="210" y="98" width="45" height="25" rx="4" fill="#C99A4A" />
            {/* Warm Duvet */}
            <rect x="145" y="130" width="175" height="70" rx="4" fill="#B85C52" />
            {/* Bedside table with reading lamp */}
            <rect x="80" y="135" width="45" height="60" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="1.5" />
            <path d="M100 135 L100 110 L108 105" stroke="#2D2421" strokeWidth="2" fill="none" />
            <path d="M104 100 L118 105 L112 115 Z" fill="#C99A4A" />
            {/* Potted fiddle leaf on floor */}
            <path d="M350 200 L345 230 L370 230 L365 200 Z" fill="#B85C52" />
            <circle cx="357" cy="188" r="14" fill="#756762" opacity="0.7" />
          </svg>
        );

      case 'classic_quarters':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            <rect x="0" y="0" width="400" height="160" fill="#FFFDF9" />
            {/* Wall Pennant */}
            <path d="M30 40 L90 55 L30 70 Z" fill="#B85C52" stroke="#2D2421" strokeWidth="1" />
            {/* Single Solid Wooden Bed */}
            <rect x="30" y="110" width="160" height="85" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2.5" />
            <rect x="40" y="115" width="42" height="22" rx="3" fill="#D99A8F" />
            <rect x="30" y="140" width="160" height="55" rx="2" fill="#756762" opacity="0.3" stroke="#2D2421" strokeWidth="1" />
            {/* Study workstation on Right */}
            <rect x="220" y="105" width="150" height="75" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            {/* Bookshelf above desk */}
            <rect x="230" y="45" width="130" height="10" fill="#2D2421" rx="2" />
            <rect x="240" y="25" width="12" height="20" fill="#B85C52" rx="1" />
            <rect x="254" y="28" width="10" height="17" fill="#C99A4A" rx="1" />
            <rect x="266" y="22" width="14" height="23" fill="#756762" rx="1" />
            {/* Desk Globe */}
            <circle cx="340" cy="95" r="9" stroke="#2D2421" strokeWidth="1.5" fill="#FFFDF9" />
            <line x1="340" y1="104" x2="340" y2="112" stroke="#2D2421" strokeWidth="2" />
          </svg>
        );

      case 'studio_pg':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            <rect x="0" y="0" width="400" height="160" fill="#FFFDF9" />
            {/* Compact Kitchenette & Mini Fridge */}
            <rect x="25" y="60" width="75" height="130" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <line x1="25" y1="110" x2="100" y2="110" stroke="#756762" strokeWidth="1.5" />
            {/* Wall TV */}
            <rect x="130" y="35" width="90" height="52" rx="3" fill="#2D2421" />
            <rect x="134" y="39" width="82" height="44" rx="2" fill="#756762" opacity="0.3" />
            {/* Studio Bed & Desk */}
            <rect x="240" y="95" width="135" height="95" rx="5" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="250" y="102" width="40" height="24" rx="3" fill="#D99A8F" />
            <rect x="245" y="130" width="130" height="60" rx="3" fill="#B85C52" />
          </svg>
        );

      case 'oak_minimalist':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            <rect x="0" y="0" width="400" height="165" fill="#FFFDF9" />
            {/* Corkboard with polaroids */}
            <rect x="50" y="25" width="110" height="70" rx="4" fill="#F7F1E8" stroke="#D99A8F" strokeWidth="1.5" />
            <rect x="62" y="36" width="22" height="25" fill="#FFFDF9" stroke="#2D2421" strokeWidth="0.5" />
            <rect x="94" y="42" width="22" height="25" fill="#FFFDF9" stroke="#2D2421" strokeWidth="0.5" />
            <rect x="126" y="36" width="22" height="25" fill="#FFFDF9" stroke="#2D2421" strokeWidth="0.5" />
            {/* White 3-drawer desk */}
            <rect x="40" y="105" width="140" height="75" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <line x1="130" y1="105" x2="130" y2="180" stroke="#2D2421" strokeWidth="1.5" />
            <line x1="130" y1="130" x2="180" y2="130" stroke="#756762" strokeWidth="1" />
            <line x1="130" y1="155" x2="180" y2="155" stroke="#756762" strokeWidth="1" />
            {/* Bed on the Right */}
            <rect x="210" y="100" width="165" height="90" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="225" y="108" width="40" height="22" rx="3" fill="#D99A8F" />
            <rect x="215" y="135" width="160" height="55" rx="3" fill="#756762" opacity="0.4" />
          </svg>
        );

      case 'ruby_double':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Window across the back */}
            <rect x="90" y="20" width="220" height="100" rx="3" fill="#FFFDF9" stroke="#D99A8F" strokeWidth="1.5" />
            <line x1="200" y1="20" x2="200" y2="120" stroke="#D99A8F" strokeWidth="1" />
            {/* Ruby / Terracotta Twin Beds */}
            <rect x="30" y="110" width="145" height="85" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="45" y="118" width="38" height="20" rx="3" fill="#D99A8F" />
            <rect x="35" y="140" width="140" height="55" rx="3" fill="#B85C52" />
            {/* Second Bed */}
            <rect x="225" y="110" width="145" height="85" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="240" y="118" width="38" height="20" rx="3" fill="#D99A8F" />
            <rect x="230" y="140" width="140" height="55" rx="3" fill="#B85C52" />
          </svg>
        );

      case 'community_lounge':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Modern Accent wall */}
            <rect x="0" y="0" width="400" height="160" fill="#756762" opacity="0.25" />
            {/* Floating Display Shelves with ceramics */}
            <rect x="60" y="30" width="110" height="8" rx="2" fill="#2D2421" />
            <circle cx="85" cy="22" r="6" fill="#C99A4A" />
            <rect x="110" y="16" width="12" height="14" rx="2" fill="#B85C52" />
            {/* Long Island Bar / Dining Table */}
            <rect x="80" y="115" width="240" height="60" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            {/* Bar Stools */}
            <ellipse cx="120" cy="185" rx="14" ry="4" fill="#2D2421" />
            <line x1="120" y1="185" x2="120" y2="230" stroke="#2D2421" strokeWidth="2" />
            <ellipse cx="200" cy="185" rx="14" ry="4" fill="#2D2421" />
            <line x1="200" y1="185" x2="200" y2="230" stroke="#2D2421" strokeWidth="2" />
            <ellipse cx="280" cy="185" rx="14" ry="4" fill="#2D2421" />
            <line x1="280" y1="185" x2="280" y2="230" stroke="#2D2421" strokeWidth="2" />
            {/* Pendant Lights */}
            <line x1="140" y1="0" x2="140" y2="50" stroke="#2D2421" strokeWidth="1.5" />
            <path d="M130 50 L150 50 L140 65 Z" fill="#C99A4A" />
            <line x1="260" y1="0" x2="260" y2="50" stroke="#2D2421" strokeWidth="1.5" />
            <path d="M250 50 L270 50 L260 65 Z" fill="#C99A4A" />
          </svg>
        );

      case 'executive_triple':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Wood Panelled ceiling accent */}
            <line x1="0" y1="10" x2="400" y2="10" stroke="#756762" strokeWidth="2" opacity="0.3" />
            <line x1="0" y1="20" x2="400" y2="20" stroke="#756762" strokeWidth="2" opacity="0.3" />
            {/* 3 Spacious Beds */}
            <rect x="20" y="110" width="100" height="85" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="30" y="116" width="30" height="18" rx="2" fill="#D99A8F" />
            <rect x="25" y="138" width="90" height="57" rx="2" fill="#B85C52" />

            <rect x="150" y="110" width="100" height="85" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="160" y="116" width="30" height="18" rx="2" fill="#D99A8F" />
            <rect x="155" y="138" width="90" height="57" rx="2" fill="#756762" opacity="0.4" />

            <rect x="280" y="110" width="100" height="85" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="290" y="116" width="30" height="18" rx="2" fill="#D99A8F" />
            <rect x="285" y="138" width="90" height="57" rx="2" fill="#C99A4A" />
          </svg>
        );

      case 'metro_suite':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Skyline Window View */}
            <rect x="180" y="15" width="180" height="120" rx="4" fill="#FFFDF9" stroke="#D99A8F" strokeWidth="2" />
            <rect x="200" y="60" width="30" height="75" fill="#756762" opacity="0.2" />
            <rect x="245" y="40" width="35" height="95" fill="#756762" opacity="0.25" />
            <rect x="295" y="70" width="40" height="65" fill="#756762" opacity="0.2" />
            {/* Modern Suite Sofa & Table */}
            <rect x="30" y="115" width="130" height="60" rx="6" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="35" y="130" width="120" height="45" rx="4" fill="#B85C52" />
            <rect x="180" y="145" width="80" height="40" rx="3" fill="#FFFDF9" stroke="#2D2421" strokeWidth="1.5" />
          </svg>
        );

      case 'greenway_dorm':
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            {/* Courtyard arch view */}
            <path d="M120 120 C120 40, 280 40, 280 120 Z" fill="#FFFDF9" stroke="#D99A8F" strokeWidth="2" />
            {/* Tree branches outside */}
            <circle cx="170" cy="70" r="24" fill="#756762" opacity="0.2" />
            <circle cx="230" cy="65" r="28" fill="#756762" opacity="0.2" />
            {/* Student Study Pods */}
            <rect x="30" y="130" width="100" height="70" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="270" y="130" width="100" height="70" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
          </svg>
        );

      case 'garden_loft':
      default:
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#F7F1E8" />
            <rect x="0" y="0" width="400" height="155" fill="#FFFDF9" />
            {/* Slanted Loft Ceiling Beam */}
            <path d="M0 0 L400 60 L400 70 L0 10 Z" fill="#2D2421" />
            {/* Skylight */}
            <polygon points="120,25 220,40 210,90 110,75" fill="#FFFDF9" stroke="#D99A8F" strokeWidth="2" />
            {/* Loft Bed & Ladder */}
            <rect x="220" y="95" width="150" height="85" rx="4" fill="#FFFDF9" stroke="#2D2421" strokeWidth="2" />
            <rect x="235" y="105" width="40" height="20" rx="3" fill="#D99A8F" />
            <rect x="225" y="130" width="140" height="50" rx="3" fill="#B85C52" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative w-full ${aspect} overflow-hidden rounded-[16px] border border-[#D99A8F]/60 bg-[#FFFDF9] transition-transform duration-500 group-hover:scale-[1.04] ${className}`}
    >
      {/* Photorealistic image if available, otherwise cream frame with CampusNest logo icon fallback */}
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          alt={title ? `${title} - ${roomLabel || 'Student Room'}` : 'Student Accommodation'}
          width={800}
          height={500}
          loading={isPriority ? 'eager' : 'lazy'}
          fetchPriority={isPriority ? 'high' : 'auto'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover block"
        />
      ) : (
        <div className="w-full h-full bg-[#F7F1E8] border border-[#D99A8F]/40 flex flex-col items-center justify-center p-6 text-center select-none relative">
          <div className="w-14 h-14 rounded-full bg-[#FFFDF9] border border-[#D99A8F] flex items-center justify-center shadow-xs mb-2">
            <CampusNestMark sizePx={34} />
          </div>
          <span className="font-serif text-sm font-semibold text-[#2D2421]">CampusNest Verified</span>
          <span className="text-[11px] text-[#756762] mt-0.5 line-clamp-1">{title || 'Student Accommodation'}</span>
        </div>
      )}

      {/* Neutral labelled empty frame fallback / room badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FFFDF9]/95 text-[#2D2421] border border-[#D99A8F] shadow-sm backdrop-blur-xs">
          {type}
        </span>
      </div>

      {/* Bottom room label banner */}
      {roomLabel && (
        <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-[#2D2421]/90 via-[#2D2421]/60 to-transparent p-3 pt-6 text-[#F7F1E8]">
          <p className="text-[11px] font-sans text-[#D99A8F] truncate">{title || 'Student Accommodation'}</p>
          <p className="text-xs font-serif text-[#FFFDF9] line-clamp-1">{roomLabel}</p>
        </div>
      )}

      {showOverlay && (
        <div className="absolute inset-0 bg-[#B85C52]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      )}
    </div>
  );
};
