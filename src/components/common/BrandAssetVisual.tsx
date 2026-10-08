import React from 'react';
import { CampusNestLogo } from './CampusNestLogo';

export type BrandAssetId =
  | 'brand-book-cover'
  | 'poster-cozy'
  | 'poster-study'
  | 'poster-minimal'
  | 'visiting-card'
  | 'letter-pad'
  | 'linkedin-banner'
  | 'logo-spec';

interface BrandAssetVisualProps {
  assetId: BrandAssetId;
  className?: string;
  onClick?: () => void;
  showCaption?: boolean;
}

export const BRAND_ASSETS_META: Record<BrandAssetId, {
  title: string;
  subtitle: string;
  caption: string;
  ratio: string;
  description: string;
}> = {
  'brand-book-cover': {
    title: 'Brand Book Cover',
    subtitle: 'Official Brand Identity System',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[4/3]',
    description: 'Minimalist editorial cover featuring warm wood desk, open notebook, coffee mug, and brand typography.'
  },
  'poster-cozy': {
    title: 'Campus Lifestyle Poster',
    subtitle: 'Find a place that feels like home',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[9/16]',
    description: 'Student bedroom with warm peach/terracotta bedding, wooden study desk, natural daylight, and official CTA button.'
  },
  'poster-study': {
    title: 'Campus Trust & Proximity Poster',
    subtitle: 'Safe, affordable and student-friendly',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[9/16]',
    description: 'Student dorm setup with dedicated study station, globe pennant, and trust feature cards.'
  },
  'poster-minimal': {
    title: 'Editorial Room Poster',
    subtitle: 'Safe • Affordable • Student-friendly',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[9/16]',
    description: 'Clean room perspective with pinboard, three-drawer desk, cozy linen bed, and brand emblem.'
  },
  'visiting-card': {
    title: 'Executive Visiting Card',
    subtitle: 'Sabitha S, Founder',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[9/16]',
    description: 'Dual-sided business card in Obsidian Black (#2D2421) and Classic Linen (#F7F1E8) with geometric corner accents.'
  },
  'letter-pad': {
    title: 'Official Letter Pad',
    subtitle: 'CampusNest Stationery',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[9/16]',
    description: 'Official corporate stationery with top brand header, translucent watermark emblem, and bottom contact footer.'
  },
  'linkedin-banner': {
    title: 'LinkedIn Brand Banner',
    subtitle: 'Corporate Profile Banner',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[16/6]',
    description: 'Wide brand showcase banner with CampusNest mark, Vollkorn typography, and brand values.'
  },
  'logo-spec': {
    title: 'Brand Logo Clear Space & Specs',
    subtitle: 'Brand Guidelines Page 3',
    caption: 'Created with Canva/Pomelli',
    ratio: 'aspect-[4/3]',
    description: 'Clear space specification (100px each side) and minimum reproduction size (1.58 inch / 152px width).'
  }
};

