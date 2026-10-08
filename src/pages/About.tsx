import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CampusNestLogo } from '../components/common/CampusNestLogo';
import { BrandAssetVisual, BrandAssetId, BRAND_ASSETS_META } from '../components/common/BrandAssetVisual';
import { Copy, Check, X, ChevronLeft, ChevronRight, Sparkles, HeartHandshake, ShieldCheck, Home as HomeIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const About: React.FC = () => {
  const { showToast } = useApp();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Lightbox modal state for Brand Assets Gallery
  const [activeAssetId, setActiveAssetId] = useState<BrandAssetId | null>(null);

  const personalityChips = [
    { title: 'Warm', desc: 'A welcoming, supportive environment that feels like home.' },
    { title: 'Safe', desc: 'Verified security, female wardens, and 24/7 protection.' },
    { title: 'Trustworthy', desc: 'Zero brokerage, no fake listings, verified student reviews.' },
    { title: 'Comfortable', desc: 'Ergonomic study spaces, hygienic meals, and clean rooms.' },
    { title: 'Modern', desc: 'Seamless digital search, comparison tools, and direct booking.' },
    { title: 'Student-friendly', desc: 'Affordable pricing aligned with college budgets and calendars.' }
  ];

  const brandSwatches = [
    { name: 'Deep Brown / Obsidian Black', hex: '#2D2421', desc: 'Headings, navbar, footer & dark sections', darkText: false },
    { name: 'Canyon Clay / Terracotta', hex: '#B85C52', desc: 'Primary buttons, active states, key emphasis', darkText: false },
    { name: 'Muted Rose', hex: '#D99A8F', desc: 'Borders, hover states, tags, soft accents', darkText: true },
    { name: 'Classic Linen / Cream', hex: '#F7F1E8', desc: 'Main canvas & page background', darkText: true },
    { name: 'Off-White', hex: '#FFFDF9', desc: 'Cards, inputs, forms, and surfaces', darkText: true },
    { name: 'Warm Grey', hex: '#756762', desc: 'Body and secondary descriptive text', darkText: false },
    { name: 'Caramel Brown / Gold', hex: '#C99A4A', desc: 'Rating stars and verified badges only', darkText: false }
  ];

  const galleryAssetIds: BrandAssetId[] = [
    'brand-book-cover',
    'poster-cozy',
    'visiting-card',
    'letter-pad',
    'poster-study',
    'linkedin-banner',
    'poster-minimal',
    'logo-spec'
  ];

  const handleCopyHex = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    showToast(`Copied ${hex} (${name}) to clipboard! 🎨`, 'success');
    setTimeout(() => setCopiedHex(null), 2500);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeAssetId) return;
      const currentIndex = galleryAssetIds.indexOf(activeAssetId);

      if (e.key === 'Escape') {
        setActiveAssetId(null);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % galleryAssetIds.length;
        setActiveAssetId(galleryAssetIds[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + galleryAssetIds.length) % galleryAssetIds.length;
        setActiveAssetId(galleryAssetIds[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAssetId, galleryAssetIds]);

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* SECTION 1: ABOUT CAMPUSNEST & THE STUDENT HOUSING PROBLEM */}
        <section className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF9] border border-[#D99A8F]">
            <span className="w-2 h-2 rounded-full bg-[#B85C52]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#2D2421]">
              About CampusNest
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2D2421] leading-tight">
            The Student Housing Problem & Why We Exist
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#B85C52] italic">
            "Find a place that feels like home."
          </p>

          <div className="space-y-4 text-base sm:text-lg text-[#756762] leading-relaxed">
            <p>
              Every academic year, over 4 million college students across India leave their hometowns to pursue higher education. For newcomers arriving in bustling university hubs like Chennai, finding safe, clean, and reasonably priced accommodation is often an overwhelming ordeal.
            </p>
            <p>
              Students and their parents routinely face high broker commissions (often charging a full month’s rent), misleading photo listings that conceal cramped conditions, unhygienic dining facilities, and security blindspots. Female students face even steeper hurdles finding accommodations that guarantee genuine 24/7 security and empathetic wardens.
            </p>
            <p>
              CampusNest was founded to solve this student housing crisis at its root: by creating a trustworthy, student-centric marketplace that rigorously physically verifies every PG, hostel, and shared flat near campus, guarantees zero brokerage fees, and fosters a comforting community that truly feels like home.
            </p>
          </div>
        </section>

        {/* SECTION 2: OUR MISSION */}
        <section className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 sm:p-12 shadow-[0_12px_32px_rgba(45,36,33,0.08)]">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Our North Star
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421]">
              Our Mission
            </h2>
            <p className="text-lg text-[#756762] leading-relaxed">
              To empower every college student with access to safe, affordable, transparent, and comfortable living spaces within easy reach of their university, removing the friction of moving away from home so they can focus wholeheartedly on learning, growing, and thriving.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#2D2421]">
              <span className="flex items-center gap-1.5 bg-[#F7F1E8] px-3 py-1.5 rounded-full border border-[#D99A8F]">
                ✓ Zero Brokerage
              </span>
              <span className="flex items-center gap-1.5 bg-[#F7F1E8] px-3 py-1.5 rounded-full border border-[#D99A8F]">
                ✓ 100% Physical Inspection
              </span>
              <span className="flex items-center gap-1.5 bg-[#F7F1E8] px-3 py-1.5 rounded-full border border-[#D99A8F]">
                ✓ Safe Warden Protocols
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: BRAND PERSONALITY AS SIX ANIMATED CHIPS */}
        <section className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Brand Archetype
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
              Brand Personality
            </h2>
            <p className="text-sm text-[#756762] mt-1">
              Six foundational traits that define how CampusNest communicates, behaves, and serves students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalityChips.map((chip, idx) => (
              <motion.div
                key={chip.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm hover:border-[#B85C52] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-[#2D2421]">{chip.title}</h3>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B85C52]" />
                </div>
                <p className="text-xs text-[#756762] leading-relaxed">{chip.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: OFFICIAL LOGO ON CREAM AND DEEP BROWN PANELS */}
        <section className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Logo Mark & Identity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
              Official Brand Logo
            </h2>
            <p className="text-sm text-[#756762] mt-1">
              Displayed using the attached official mark: the location pin teardrop intertwining with a protected home emblem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cream Panel */}
            <div className="rounded-[24px] bg-[#F7F1E8] border-2 border-[#D99A8F] p-8 sm:p-12 shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-wider text-[#756762] mb-6 font-semibold">
                Classic Linen (#F7F1E8) Surface
              </span>
              <CampusNestLogo variant="stacked" size="xl" showTagline />
              <div className="mt-8 pt-4 border-t border-[#D99A8F]/40 w-full text-[11px] text-[#756762]">
                Primary Identity Lockup for light backgrounds
              </div>
            </div>

            {/* Deep Brown Panel */}
            <div className="rounded-[24px] bg-[#2D2421] border-2 border-[#D99A8F]/40 p-8 sm:p-12 shadow-md flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-wider text-[#D99A8F] mb-6 font-semibold">
                Obsidian Black / Deep Brown (#2D2421) Surface
              </span>
              <CampusNestLogo variant="stacked" theme="dark" size="xl" showTagline />
              <div className="mt-8 pt-4 border-t border-[#D99A8F]/20 w-full text-[11px] text-[#D99A8F]">
                High-contrast Lockup for dark hero & footer sections
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BRAND COLOURS AS 7 SWATCHES (Copy on Click) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
                Strict 7-Color Palette
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
                Brand Colours
              </h2>
              <p className="text-sm text-[#756762] mt-1">
                Click any swatch below to copy its exact HEX code.
              </p>
            </div>
            {copiedHex && (
              <span className="text-xs font-semibold text-[#B85C52] bg-[#FFFDF9] px-3 py-1 rounded-full border border-[#D99A8F]">
                ✓ Copied {copiedHex}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brandSwatches.map((color) => {
              const isCopied = copiedHex === color.hex;
              return (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => handleCopyHex(color.hex, color.name)}
                  className="group text-left rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] overflow-hidden p-3 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div
                    style={{ backgroundColor: color.hex }}
                    className="w-full h-24 rounded-[14px] border border-black/5 flex items-end justify-end p-2 transition-transform duration-200 group-hover:scale-[1.02]"
                  >
                    <span className="p-1 rounded-full bg-[#FFFDF9]/80 text-[#2D2421] opacity-0 group-hover:opacity-100 transition-opacity">
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#B85C52]" /> : <Copy className="w-3.5 h-3.5" />}
                    </span>
                  </div>

                  <div className="pt-3 px-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2D2421]">{color.hex}</span>
                      <span className="text-[10px] text-[#B85C52] group-hover:underline">Copy</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#2D2421] truncate">{color.name}</h4>
                    <p className="text-[11px] text-[#756762] line-clamp-1">{color.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: TYPOGRAPHY (Vollkorn and DM Sans Samples) */}
        <section className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Type Pairing System
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
              Brand Typography
            </h2>
            <p className="text-sm text-[#756762] mt-1">
              Curated for editorial warmth, clarity, and reassuring legibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#D99A8F]/40">
            {/* Vollkorn Sample */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#B85C52] font-semibold">
                Primary Display & Headings Face
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D2421]">
                Vollkorn Serif
              </h3>
              <p className="font-serif text-xl italic text-[#756762]">
                "Find a place that feels like home."
              </p>
              <div className="p-4 rounded-xl bg-[#F7F1E8] border border-[#D99A8F]/40 text-xs font-serif text-[#2D2421] leading-relaxed">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789<br />
                Line-height: 1.1 • Warm, literary, trustworthy serif.
              </div>
            </div>

            {/* DM Sans Sample */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#B85C52] font-semibold">
                Secondary Body & UI Face
              </span>
              <h3 className="font-sans text-3xl sm:text-4xl font-bold text-[#2D2421]">
                DM Sans
              </h3>
              <p className="text-base text-[#756762]">
                Safe • Affordable • Student-friendly accommodation near your campus.
              </p>
              <div className="p-4 rounded-xl bg-[#F7F1E8] border border-[#D99A8F]/40 text-xs font-sans text-[#2D2421] leading-relaxed">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz 0123456789<br />
                Line-height: 1.6 • Geometric, crisp, student-friendly legibility.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: BRAND ASSETS GALLERY (Masonry Grid with Zoom & Lightbox) */}
        <section id="brand-assets" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
                Brand Collateral Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
                Official Brand Assets Gallery
              </h2>
              <p className="text-sm text-[#756762] mt-1">
                Attached brand collateral including brand book, poster, LinkedIn banner, visiting card, letter pad, and specifications.
              </p>
            </div>
            <span className="text-xs text-[#756762]">
              Click any asset to open enlarged lightbox (arrow keys supported)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryAssetIds.map((assetId) => (
              <BrandAssetVisual
                key={assetId}
                assetId={assetId}
                onClick={() => setActiveAssetId(assetId)}
                className="cursor-pointer"
              />
            ))}
          </div>
        </section>

        {/* SECTION 8: DESIGN PROCESS STEPPER ON DEEP BROWN BACKGROUND */}
        <section className="rounded-[28px] bg-[#2D2421] text-[#F7F1E8] p-8 sm:p-14 border border-[#D99A8F]/30 shadow-xl space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
              Design Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F1E8]">
              Design Process
            </h2>
            <p className="text-sm text-[#D99A8F]">
              How the CampusNest identity and product came to life from vision to interface.
            </p>
          </div>

          {/* Stepper with one line of explanation per step */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FFFDF9]/5 border border-[#D99A8F]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-xl font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F7F1E8]">Brand Creation</h3>
              <p className="text-sm text-[#D99A8F] leading-relaxed">
                Researched student pain points in Chennai, established the 7-color palette in Pomelli/Canva, and drafted the core identity book.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FFFDF9]/5 border border-[#D99A8F]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-xl font-bold flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F7F1E8]">Framer</h3>
              <p className="text-sm text-[#D99A8F] leading-relaxed">
                Crafted high-fidelity editorial layouts, responsive card containers, and spatial micro-interactions adhering to typographic scales.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FFFDF9]/5 border border-[#D99A8F]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-xl font-bold flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F7F1E8]">Testing & Improvement</h3>
              <p className="text-sm text-[#D99A8F] leading-relaxed">
                Conducted real college student interviews on mobile navigation and refined search filtering, contrast, and comparison workflows.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal with Keyboard Navigation */}
      <AnimatePresence>
        {activeAssetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2421]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full bg-[#FFFDF9] border border-[#D99A8F] rounded-[24px] p-6 shadow-2xl flex flex-col space-y-4"
            >
              {/* Top controls */}
              <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2421]">
                    {BRAND_ASSETS_META[activeAssetId].title}
                  </h3>
                  <p className="text-xs text-[#756762]">
                    {BRAND_ASSETS_META[activeAssetId].subtitle} • {BRAND_ASSETS_META[activeAssetId].caption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAssetId(null)}
                  className="p-1.5 rounded-full border border-[#D99A8F] text-[#2D2421] hover:bg-[#F7F1E8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large asset canvas */}
              <div className="max-h-[65vh] overflow-y-auto">
                <BrandAssetVisual assetId={activeAssetId} />
              </div>

              {/* Bottom Nav arrows & explanation */}
              <div className="flex items-center justify-between pt-2 border-t border-[#D99A8F]/30 text-xs text-[#756762]">
                <p className="max-w-md italic">{BRAND_ASSETS_META[activeAssetId].description}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = galleryAssetIds.indexOf(activeAssetId);
                      const prev = (idx - 1 + galleryAssetIds.length) % galleryAssetIds.length;
                      setActiveAssetId(galleryAssetIds[prev]);
                    }}
                    className="p-2 rounded-full border border-[#D99A8F] hover:bg-[#F7F1E8]"
                    aria-label="Previous Asset"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = galleryAssetIds.indexOf(activeAssetId);
                      const next = (idx + 1) % galleryAssetIds.length;
                      setActiveAssetId(galleryAssetIds[next]);
                    }}
                    className="p-2 rounded-full border border-[#D99A8F] hover:bg-[#F7F1E8]"
                    aria-label="Next Asset"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
