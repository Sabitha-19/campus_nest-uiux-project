import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building, ShieldCheck, Users, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ListProperty: React.FC = () => {
  const { showToast } = useApp();

  // Form fields
  const [propertyName, setPropertyName] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [accommodationType, setAccommodationType] = useState('PG');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [availableRooms, setAvailableRooms] = useState('1');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(['Wi-Fi', 'Security']);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const facilitiesList = ['Wi-Fi', 'Meals', 'AC', 'Laundry', 'Security', 'Study Desk', 'Power Backup', 'Housekeeping'];

  const toggleFacility = (f: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]
    );
  };

  const handleFakeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoPreview(URL.createObjectURL(file));
      showToast('Photo uploaded for verification review', 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!propertyName.trim()) errors.propertyName = 'Property title is required';
    if (!propertyLocation.trim()) errors.propertyLocation = 'Exact address/area near campus is required';
    if (!monthlyRent || Number(monthlyRent) < 3000) errors.monthlyRent = 'Please specify valid monthly rent';
    if (!ownerName.trim()) errors.ownerName = 'Contact person name is required';
    if (!ownerPhone.trim() || ownerPhone.length < 10) errors.ownerPhone = '10-digit mobile number required';
    if (!ownerEmail.trim() || !ownerEmail.includes('@')) errors.ownerEmail = 'Valid email is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitted(true);
    showToast('Listing submitted! Our inspection team will contact you within 24 hours.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
            Partner With CampusNest
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D2421] mt-1.5">
            List Your Student Accommodation
          </h1>
          <p className="text-base text-[#756762] mt-2">
            Reach verified university students seeking safe, comfortable living near campus with zero brokerage fees.
          </p>
        </div>

        {/* Benefits 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#B85C52]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-1">Direct Student Tenants</h3>
            <p className="text-xs text-[#756762] leading-relaxed">
              Fill your vacant beds faster with verified engineering, medical, and university scholars.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-[#B85C52]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-1">Zero Brokerage Fees</h3>
            <p className="text-xs text-[#756762] leading-relaxed">
              No real estate broker commissions or hidden monthly deductions. 100% direct owner relationship.
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#B85C52]/10 border border-[#D99A8F] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#B85C52]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D2421] mb-1">Verified Badge Trust</h3>
            <p className="text-xs text-[#756762] leading-relaxed">
              Earn our prestigious Gold Verified seal that gives parents and students immediate confidence.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-10 shadow-[0_12px_32px_rgba(45,36,33,0.08)]">
          {isSubmitted ? (
            /* Persistent Success Message */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#B85C52]/10 border border-[#B85C52] text-[#B85C52] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2421]">
                Listing Submitted Successfully!
              </h2>
              <p className="text-sm text-[#756762] max-w-md mx-auto leading-relaxed">
                Thank you for submitting <strong>{propertyName}</strong>. Our student housing inspection team will review your amenities and contact <strong>{ownerPhone}</strong> within 24 hours to schedule the physical verification check.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#F7F1E8] border border-[#D99A8F] text-xs font-semibold text-[#2D2421] hover:bg-[#D99A8F]/30"
                >
                  Submit Another Property
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#D99A8F]/40 pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Property Information</h2>
                <p className="text-xs text-[#756762]">Fill out key details about your hostel, PG, or flat.</p>
              </div>

              {/* Property Name */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">
                  Property Name / Brand Name *
                </label>
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => {
                    setPropertyName(e.target.value);
                    if (formErrors.propertyName) setFormErrors((p) => ({ ...p, propertyName: '' }));
                  }}
                  placeholder="e.g. Royal Residency PG for Boys"
                  className="w-full h-12 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                />
                {formErrors.propertyName && (
                  <p className="text-[11px] text-[#B85C52] mt-1">{formErrors.propertyName}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">
                  Location & Nearby Campus *
                </label>
                <input
                  type="text"
                  value={propertyLocation}
                  onChange={(e) => {
                    setPropertyLocation(e.target.value);
                    if (formErrors.propertyLocation) setFormErrors((p) => ({ ...p, propertyLocation: '' }));
                  }}
                  placeholder="e.g. Potheri, 400m from SRM Kattankulathur Main Gate"
                  className="w-full h-12 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                />
                {formErrors.propertyLocation && (
                  <p className="text-[11px] text-[#B85C52] mt-1">{formErrors.propertyLocation}</p>
                )}
              </div>

              {/* Type, Rent & Rooms */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Accommodation Type</label>
                  <select
                    value={accommodationType}
                    onChange={(e) => setAccommodationType(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                  >
                    <option value="PG">Paying Guest (PG)</option>
                    <option value="Hostel">Student Hostel</option>
                    <option value="Shared Room">Shared Room</option>
                    <option value="Flat">Apartment / Flat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Monthly Rent (₹) *</label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => {
                      setMonthlyRent(e.target.value);
                      if (formErrors.monthlyRent) setFormErrors((p) => ({ ...p, monthlyRent: '' }));
                    }}
                    placeholder="e.g. 8500"
                    className="w-full h-12 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                  />
                  {formErrors.monthlyRent && (
                    <p className="text-[11px] text-[#B85C52] mt-1">{formErrors.monthlyRent}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Available Rooms / Beds</label>
                  <input
                    type="number"
                    min="1"
                    value={availableRooms}
                    onChange={(e) => setAvailableRooms(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                  />
                </div>
              </div>

              {/* Facilities Chips */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-2">Available Facilities</label>
                <div className="flex flex-wrap gap-2">
                  {facilitiesList.map((f) => {
                    const isSelected = selectedFacilities.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFacility(f)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#B85C52] text-[#FFFDF9] border border-[#B85C52]'
                            : 'bg-[#F7F1E8] text-[#2D2421] border border-[#D99A8F]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Preview */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">Photo Upload Preview</label>
                <div className="border-2 border-dashed border-[#D99A8F] rounded-2xl p-6 text-center bg-[#F7F1E8]/50 flex flex-col items-center justify-center">
                  {photoPreview ? (
                    <div className="relative w-full max-w-sm aspect-[16/10] rounded-xl overflow-hidden border border-[#D99A8F]">
                      <img src={photoPreview} alt="Property Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="absolute top-2 right-2 bg-[#2D2421] text-[#FFFDF9] px-2 py-1 rounded text-xs"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-[#B85C52] mb-2" />
                      <p className="text-xs font-semibold text-[#2D2421]">Upload room or exterior photo</p>
                      <p className="text-[11px] text-[#756762] mt-0.5">PNG or JPG up to 10MB</p>
                      <label className="mt-3 cursor-pointer px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs font-semibold text-[#2D2421] hover:border-[#B85C52]">
                        <span>Browse File</span>
                        <input type="file" accept="image/*" onChange={handleFakeUpload} className="hidden" />
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="border-t border-[#D99A8F]/40 pt-4 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#2D2421]">Owner / Warden Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2421] mb-1">Contact Name *</label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => {
                        setOwnerName(e.target.value);
                        if (formErrors.ownerName) setFormErrors((p) => ({ ...p, ownerName: '' }));
                      }}
                      placeholder="e.g. Ramesh K"
                      className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                    />
                    {formErrors.ownerName && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.ownerName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D2421] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={ownerPhone}
                      onChange={(e) => {
                        setOwnerPhone(e.target.value);
                        if (formErrors.ownerPhone) setFormErrors((p) => ({ ...p, ownerPhone: '' }));
                      }}
                      placeholder="10-digit mobile"
                      className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                    />
                    {formErrors.ownerPhone && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.ownerPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D2421] mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={ownerEmail}
                      onChange={(e) => {
                        setOwnerEmail(e.target.value);
                        if (formErrors.ownerEmail) setFormErrors((p) => ({ ...p, ownerEmail: '' }));
                      }}
                      placeholder="owner@gmail.com"
                      className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs text-[#2D2421]"
                    />
                    {formErrors.ownerEmail && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.ownerEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] text-sm font-semibold tracking-wide hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-md active:scale-98"
                >
                  Submit Listing for Verification
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Owner Partnership
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Questions about our student verification process?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Reach out to our accommodation partner desk at hello@campusnest.co or call (555) 123-4567 for onboarding support.
          </p>
        </div>
      </section>
    </div>
  );
};
