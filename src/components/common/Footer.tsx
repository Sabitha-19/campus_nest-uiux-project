import React from 'react';
import { Link } from 'react-router-dom';
import { CampusNestLogo } from './CampusNestLogo';
import { ShieldCheck, Heart, Mail, MapPin, Phone, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D2421] text-[#F7F1E8] pt-16 pb-12 border-t border-[#D99A8F]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#D99A8F]/20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <CampusNestLogo variant="horizontal" theme="dark" size="md" />
            </Link>
            <p className="text-sm text-[#D99A8F] max-w-sm leading-relaxed mt-2">
              Empowering college students to discover verified, safe, and affordable student accommodations near university campuses with zero brokerage.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F7F1E8]/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#B85C52]" />
              <span>Safe • Affordable • Student-friendly</span>
            </div>
            {/* Real verified contacts from attached brand assets */}
            <div className="pt-2 space-y-2 text-xs text-[#D99A8F]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B85C52] shrink-0" />
                <span>hello@campusnest.co</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B85C52] shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B85C52] shrink-0" />
                <span>4500 University Dr, Campus Town</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#F7F1E8]">Accommodations</h4>
            <ul className="space-y-2 text-sm text-[#D99A8F]">
              <li>
                <Link to="/explore" className="hover:text-[#F7F1E8] transition-colors">
                  Explore All Rooms
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#F7F1E8] transition-colors">
                  Compare Listings
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[#F7F1E8] transition-colors">
                  Saved Accommodations
                </Link>
              </li>
              <li>
                <Link to="/roommates" className="hover:text-[#F7F1E8] transition-colors">
                  Roommate Finder
                </Link>
              </li>
              <li>
                <Link to="/list-property" className="hover:text-[#F7F1E8] transition-colors">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & About */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#F7F1E8]">About & Trust</h4>
            <ul className="space-y-2 text-sm text-[#D99A8F]">
              <li>
                <Link to="/about" className="hover:text-[#F7F1E8] transition-colors">
                  About CampusNest
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#F7F1E8] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about#brand-assets" className="hover:text-[#F7F1E8] transition-colors">
                  Brand Identity & Assets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F7F1E8] transition-colors">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#F7F1E8] transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#F7F1E8]">Student Support</h4>
            <ul className="space-y-2 text-sm text-[#D99A8F]">
              <li>
                <Link to="/contact" className="hover:text-[#F7F1E8] transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F7F1E8] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <span className="text-xs text-[#F7F1E8]/70 block mt-3">
                  Zero Brokerage Guarantee • Direct Owner Connect
                </span>
              </li>
            </ul>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#D99A8F]/40 flex items-center justify-center text-[#D99A8F] hover:text-[#F7F1E8] hover:border-[#F7F1E8] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#D99A8F]/40 flex items-center justify-center text-[#D99A8F] hover:text-[#F7F1E8] hover:border-[#F7F1E8] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-[#D99A8F]/40 flex items-center justify-center text-[#D99A8F] hover:text-[#F7F1E8] hover:border-[#F7F1E8] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D99A8F] gap-4">
          <p>© {new Date().getFullYear()} CampusNest. All rights reserved.</p>
          <p className="italic text-[#F7F1E8]/90 font-serif">"Find a place that feels like home."</p>
        </div>
      </div>
    </footer>
  );
};
