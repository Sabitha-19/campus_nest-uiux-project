import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Scale,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Wifi,
  Utensils,
  Wind,
  Shield,
  Clock,
  Send,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Bus,
  GraduationCap
} from 'lucide-react';
import { ACCOMMODATIONS } from '../data/accommodations';
import { PropertyCard } from '../components/common/PropertyCard';
import { RoomPhotoVisual } from '../components/common/RoomPhotoVisual';
import { CampusWalkMap } from '../components/common/CampusWalkMap';
import { useApp } from '../context/AppContext';
import { EnquirySubmission } from '../types';

export const AccommodationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave, isInCompare, toggleCompare, setLastEnquiry, showToast } = useApp();

  const property = ACCOMMODATIONS.find((p) => p.id === id) || ACCOMMODATIONS[0];
  const saved = isSaved(property.id);
  const compared = isInCompare(property.id);

  // Gallery state
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Enquiry modal / form state
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [moveInDate, setMoveInDate] = useState('Immediate');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Gallery images with fallback
  const galleryImages = property.galleryImages || [
    property.coverImage || '/images/srm-scholars-haven-pg.webp',
    '/images/anna-tech-quarters-pg.webp',
    '/images/stella-serenity-women-pg.webp',
    '/images/vadapalani-metro-suites-pg.webp'
  ];

  const galleryLabels = ['Bedroom View', 'Study Workstation', 'Bathroom / Balcony', 'Common Student Lounge'];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveThumb((p) => (p + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setActiveThumb((p) => (p - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, galleryImages.length]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!studentName.trim()) errors.name = 'Please provide your full name';
    if (!studentEmail.trim() || !studentEmail.includes('@')) errors.email = 'Valid college/personal email required';
    if (!studentPhone.trim() || studentPhone.length < 10) errors.phone = '10-digit mobile number required';
    if (!collegeName.trim()) errors.college = 'Please specify your institution';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const submission: EnquirySubmission = {
      propertyId: property.id,
      propertyTitle: property.title,
      propertyArea: property.area,
      monthlyRent: property.monthlyRent,
      studentName,
      studentEmail,
      studentPhone,
      college: collegeName,
      moveInDate,
      preferredRoomType: property.roomSharing,
      message: enquiryMessage,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    setLastEnquiry(submission);
    showToast('Enquiry sent successfully! 🎉', 'success');
    navigate('/enquiry-confirmation');
  };

  const similarListings = ACCOMMODATIONS.filter(
    (item) => item.id !== property.id && (item.type === property.type || item.genderPreference === property.genderPreference)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-24 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#756762] pb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#B85C52]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D99A8F]" />
          <Link to="/explore" className="hover:text-[#B85C52]">Accommodations</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#D99A8F]" />
          <span className="text-[#2D2421] font-semibold truncate max-w-xs">{property.title}</span>
        </nav>

        {/* Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#D99A8F]/40">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {property.isVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-[#FFFDF9] text-[#C99A4A] border border-[#C99A4A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99A4A]" />
                  Verified Listing
                </span>
              )}
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
                {property.type} • {property.genderPreference}
              </span>
              <span className="text-xs text-[#B85C52] font-semibold">
                {property.availability}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2421] leading-tight">
              {property.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#756762]">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#B85C52]" />
                {property.distanceText}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#C99A4A] text-[#C99A4A]" />
                <strong className="text-[#2D2421]">{property.rating.toFixed(1)}</strong> ({property.reviewsCount} student reviews)
              </span>
            </div>
          </div>

          {/* Desktop Top Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleSave(property.id)}
              className="flex items-center gap-2 h-11 px-5 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-semibold text-[#2D2421] hover:border-[#B85C52] transition-colors"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-[#B85C52] text-[#B85C52]' : 'text-[#756762]'}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleCompare(property.id)}
              className="flex items-center gap-2 h-11 px-5 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-semibold text-[#2D2421] hover:border-[#B85C52] transition-colors"
            >
              <Scale className="w-4 h-4 text-[#B85C52]" />
              <span>{compared ? 'Compared ✓' : 'Compare'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Section: Main image + Thumbnails with crossfade & click-to-enlarge */}
        <section className="pt-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Stage Image */}
            <div className="lg:col-span-9 relative group overflow-hidden rounded-[24px] border border-[#D99A8F] bg-[#FFFDF9] shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThumb}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  <RoomPhotoVisual
                    theme={property.visualTheme}
                    imageUrl={galleryImages[activeThumb]}
                    title={property.title}
                    type={property.type}
                    roomLabel={`${property.roomLabel} (${galleryLabels[activeThumb % galleryLabels.length]})`}
                    aspect="aspect-[16/10]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Click to Enlarge button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFFDF9]/95 border border-[#D99A8F] text-xs font-semibold text-[#2D2421] shadow-md backdrop-blur-xs hover:bg-[#FFFDF9] transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#B85C52]" />
                <span>Enlarge Photo</span>
              </button>
            </div>

            {/* Thumbnails Column */}
            <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {galleryImages.map((imgSrc, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveThumb(index)}
                  className={`relative flex-1 min-w-[100px] rounded-[16px] overflow-hidden border-2 transition-all ${
                    activeThumb === index ? 'border-[#B85C52] shadow-sm' : 'border-[#D99A8F]/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  <RoomPhotoVisual
                    theme={property.visualTheme}
                    imageUrl={imgSrc}
                    aspect="aspect-[16/10]"
                  />
                  <div className="p-1.5 bg-[#FFFDF9] text-[10px] font-medium text-center text-[#2D2421] truncate">
                    {galleryLabels[index % galleryLabels.length]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Layout: Details (left) & Sticky Enquiry Card (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Room Overview */}
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-[#2D2421]">About This Accommodation</h2>
              <p className="text-base text-[#756762] leading-relaxed">
                {property.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#D99A8F]/30 text-xs">
                <div>
                  <span className="text-[#756762] block">Room Sharing</span>
                  <strong className="text-sm font-serif text-[#2D2421]">{property.roomSharing}</strong>
                </div>
                <div>
                  <span className="text-[#756762] block">Security Deposit</span>
                  <strong className="text-sm font-serif text-[#2D2421]">₹{property.deposit.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-[#756762] block">Notice Period</span>
                  <strong className="text-sm font-serif text-[#2D2421]">30 Days</strong>
                </div>
              </div>
            </div>

            {/* Facilities Included */}
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Facilities & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F1E8] border border-[#D99A8F]/40 text-xs font-semibold text-[#2D2421]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B85C52] shrink-0" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Security Measures */}
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Safety & Security Checklist</h2>
              <div className="space-y-3">
                {property.safetyFeatures.map((safety, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#756762]">
                    <ShieldCheck className="w-5 h-5 text-[#B85C52] shrink-0 mt-0.5" />
                    <span>{safety}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Colleges & Transport */}
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Campus Proximity & Transport</h2>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B85C52] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Nearby Colleges</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.colleges.map((col, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F7F1E8] border border-[#D99A8F] text-[#2D2421]"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#D99A8F]/30">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B85C52] flex items-center gap-1.5">
                  <Bus className="w-4 h-4" />
                  <span>Interactive Walking & Transit Routes</span>
                </h3>
                <div className="space-y-2 text-xs text-[#756762] pb-2">
                  {property.transportNearby.map((trans, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B85C52]" />
                      <span>{trans}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive SVG Walking Map */}
                <div className="pt-2">
                  <CampusWalkMap
                    propertyTitle={property.title}
                    originCoord={property.originCoord}
                    landmarks={property.landmarks}
                  />
                </div>
              </div>
            </div>

            {/* 3 Student Reviews */}
            <div className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Verified Student Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#C99A4A] text-[#C99A4A]" />
                  <span className="font-bold text-sm text-[#2D2421]">{property.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-5">
                {property.studentReviews.map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F7F1E8]/70 border border-[#D99A8F]/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-serif text-sm font-bold text-[#2D2421]">{rev.author}</p>
                        <p className="text-[11px] text-[#756762]">{rev.college}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(Math.floor(rev.rating))].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#C99A4A] text-[#C99A4A]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#756762] italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <span className="text-[10px] text-[#756762]/70 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Enquiry Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-6 shadow-[0_16px_36px_rgba(45,36,33,0.12)] space-y-5">
              <div className="border-b border-[#D99A8F]/40 pb-4">
                <span className="text-xs text-[#756762]">Monthly Student Rent</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-serif text-3xl font-bold text-[#2D2421]">
                    ₹{property.monthlyRent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#756762]">/month</span>
                </div>
                <p className="text-xs text-[#B85C52] mt-1 font-medium">Zero Brokerage • Inclusive of Wi-Fi & Maintenance</p>
              </div>

              {/* Direct Enquiry Form */}
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Sabitha Saravanan"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                  />
                  {formErrors.name && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Your Email</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => {
                      setStudentEmail(e.target.value);
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="student@university.edu"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                  />
                  {formErrors.email && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => {
                      setStudentPhone(e.target.value);
                      if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                  />
                  {formErrors.phone && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">College / University</label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => {
                      setCollegeName(e.target.value);
                      if (formErrors.college) setFormErrors((prev) => ({ ...prev, college: '' }));
                    }}
                    placeholder="e.g. SRM / Loyola / Anna University"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                  />
                  {formErrors.college && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.college}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Move-In Timeline</label>
                  <select
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                  >
                    <option value="Immediate">Immediate Move-In</option>
                    <option value="Within 2 Weeks">Within 2 Weeks</option>
                    <option value="Next Month">Next Month</option>
                    <option value="Next Semester">Next Semester</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] text-sm font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Enquire Now (Free)</span>
                </button>
              </form>

              <div className="pt-2 text-center text-[11px] text-[#756762]">
                🔒 Direct warden connect • No spam guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings Section */}
        <section className="pt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2421]">Similar Accommodations</h2>
            <Link to="/explore" className="text-xs font-semibold text-[#B85C52] hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarListings.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      </div>

      {/* ONE Dark Deep Brown Section for Rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            CampusNest Guarantee
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            100% Student-First Protection
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            If any property details differ from our verified description upon your physical visit, we will assist you in rebooking an alternative room near your campus at no added cost.
          </p>
        </div>
      </section>

      {/* Fixed Bottom Action Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFDF9] border-t border-[#D99A8F] p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#756762]">Rent</span>
          <p className="font-serif text-lg font-bold text-[#2D2421]">
            ₹{property.monthlyRent.toLocaleString('en-IN')}<span className="text-xs font-sans text-[#756762]">/mo</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSave(property.id)}
            className="p-2.5 rounded-full border border-[#D99A8F] text-[#2D2421]"
            aria-label="Save"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-[#B85C52] text-[#B85C52]' : 'text-[#756762]'}`} />
          </button>
          <button
            type="button"
            onClick={() => setEnquiryModalOpen(true)}
            className="h-11 px-6 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold shadow-sm active:scale-95"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Mobile Enquiry Modal */}
      <AnimatePresence>
        {enquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute inset-0 bg-[#2D2421]/60"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative bg-[#FFFDF9] border-t border-[#D99A8F] rounded-t-[28px] max-h-[90vh] overflow-y-auto p-6 space-y-4 z-10"
            >
              <div className="flex items-center justify-between border-b border-[#D99A8F]/40 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#2D2421]">Enquire about {property.title}</h3>
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(false)}
                  className="p-1 rounded-full border border-[#D99A8F]"
                >
                  <X className="w-5 h-5 text-[#2D2421]" />
                </button>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                  />
                  {formErrors.name && <p className="text-[10px] text-[#B85C52] mt-0.5">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Email</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                  />
                  {formErrors.email && <p className="text-[10px] text-[#B85C52] mt-0.5">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="Mobile number"
                    className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                  />
                  {formErrors.phone && <p className="text-[10px] text-[#B85C52] mt-0.5">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">College Name</label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="College"
                    className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                  />
                  {formErrors.college && <p className="text-[10px] text-[#B85C52] mt-0.5">{formErrors.college}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold mt-2"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Dialog with keyboard navigation */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2421]/90 backdrop-blur-md">
            <div className="relative max-w-4xl w-full bg-[#FFFDF9] border border-[#D99A8F] rounded-[24px] p-4 sm:p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-[#2D2421] hover:bg-[#F7F1E8]"
                aria-label="Close photo viewer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="rounded-[16px] overflow-hidden">
                <RoomPhotoVisual
                  theme={property.visualTheme}
                  imageUrl={galleryImages[activeThumb]}
                  title={property.title}
                  type={property.type}
                  roomLabel={`${property.roomLabel} (${galleryLabels[activeThumb % galleryLabels.length]})`}
                  aspect="aspect-[16/10]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#756762]">
                <div>
                  <span className="font-serif text-sm font-bold text-[#2D2421] block">{property.title}</span>
                  <span className="text-[11px] text-[#B85C52]">{galleryLabels[activeThumb % galleryLabels.length]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveThumb((p) => (p - 1 + galleryImages.length) % galleryImages.length)}
                    className="p-2 rounded-full border border-[#D99A8F] hover:bg-[#F7F1E8]"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#2D2421]" />
                  </button>
                  <span className="font-medium text-xs text-[#2D2421]">
                    {activeThumb + 1} / {galleryImages.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveThumb((p) => (p + 1) % galleryImages.length)}
                    className="p-2 rounded-full border border-[#D99A8F] hover:bg-[#F7F1E8]"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4 text-[#2D2421]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
