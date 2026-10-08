import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Users, Search, Filter, ShieldCheck, Heart, Sparkles, Check, MessageSquare } from 'lucide-react';
import { ROOMMATES_DATA } from '../data/roommates';
import { useApp } from '../context/AppContext';

export const Roommates: React.FC = () => {
  const { showToast } = useApp();

  // Filters state
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [budgetMax, setBudgetMax] = useState(15000);
  const [roomType, setRoomType] = useState('All');
  const [lifestyleFilter, setLifestyleFilter] = useState('All');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const filteredRoommates = useMemo(() => {
    return ROOMMATES_DATA.filter((profile) => {
      if (selectedCollege !== 'All' && !profile.college.includes(selectedCollege)) {
        return false;
      }
      if (selectedLocation !== 'All' && !profile.location.includes(selectedLocation)) {
        return false;
      }
      if (profile.budget > budgetMax) {
        return false;
      }
      if (roomType !== 'All' && profile.roomType !== roomType) {
        return false;
      }
      if (lifestyleFilter !== 'All') {
        const matchesTag = profile.lifestyleTags.some((t) =>
          t.toLowerCase().includes(lifestyleFilter.toLowerCase())
        );
        if (!matchesTag) return false;
      }
      return true;
    });
  }, [selectedCollege, selectedLocation, budgetMax, roomType, lifestyleFilter]);

  const handleConnect = (profileId: string, name: string) => {
    if (connectedIds.includes(profileId)) {
      showToast(`Connection request already sent to ${name}`, 'info');
      return;
    }
    setConnectedIds((prev) => [...prev, profileId]);
    showToast(`Connection request sent to ${name}! ✨`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
            Campus Roommate Matching
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D2421] mt-1.5">
            Find Your Ideal Roommate
          </h1>
          <p className="text-base text-[#756762] mt-2">
            Connect with verified college peers sharing your schedule, budget, and campus lifestyle.
          </p>
        </div>

        {/* Filter Card */}
        <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-6 shadow-[0_12px_32px_rgba(45,36,33,0.08)] mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* College */}
            <div>
              <label className="block text-xs font-semibold text-[#756762] mb-1">College</label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs font-medium text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
              >
                <option value="All">All Campuses</option>
                <option value="SRM">SRM IST</option>
                <option value="Loyola">Loyola College</option>
                <option value="Anna University">Anna University</option>
                <option value="IIT Madras">IIT Madras</option>
                <option value="Ethiraj">Ethiraj College</option>
                <option value="SSN">SSN College</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-[#756762] mb-1">Area / Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs font-medium text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
              >
                <option value="All">All Chennai Areas</option>
                <option value="Potheri">Potheri / Kattankulathur</option>
                <option value="Nungambakkam">Nungambakkam</option>
                <option value="Guindy">Guindy</option>
                <option value="Adyar">Adyar</option>
                <option value="Egmore">Egmore</option>
                <option value="OMR">OMR / Kalavakkam</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#756762] mb-1">
                <span>Max Budget</span>
                <span className="text-[#B85C52]">₹{budgetMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="6000"
                max="16000"
                step="500"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full h-11 accent-[#B85C52]"
              />
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-xs font-semibold text-[#756762] mb-1">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs font-medium text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
              >
                <option value="All">Any Room Type</option>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Shared Room">Shared Room</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            {/* Lifestyle */}
            <div>
              <label className="block text-xs font-semibold text-[#756762] mb-1">Lifestyle Preference</label>
              <select
                value={lifestyleFilter}
                onChange={(e) => setLifestyleFilter(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs font-medium text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
              >
                <option value="All">Any Routine</option>
                <option value="Early Bird">Early Bird</option>
                <option value="Night Owl">Night Owl</option>
                <option value="Quiet">Quiet Study</option>
                <option value="Social">Social</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.map((profile) => {
            const isConnected = connectedIds.includes(profile.id);
            return (
              <div
                key={profile.id}
                className="rounded-[20px] bg-[#FFFDF9] border border-[#D99A8F] p-6 shadow-[0_12px_32px_rgba(45,36,33,0.08)] flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all"
              >
                <div>
                  {/* Top: Avatar, Name & Compatibility % */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 rounded-full bg-[#B85C52] text-[#FFFDF9] font-serif text-lg font-bold flex items-center justify-center shrink-0 shadow-sm">
                        {profile.initials}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#2D2421]">{profile.name}</h3>
                        <p className="text-xs text-[#756762]">{profile.gender} • {profile.college}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D99A8F]/30 text-[#2D2421] border border-[#D99A8F]">
                        {profile.compatibility}% Match
                      </span>
                    </div>
                  </div>

                  {/* Location & Budget */}
                  <div className="mt-4 pt-3 border-t border-[#D99A8F]/30 flex items-center justify-between text-xs">
                    <span className="text-[#756762]">📍 {profile.location}</span>
                    <span className="font-serif font-bold text-[#2D2421]">₹{profile.budget.toLocaleString('en-IN')}/mo</span>
                  </div>

                  {/* Bio */}
                  <p className="mt-3 text-xs text-[#756762] leading-relaxed italic">
                    "{profile.bio}"
                  </p>

                  {/* Lifestyle Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {profile.lifestyleTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#F7F1E8] border border-[#D99A8F]/50 text-[#2D2421] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom connect button & move-in timeline */}
                <div className="pt-3 border-t border-[#D99A8F]/30 flex items-center justify-between">
                  <span className="text-[11px] text-[#756762]">
                    Move in: <strong>{profile.moveInDate}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleConnect(profile.id, profile.name)}
                    className={`h-10 px-5 rounded-full text-xs font-semibold transition-all ${
                      isConnected
                        ? 'bg-[#2D2421] text-[#F7F1E8]'
                        : 'bg-[#B85C52] text-[#FFFDF9] hover:bg-[#D99A8F] hover:text-[#2D2421]'
                    }`}
                  >
                    {isConnected ? 'Requested ✓' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="mt-12 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D99A8F] max-w-xl mx-auto text-center text-xs text-[#756762] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#B85C52] shrink-0" />
          <span>
            <strong>Privacy Note:</strong> Contact details are shared only after both students agree.
          </span>
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Peer Community
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Looking for a room to share together?
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            Once you find a roommate match on CampusNest, you can co-enquire on 2BHK flats or twin-sharing rooms to split costs effortlessly.
          </p>
        </div>
      </section>
    </div>
  );
};