export const BrandAssetVisual: React.FC<BrandAssetVisualProps> = ({
  assetId,
  className = '',
  onClick
}) => {
  const meta = BRAND_ASSETS_META[assetId];

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[20px] border border-[#D99A8F] bg-[#FFFDF9] shadow-[0_12px_32px_rgba(45,36,33,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(45,36,33,0.14)] ${className}`}
    >
      {/* Visual Canvas matching the exact PDF/photoshoot asset */}
      <div className={`w-full overflow-hidden relative ${meta.ratio}`}>
        {assetId === 'brand-book-cover' && (
          <div className="absolute inset-0 bg-[#F7F1E8] flex flex-col justify-between p-6 sm:p-8 text-[#2D2421]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#756762] font-medium">01 Brand Identity</span>
              <span className="text-xs text-[#B85C52] font-serif italic">google_labs Pomelli</span>
            </div>
            <div className="my-auto py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#D99A8F] bg-[#FFFDF9] flex items-center justify-center mb-5 shadow-sm">
                <CampusNestLogo variant="iconOnly" size="sm" />
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2D2421] font-bold tracking-tight">CampusNest</h3>
              <p className="tracking-[0.3em] uppercase text-xs text-[#756762] mt-2 font-medium">B R A N D &nbsp; B O O K</p>
              <div className="w-12 h-0.5 bg-[#B85C52] mt-4 mb-3" />
              <p className="text-xs text-[#756762] max-w-xs italic">"Find a place that feels like home."</p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#756762] border-t border-[#D99A8F]/40 pt-3">
              <span>Student Accommodation Platform</span>
              <span>Safe • Affordable • Student-friendly</span>
            </div>
          </div>
        )}

        {assetId === 'poster-cozy' && (
          <div className="absolute inset-0 bg-[#F7F1E8] flex flex-col justify-between p-5 text-center text-[#2D2421]">
            <div className="flex justify-center pt-2">
              <CampusNestLogo variant="stacked" size="sm" showTagline={false} />
            </div>
            {/* Room mockup frame */}
            <div className="mx-auto w-full max-w-[220px] aspect-[4/3] rounded-2xl border border-[#D99A8F] bg-[#FFFDF9] p-3 flex flex-col justify-center items-center my-3 shadow-inner">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#F7F1E8] via-[#FFFDF9] to-[#D99A8F]/20 flex flex-col justify-center items-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-[#B85C52]/10 border border-[#B85C52]/20 flex items-center justify-center mb-2">
                  <span className="text-lg">🛏️</span>
                </div>
                <span className="font-serif text-sm font-semibold text-[#2D2421]">Sunset Comfort Room</span>
                <span className="text-[10px] text-[#756762] mt-0.5">Warm peach bedding & study desk</span>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2421] leading-tight">
                Find a place that <br /><span className="text-[#B85C52] italic">feels like home.</span>
              </h4>
              <p className="text-[11px] text-[#756762] mt-1.5 font-medium">Safe • Affordable • Student-friendly</p>
              <div className="mt-3 flex justify-center">
                <div className="px-5 py-2 bg-[#B85C52] text-[#FFFDF9] rounded-full text-xs font-medium shadow-sm">
                  Find Accommodation
                </div>
              </div>
            </div>
            <div className="text-[10px] text-[#756762] pt-2">Near your campus</div>
          </div>
        )}

        {assetId === 'poster-study' && (
          <div className="absolute inset-0 bg-[#F7F1E8] flex flex-col justify-between p-5 text-center text-[#2D2421]">
            <div className="flex justify-center pt-2">
              <CampusNestLogo variant="stacked" size="sm" showTagline={false} />
            </div>
            {/* Room interior representation */}
            <div className="mx-auto w-full max-w-[220px] aspect-[4/3] rounded-2xl border border-[#D99A8F] bg-[#FFFDF9] p-2 flex flex-col justify-center items-center my-2 shadow-inner">
              <div className="w-full h-full rounded-xl bg-[#F7F1E8] border border-[#D99A8F]/40 flex flex-col justify-center items-center p-2 text-center">
                <span className="text-xl mb-1">📚</span>
                <span className="font-serif text-xs font-semibold text-[#2D2421]">Study Quarters</span>
                <span className="text-[9px] text-[#756762]">Ergonomic desk, lamp & single bed</span>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#2D2421] leading-tight">
                Find a place that feels like home.
              </h4>
              <p className="text-[10px] text-[#756762] mt-1">Safe, affordable and student-friendly accommodation near your campus.</p>
              <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                <div className="bg-[#FFFDF9] border border-[#D99A8F] rounded-lg p-1.5 text-[9px] text-[#2D2421] font-medium">
                  ✓ Verified
                </div>
                <div className="bg-[#FFFDF9] border border-[#D99A8F] rounded-lg p-1.5 text-[9px] text-[#2D2421] font-medium">
                  📍 Near Campus
                </div>
                <div className="bg-[#FFFDF9] border border-[#D99A8F] rounded-lg p-1.5 text-[9px] text-[#2D2421] font-medium">
                  🤝 Student-Friendly
                </div>
              </div>
              <div className="mt-2.5 flex justify-center">
                <div className="px-4 py-1.5 bg-[#B85C52] text-[#FFFDF9] rounded-full text-xs font-medium">
                  Find Accommodation
                </div>
              </div>
            </div>
            <div className="text-[10px] text-[#756762]">Safe • Affordable • Student-friendly</div>
          </div>
        )}

        {assetId === 'poster-minimal' && (
          <div className="absolute inset-0 bg-[#F7F1E8] flex flex-col justify-between p-5 text-center text-[#2D2421]">
            <div className="flex justify-center pt-2">
              <CampusNestLogo variant="horizontal" size="sm" showTagline={false} />
            </div>
            <div className="mx-auto w-full max-w-[220px] aspect-[4/3] rounded-2xl border border-[#D99A8F] bg-[#FFFDF9] p-2 flex flex-col justify-center items-center my-2 shadow-inner">
              <div className="w-full h-full rounded-xl bg-[#F7F1E8] border border-[#D99A8F]/40 flex flex-col justify-center items-center p-2 text-center">
                <span className="text-xl mb-1">🌿</span>
                <span className="font-serif text-xs font-semibold text-[#2D2421]">Linen & Corkboard Haven</span>
                <span className="text-[9px] text-[#756762]">White drawer desk & serene lighting</span>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#2D2421]">Find a place that feels like home.</h4>
              <p className="text-[10px] text-[#756762] mt-1">Safe, affordable and student-friendly accommodation near your campus.</p>
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                <div className="bg-[#FFFDF9] border border-[#D99A8F] rounded-lg p-1 text-[9px]">Verified</div>
                <div className="bg-[#FFFDF9] border border-[#D99A8F] rounded-lg p-1 text-[9px]">Campus Close</div>
                <div className="bg-[#FFFDF9] border border-[#D99A8F] rounded-lg p-1 text-[9px]">Comfortable</div>
              </div>
              <div className="mt-2.5 flex justify-center">
                <div className="px-4 py-1.5 bg-[#B85C52] text-[#FFFDF9] rounded-full text-xs font-medium">
                  Find Accommodation
                </div>
              </div>
            </div>
            <div className="text-[10px] text-[#756762] italic">"Find a place that feels like home."</div>
          </div>
        )}

        {assetId === 'visiting-card' && (
          <div className="absolute inset-0 bg-[#F7F1E8] p-4 flex flex-col justify-center gap-3">
            {/* Card Front */}
            <div className="w-full bg-[#FFFDF9] border border-[#D99A8F] rounded-xl p-3 shadow-sm flex flex-col items-center justify-center text-center">
              <CampusNestLogo variant="stacked" size="sm" />
              <div className="w-6 h-0.5 bg-[#B85C52] my-1" />
              <span className="text-[9px] text-[#756762]">Safe • Affordable • Student-friendly</span>
            </div>
            {/* Card Back (Deep Brown as in attached image) */}
            <div className="w-full bg-[#2D2421] border border-[#D99A8F]/40 rounded-xl p-3 shadow-sm text-center text-[#F7F1E8] relative overflow-hidden">
              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#D99A8F]" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#D99A8F]" />
              <div className="bg-[#FFFDF9] px-2 py-1 rounded inline-block mx-auto mb-2">
                <CampusNestLogo variant="iconOnly" size="sm" theme="light" />
              </div>
              <p className="text-xs font-serif font-bold text-[#F7F1E8]">Sabitha S</p>
              <p className="text-[10px] text-[#D99A8F] font-medium">Founder</p>
              <div className="text-[9px] text-[#F7F1E8]/80 mt-1.5 space-y-0.5">
                <p>Phone: 1234567890</p>
                <p>Email: sabi@123gmail.com</p>
                <p>Website: campusnest.co</p>
              </div>
            </div>
          </div>
        )}

        {assetId === 'letter-pad' && (
          <div className="absolute inset-0 bg-[#FFFDF9] border border-[#D99A8F] flex flex-col justify-between p-4 text-[#2D2421] relative overflow-hidden">
            {/* Top letterhead bar */}
            <div className="text-center pb-2 border-b border-[#F7F1E8]">
              <div className="flex justify-center">
                <CampusNestLogo variant="stacked" size="sm" />
              </div>
            </div>
            {/* Translucent emblem watermark in body */}
            <div className="my-auto flex flex-col items-center justify-center opacity-10">
              <CampusNestLogo variant="iconOnly" size="xl" />
            </div>
            {/* Deep Brown Bottom Footer */}
            <div className="bg-[#2D2421] -mx-4 -mb-4 p-3 text-center text-[#F7F1E8]">
              <p className="text-[10px] font-medium text-[#F7F1E8]">Safe • Affordable • Student-friendly</p>
              <p className="text-[9px] text-[#D99A8F] mt-0.5">hello@campusnest.co | www.campusnest.co</p>
              <p className="text-[8px] text-[#F7F1E8]/70 mt-0.5">(555) 123-4567 | 4500 University Dr, Campus Town</p>
            </div>
          </div>
        )}

        {assetId === 'linkedin-banner' && (
          <div className="absolute inset-0 bg-[#2D2421] p-6 flex items-center justify-between text-[#F7F1E8] border border-[#D99A8F]/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] flex items-center justify-center p-2 shadow-sm">
                <CampusNestLogo variant="iconOnly" size="sm" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#F7F1E8]">CampusNest</h4>
                <p className="text-xs text-[#D99A8F]">Find a place that feels like home.</p>
                <p className="text-[10px] text-[#F7F1E8]/80 mt-1">Safe • Affordable • Student-friendly accommodation near your campus</p>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right text-xs text-[#D99A8F]">
              <span className="font-serif font-semibold text-[#F7F1E8]">Zero Brokerage</span>
              <span>100% Verified Student Housing</span>
            </div>
          </div>
        )}

        {assetId === 'logo-spec' && (
          <div className="absolute inset-0 bg-[#F7F1E8] p-5 flex flex-col justify-between text-[#2D2421]">
            <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-2">
              <span className="text-xs font-medium text-[#756762]">02. Brand Logo</span>
              <span className="text-xs font-serif text-[#B85C52]">Clear Space & Sizing</span>
            </div>
            <div className="flex items-center justify-center my-auto">
              <div className="border border-dashed border-[#B85C52] p-6 rounded-2xl bg-[#FFFDF9] text-center">
                <CampusNestLogo variant="stacked" size="md" />
                <span className="text-[10px] text-[#756762] block mt-2">Clear space: 100px on each side</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#756762] border-t border-[#D99A8F]/40 pt-2">
              <span>Minimum Size: 1.58 inch / 152 px width</span>
              <span>Obsidian Black & Canyon Clay</span>
            </div>
          </div>
        )}
      </div>

      {/* Meta caption bar with exact requested text */}
      <div className="p-4 border-t border-[#D99A8F]/40 bg-[#FFFDF9] flex items-center justify-between">
        <div>
          <h4 className="font-serif text-base font-bold text-[#2D2421]">{meta.title}</h4>
          <p className="text-xs text-[#756762]">{meta.subtitle}</p>
        </div>
        <div className="text-right">
          <span className="inline-block text-[11px] font-medium text-[#B85C52] bg-[#F7F1E8] px-2.5 py-1 rounded-full border border-[#D99A8F]/50">
            Created with Canva/Pomelli
          </span>
        </div>
      </div>
    </div>
  );
};
