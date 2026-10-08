import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';
import { ACCOMMODATIONS, CHENNAI_COLLEGES } from '../data/accommodations';
import { PropertyCard } from '../components/common/PropertyCard';
import { CampusWalkMap } from '../components/common/CampusWalkMap';
import { CampusNestMark } from '../components/common/CampusNestLogo';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setFilters } = useApp();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetSelect, setBudgetSelect] = useState('20000');
  const [typeSelect, setTypeSelect] = useState('All');

  // Hero image error state
  const [heroImageError, setHeroImageError] = useState(false);
  const [failedBrowseImages, setFailedBrowseImages] = useState<Record<string, boolean>>({});

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Testimonials carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  const heroImageSrc = '/images/hero-student-room.webp';
  const heroImageSrcSet = '/images/hero-student-room-600w.webp 600w, /images/hero-student-room.webp 1200w';

  const testimonials = [
    {
      name: 'Aditya Swaminathan',
      college: 'SRM Institute of Science & Technology, CSE 3rd Year',
      room: "The Scholar's Haven PG",
      text: 'Moving to Chennai from Coimbatore for college was stressful until I found CampusNest. I booked a verified single PG within 5 minutes walking distance to campus with zero broker hassle. Clean, safe, and nutritious food.',
      rating: 5
    },
    {
      name: 'Pooja Venkatesh',
      college: 'Loyola College, M.Com',
      room: 'Loyola Residency & Girls Hostel',
      text: 'Safety was my parents’ number one requirement. The biometric security, dedicated female resident warden, and supportive students in my PG gave my family complete peace of mind throughout my college years.',
      rating: 5
    },
    {
      name: 'Karthik Subramanian',
      college: 'Anna University (CEG), Mechanical',
      room: 'Anna Tech Quarters PG',
      text: 'CampusNest allowed me to compare 3 rooms side-by-side on rent, distance, and Wi-Fi speed. The student reviews are genuinely written by actual university seniors, making decision making transparent.',
      rating: 5
    }
  ];

  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialHovered, testimonials.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery,
      budgetMax: Number(budgetSelect),
      type: typeSelect
    }));
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}&budget=${budgetSelect}&type=${encodeURIComponent(typeSelect)}`);
  };

  const handleTypeChipClick = (t: string) => {
    setTypeSelect(t);
  };

  const handleBrowseTypeClick = (typeName: string) => {
    setFilters((prev) => ({
      ...prev,
      type: typeName
    }));
    navigate(`/explore?type=${encodeURIComponent(typeName)}`);
  };

  const faqs = [
    {
      q: 'Is there any brokerage or hidden agent fees on CampusNest?',
      a: 'Zero brokerage. CampusNest connects students directly with verified property owners and wardens. All rents, deposits, and amenities are 100% transparent with no intermediary commission.'
    },
    {
      q: 'How are accommodations verified for safety and student comfort?',
      a: 'Every property undergoes our physical verification checklist covering CCTV surveillance, round-the-clock security, working backup electricity, fire safety readiness, clean water supplies, and warden protocols.'
    },
    {
      q: 'Can I schedule a visit or enquire before paying any deposit?',
      a: 'Yes! Simply use the "Enquire Now" button on any property page to ask questions, verify current bed availability, and schedule an on-premise visit before making any financial commitment.'
    },
    {
      q: 'Are meals and Wi-Fi included in the monthly rent?',
      a: 'Most student PGs and hostels on CampusNest include 3 daily meals (breakfast, lunch, and dinner) along with high-speed fiber Wi-Fi. Full inclusions are clearly displayed on each accommodation card.'
    },
    {
      q: 'Can I find a compatible roommate through CampusNest?',
      a: 'Yes, our Roommate Finder connects students attending the same or nearby colleges based on shared budget, lifestyle habits (early bird vs. night owl), and study routines with privacy protection.'
    },
    {
      q: 'What is the standard security deposit and notice period?',
      a: 'Most student accommodations require a 1 to 2 month refundable security deposit and a 30-day notice period prior to vacating, all clearly stated upfront.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421]">
      {/* 1. HERO SECTION (Split Hero with Mobile Reordering) */}
      <section className="relative pt-24 sm:pt-32 pb-16 lg:pb-24">
        {/* Soft terracotta glow behind hero */}
        <div className="absolute top-24 right-12 w-96 h-96 rounded-full bg-[#B85C52]/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              {/* Category Pill / Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF9] border border-[#D99A8F] shadow-xs self-start">
                <span className="w-2 h-2 rounded-full bg-[#B85C52]" />
                <span className="text-xs font-semibold tracking-wider text-[#2D2421] uppercase">
                  STUDENT ACCOMMODATION PLATFORM
                </span>
              </div>

              {/* H1 Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#2D2421] leading-[1.08] tracking-tight">
                Find a place that <br />
                <span className="text-[#B85C52] italic font-normal">feels like home.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#756762] max-w-xl font-normal leading-relaxed">
                Safe, affordable and student-friendly accommodation near your campus. Zero brokerage, verified listings.
              </p>

              {/* MOBILE ONLY: Hero Image directly under text on 390px mobile screens */}
              <div className="block lg:hidden my-2">
                <div className="relative overflow-hidden rounded-[24px] border-2 border-[#D99A8F] bg-[#FFFDF9] p-2 shadow-[0_16px_36px_rgba(45,36,33,0.12)]">
                  <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-[#F7F1E8]">
                    {!heroImageError ? (
                      <img
                        src={heroImageSrc}
                        srcSet={heroImageSrcSet}
                        sizes="(max-width: 640px) 100vw, 600px"
                        alt="Cosy student bedroom near Chennai campus"
                        className="w-full h-full object-cover block"
                        width={600}
                        height={450}
                        loading="eager"
                        fetchPriority="high"
                        onError={() => setHeroImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F7F1E8] border border-[#D99A8F]/40 flex flex-col items-center justify-center p-6 text-center select-none">
                        <div className="w-14 h-14 rounded-full bg-[#FFFDF9] border border-[#D99A8F] flex items-center justify-center shadow-xs mb-2">
                          <CampusNestMark sizePx={34} />
                        </div>
                        <span className="font-serif text-sm font-semibold text-[#2D2421]">CampusNest Verified</span>
                        <span className="text-xs text-[#756762] mt-0.5">Cosy student living near Chennai campus</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9]/95 text-[#2D2421] border border-[#C99A4A] shadow-sm text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#C99A4A]" />
                      <span>Verified Stay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Off-White Search Card */}
              <form
                onSubmit={handleSearchSubmit}
                className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-5 sm:p-6 shadow-[0_12px_32px_rgba(45,36,33,0.10)] space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Location input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#756762]">Location / College</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#B85C52] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search college, area or city"
                        className="w-full h-11 pl-9 pr-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] placeholder:text-[#756762]/70 focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                      />
                    </div>
                  </div>

                  {/* Budget Select */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#756762]">Budget</label>
                    <select
                      value={budgetSelect}
                      onChange={(e) => setBudgetSelect(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                    >
                      <option value="8000">Up to ₹8,000/mo</option>
                      <option value="12000">Up to ₹12,000/mo</option>
                      <option value="16000">Up to ₹16,000/mo</option>
                      <option value="25000">Up to ₹25,000/mo</option>
                    </select>
                  </div>

                  {/* Accommodation Type Select */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#756762]">Accommodation Type</label>
                    <select
                      value={typeSelect}
                      onChange={(e) => setTypeSelect(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                    >
                      <option value="All">All Types</option>
                      <option value="PG">PG</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Shared Room">Shared Room</option>
                      <option value="Flat">Flat</option>
                    </select>
                  </div>
                </div>

                {/* Quick Chips & Full-width Mobile Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-[#756762] mr-1">Quick:</span>
                    {['PG', 'Hostel', 'Shared Room', 'Flat'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTypeChipClick(t)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                          typeSelect === t
                            ? 'bg-[#B85C52] text-[#FFFDF9] border-[#B85C52]'
                            : 'bg-[#F7F1E8] text-[#2D2421] border-[#D99A8F] hover:bg-[#D99A8F]/30'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center h-[52px] sm:h-12 px-7 rounded-full bg-[#B85C52] text-[#FFFDF9] text-sm font-bold tracking-wide hover:bg-[#D99A8F] hover:text-[#2D2421] hover:-translate-y-0.5 active:scale-[0.97] transition-all shadow-sm shrink-0"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    <span>Find Accommodation</span>
                  </button>
                </div>
              </form>
            </div>

            {/* DESKTOP ONLY: Right Large Room Photo Frame */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="relative overflow-hidden rounded-[28px] border-2 border-[#D99A8F] bg-[#FFFDF9] p-3 shadow-[0_20px_48px_rgba(45,36,33,0.12)]">
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-[#F7F1E8]">
                  {!heroImageError ? (
                    <img
                      src={heroImageSrc}
                      srcSet={heroImageSrcSet}
                      sizes="(min-width: 1024px) 45vw, 600px"
                      alt="Warm sunlit Indian student accommodation in Chennai"
                      className="w-full h-full object-cover block"
                      width={800}
                      height={1000}
                      loading="eager"
                      fetchPriority="high"
                      onError={() => setHeroImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F7F1E8] border border-[#D99A8F]/40 flex flex-col items-center justify-center p-8 text-center select-none">
                      <div className="w-16 h-16 rounded-full bg-[#FFFDF9] border border-[#D99A8F] flex items-center justify-center shadow-xs mb-3">
                        <CampusNestMark sizePx={40} />
                      </div>
                      <span className="font-serif text-base font-semibold text-[#2D2421]">CampusNest Verified Home</span>
                      <span className="text-xs text-[#756762] mt-1">Safe, affordable and student-friendly</span>
                    </div>
                  )}

                  {/* Floating Card 1: Verified Listings with Gold Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-6 left-6 rounded-2xl bg-[#FFFDF9]/95 border border-[#C99A4A] p-3.5 shadow-lg flex items-center gap-2.5 backdrop-blur-xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C99A4A]/15 border border-[#C99A4A] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#C99A4A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2D2421]">Verified Listings</p>
                      <p className="text-[10px] text-[#756762]">Physical campus check</p>
                    </div>
                  </motion.div>

                  {/* Floating Card 2: Student Rated with Gold Stars */}
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="absolute bottom-6 right-6 rounded-2xl bg-[#FFFDF9]/95 border border-[#D99A8F] p-3.5 shadow-lg flex items-center gap-2.5 backdrop-blur-xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center">
                      <Star className="w-4 h-4 fill-[#C99A4A] text-[#C99A4A]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#2D2421]">4.9 / 5.0</span>
                        <span className="text-[10px] text-[#C99A4A]">★★★★★</span>
                      </div>
                      <p className="text-[10px] text-[#756762]">Student verified reviews</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="py-10 bg-[#F7F1E8] border-t border-[#D99A8F]/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D99A8F]/50">
              <div className="w-11 h-11 rounded-xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#B85C52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#2D2421]">Verified Listings</h4>
                <p className="text-xs text-[#756762]">Inspected properties</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D99A8F]/50">
              <div className="w-11 h-11 rounded-xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#B85C52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#2D2421]">Near Campus</h4>
                <p className="text-xs text-[#756762]">Walking distance</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D99A8F]/50">
              <div className="w-11 h-11 rounded-xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#B85C52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#2D2421]">Zero Brokerage</h4>
                <p className="text-xs text-[#756762]">No hidden charges</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D99A8F]/50">
              <div className="w-11 h-11 rounded-xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#B85C52]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#2D2421]">Student Support</h4>
                <p className="text-xs text-[#756762]">Move-in assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEARBY COLLEGES MARQUEE (Slow loop, pauses on hover) */}
      <div
        onMouseEnter={() => setIsMarqueeHovered(true)}
        onMouseLeave={() => setIsMarqueeHovered(false)}
        className="py-4 border-y border-[#D99A8F]/40 bg-[#FFFDF9] overflow-hidden whitespace-nowrap cursor-pointer"
      >
        <div
          className={`flex items-center gap-8 text-xs font-medium text-[#756762] tracking-wider uppercase transition-all duration-300 ${
            isMarqueeHovered ? 'opacity-90' : 'animate-pulse'
          }`}
        >
          <span className="text-[#B85C52] font-bold">Leading Chennai Colleges:</span>
          {CHENNAI_COLLEGES.concat(CHENNAI_COLLEGES).map((college, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span>{college}</span>
              <span className="text-[#D99A8F]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. FEATURED ACCOMMODATIONS (4 Property Cards) */}
      <section className="py-20 bg-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
                Curated Student Homes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1.5">
                Featured Accommodations
              </h2>
              <p className="text-sm sm:text-base text-[#756762] mt-1 max-w-lg">
                Top-rated hostels, PGs and shared flats near major educational campuses.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B85C52] hover:text-[#2D2421] transition-colors"
            >
              <span>Explore All Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACCOMMODATIONS.slice(0, 4).map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} priority={idx < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. "SEE HOW CLOSE YOU ARE" TEASER (Compact interactive walking map teaser) */}
      <section className="py-20 bg-[#F7F1E8] border-t border-[#D99A8F]/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Live Transit Teaser
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
              See How Close You Are
            </h2>
            <p className="text-sm text-[#756762] mt-2">
              Preview walking routes from our verified student stays to campus gates, libraries, and transport.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <CampusWalkMap
              propertyTitle={ACCOMMODATIONS[0].title}
              originCoord={ACCOMMODATIONS[0].originCoord}
              landmarks={ACCOMMODATIONS[0].landmarks}
              compact
              onExploreClick={() => navigate('/explore')}
            />
          </div>
        </div>
      </section>

      {/* 6. BROWSE BY TYPE (Photo Tiles with Terracotta Overlay) */}
      <section className="py-20 bg-[#FFFDF9] border-y border-[#D99A8F]/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Filter by Format
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
              Browse by Accommodation Type
            </h2>
            <p className="text-sm text-[#756762] mt-2">
              Choose the accommodation style that matches your budget and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: 'PG',
                name: 'Paying Guest (PG)',
                desc: 'Meals, Wi-Fi & housekeeping included',
                image: '/images/srm-scholars-haven-pg.webp',
                srcSet: '/images/srm-scholars-haven-pg-600w.webp 600w, /images/srm-scholars-haven-pg.webp 1200w',
                count: '5 Listings'
              },
              {
                type: 'Hostel',
                name: 'Student Hostels',
                desc: 'Shared dorms, games & study rooms',
                image: '/images/loyola-residency-hostel.webp',
                srcSet: '/images/loyola-residency-hostel-600w.webp 600w, /images/loyola-residency-hostel.webp 1200w',
                count: '3 Listings'
              },
              {
                type: 'Shared Room',
                name: 'Shared Rooms',
                desc: 'Twin & triple sharing with peers',
                image: '/images/thoraipakkam-shared-loft.webp',
                srcSet: '/images/thoraipakkam-shared-loft-600w.webp 600w, /images/thoraipakkam-shared-loft.webp 1200w',
                count: '2 Listings'
              },
              {
                type: 'Flat',
                name: 'Student Apartments',
                desc: 'Furnished 2BHK flats with kitchens',
                image: '/images/aura-coliving-flat.webp',
                srcSet: '/images/aura-coliving-flat-600w.webp 600w, /images/aura-coliving-flat.webp 1200w',
                count: '2 Listings'
              }
            ].map((item) => (
              <div
                key={item.type}
                onClick={() => handleBrowseTypeClick(item.type)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#D99A8F] bg-[#FFFDF9] p-2 shadow-[0_12px_32px_rgba(45,36,33,0.08)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-[16px] aspect-[4/3] bg-[#F7F1E8]">
                  {!failedBrowseImages[item.type] ? (
                    <img
                      src={item.image}
                      srcSet={item.srcSet}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 block"
                      width={400}
                      height={300}
                      loading="lazy"
                      onError={() => setFailedBrowseImages((prev) => ({ ...prev, [item.type]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F7F1E8] border border-[#D99A8F]/40 flex flex-col items-center justify-center p-4 text-center select-none">
                      <div className="w-12 h-12 rounded-full bg-[#FFFDF9] border border-[#D99A8F] flex items-center justify-center shadow-xs mb-2">
                        <CampusNestMark sizePx={28} />
                      </div>
                      <span className="font-serif text-xs font-semibold text-[#2D2421]">CampusNest</span>
                      <span className="text-[10px] text-[#756762]">{item.name}</span>
                    </div>
                  )}
                  {/* Terracotta hover overlay */}
                  <div className="absolute inset-0 bg-[#B85C52]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="px-4 py-2 rounded-full bg-[#FFFDF9] text-[#2D2421] text-xs font-semibold shadow-md">
                      Explore {item.type}s →
                    </span>
                  </div>
                </div>

                <div className="p-4 pt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-[#2D2421] group-hover:text-[#B85C52] transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xs text-[#756762]">{item.count}</span>
                  </div>
                  <p className="text-xs text-[#756762] mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (3 steps with connecting terracotta line) */}
      <section className="py-24 bg-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Simple 3-Step Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1.5">
              How CampusNest Works
            </h2>
            <p className="text-sm sm:text-base text-[#756762] mt-2">
              From finding a room near your university to your first night in your new home.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 inset-x-24 h-[2px] bg-[#D99A8F]/60 -z-0">
              <div className="h-full bg-[#B85C52] w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-[0_12px_32px_rgba(45,36,33,0.06)]">
                <div className="w-16 h-16 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-2xl font-bold flex items-center justify-center mb-5 shadow-sm">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D2421] mb-2">
                  1. Search Near Campus
                </h3>
                <p className="text-sm text-[#756762] leading-relaxed">
                  Enter your university, desired budget, and room preferences. Filter by distance, meals, AC, and safety provisions.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-[0_12px_32px_rgba(45,36,33,0.06)]">
                <div className="w-16 h-16 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-2xl font-bold flex items-center justify-center mb-5 shadow-sm">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D2421] mb-2">
                  2. Compare & Enquire
                </h3>
                <p className="text-sm text-[#756762] leading-relaxed">
                  Compare up to 3 options side-by-side with senior student ratings and walking transit times. Directly connect with the host.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-[0_12px_32px_rgba(45,36,33,0.06)]">
                <div className="w-16 h-16 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-2xl font-bold flex items-center justify-center mb-5 shadow-sm">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D2421] mb-2">
                  3. Move In Peacefully
                </h3>
                <p className="text-sm text-[#756762] leading-relaxed">
                  Visit the room, confirm your availability, and settle in. Zero brokerage fees, transparent terms, and complete safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CAMPUSNEST (4 Icon Cards) */}
      <section className="py-20 bg-[#FFFDF9] border-t border-[#D99A8F]/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              The Student Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1.5">
              Why Students Choose CampusNest
            </h2>
            <p className="text-sm sm:text-base text-[#756762] mt-2">
              Designed with care by students, for students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Safe & Verified</h3>
              <p className="text-sm text-[#756762] leading-relaxed">
                Biometric entry, active wardens, CCTV, and verified premises checks on all listings.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Affordable Options</h3>
              <p className="text-sm text-[#756762] leading-relaxed">
                Options ranging from ₹6,500/month to luxury lofts. Zero brokerage markup saves you thousands.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Near Your Campus</h3>
              <p className="text-sm text-[#756762] leading-relaxed">
                Properties mapped by walking and cycling distance to college gates and local metro stations.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#B85C52]/30 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#B85C52]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-2">Student-Friendly</h3>
              <p className="text-sm text-[#756762] leading-relaxed">
                Dedicated study desks, high-speed Wi-Fi, laundry, and flexible lease terms tailored to college semesters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (Carousel with Keyboard Arrows, Dots & Hover/Focus Pause) */}
      <section className="py-24 bg-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Student Voices
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1">
              What College Students Say
            </h2>
            <p className="text-sm text-[#756762] mt-2">
              Real experiences from students living in CampusNest verified spaces.
            </p>
          </div>

          <div
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
            onFocus={() => setIsTestimonialHovered(true)}
            onBlur={() => setIsTestimonialHovered(false)}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 sm:p-12 shadow-[0_12px_32px_rgba(45,36,33,0.10)] relative min-h-[260px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C99A4A] text-[#C99A4A]" />
                    ))}
                  </div>

                  <p className="font-serif text-lg sm:text-xl text-[#2D2421] italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>

                  <div className="pt-4 border-t border-[#D99A8F]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-serif text-base font-bold text-[#2D2421]">
                        {testimonials[currentTestimonial].name}
                      </p>
                      <p className="text-xs text-[#756762]">
                        {testimonials[currentTestimonial].college}
                      </p>
                    </div>
                    <span className="text-xs text-[#B85C52] font-medium">
                      Staying at: {testimonials[currentTestimonial].room}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots & Keyboard Buttons */}
            <div className="flex items-center justify-between mt-6 px-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="w-10 h-10 rounded-full border border-[#D99A8F] bg-[#FFFDF9] flex items-center justify-center text-[#2D2421] hover:bg-[#F7F1E8]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentTestimonial === idx ? 'w-8 bg-[#B85C52]' : 'w-2.5 bg-[#D99A8F]'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-[#D99A8F] bg-[#FFFDF9] flex items-center justify-center text-[#2D2421] hover:bg-[#F7F1E8]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION (6 Questions) */}
      <section className="py-24 bg-[#FFFDF9] border-t border-[#D99A8F]/30">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2421] mt-1.5">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#756762] mt-2">
              Everything you need to know about student bookings, safety, and policies.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-[16px] border border-[#D99A8F] bg-[#FFFDF9] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#2D2421] hover:text-[#B85C52] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-[#F7F1E8] border border-[#D99A8F] text-[#B85C52] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-5 text-sm text-[#756762] leading-relaxed border-t border-[#D99A8F]/30 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. DEEP BROWN FINAL CTA (The One Dark Section per page) */}
      <section className="py-24 bg-[#2D2421] text-[#F7F1E8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B85C52]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF9]/10 border border-[#D99A8F]/40 text-xs font-semibold text-[#D99A8F] uppercase tracking-wider">
            Start Your University Journey
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F7F1E8] leading-tight max-w-2xl mx-auto">
            Ready to find your new home?
          </h2>

          <p className="text-base sm:text-lg text-[#D99A8F] max-w-xl mx-auto leading-relaxed">
            Join thousands of college students enjoying safe, verified, and affordable living near their campus.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#B85C52] text-[#FFFDF9] font-medium text-base tracking-wide shadow-lg hover:bg-[#D99A8F] hover:text-[#2D2421] active:scale-[0.97] transition-all"
            >
              <span>Find Accommodation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              to="/roommates"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full border border-[#D99A8F] text-[#F7F1E8] font-medium text-base tracking-wide hover:bg-[#FFFDF9]/10 transition-colors"
            >
              Find Roommates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
