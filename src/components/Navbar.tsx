import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  UserCheck,
  Phone,
  MessageCircle,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Layers,
  Lock,
  Info
} from 'lucide-react';
import { ClassGrade } from '../types';

interface NavbarProps {
  activeClass: ClassGrade;
  onSelectClass: (grade: ClassGrade) => void;
  onOpenAdmin: () => void;
  onOpenInquiry: () => void;
  materialsCount: number;
}

const CLASS_OPTIONS: ClassGrade[] = ['11', '12'];

const WHATSAPP_LINK =
  'https://wa.me/917654144498?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20Mathematics%20classes%20for%20Class%2011%20or%2012.';

export const Navbar: React.FC<NavbarProps> = ({
  activeClass,
  onSelectClass,
  onOpenAdmin,
  onOpenInquiry,
  materialsCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setClassDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClassSelect = (grade: ClassGrade) => {
    onSelectClass(grade);
    setClassDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById('study-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-[#0F172A]/70 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2.5 shadow-lg">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <span>∑</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl font-black tracking-tight text-white font-['Outfit'] group-hover:text-indigo-300 transition-colors">
                  Mathematics Care Point
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden md:inline-block">
                  Arrah
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium hidden lg:block leading-none mt-0.5">
                Class 11 & 12 • Director: S.K. Prasad
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('hero')}
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Home
            </button>

            {/* Class Portal Selector dropdown */}
            <div className="relative">
              <button
                id="nav-classes-btn"
                onClick={() => setClassDropdownOpen(!classDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  classDropdownOpen
                    ? 'bg-[#4F46E5] text-white shadow-md'
                    : 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Class Portal</span>
                <span className="text-xs px-1.5 rounded bg-indigo-500/30 text-indigo-200">
                  Class {activeClass}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${classDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {classDropdownOpen && (
                <div
                  id="nav-classes-dropdown"
                  className="absolute left-0 mt-2 w-56 rounded-2xl bg-[#1E293B] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Select Class
                  </div>
                  {CLASS_OPTIONS.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => handleClassSelect(grade)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeClass === grade
                          ? 'bg-[#4F46E5] text-white'
                          : 'text-gray-200 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 opacity-80" />
                        <span>Class {grade} Mathematics</span>
                      </div>
                      {activeClass === grade && (
                        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-white/10 my-1 pt-1">
                    <button
                      onClick={() => handleNavClick('study-portal')}
                      className="w-full text-left px-3 py-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      View Study Material
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-portal-btn"
              onClick={() => handleNavClick('study-portal')}
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Study Material
            </button>

            <button
              id="nav-faculty-btn"
              onClick={() => handleNavClick('faculty')}
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Faculty
            </button>

            <button
              id="nav-why-btn"
              onClick={() => handleNavClick('advantages')}
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              About
            </button>

            <button
              id="nav-location-btn"
              onClick={() => handleNavClick('contact-location')}
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Location
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Faculty Upload Portal */}
            <button
              id="nav-admin-upload-btn"
              onClick={onOpenAdmin}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-sm group"
              title="Faculty Portal - Upload Syllabus, Mock Papers, DPP & PYQ (Passcode Protected)"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Faculty Portal</span>
              <span className="inline-flex items-center justify-center px-1.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {materialsCount}
              </span>
            </button>

            {/* WhatsApp CTA */}
            <a
              id="nav-whatsapp-cta-btn"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10B981] hover:bg-[#059669] text-white px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Enquire button */}
            <button
              id="nav-book-demo-btn"
              onClick={onOpenInquiry}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#4F46E5] hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/30 transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden mt-3 p-4 rounded-2xl bg-[#1E293B] border border-white/10 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
              {CLASS_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleClassSelect(grade)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                    activeClass === grade
                      ? 'bg-[#4F46E5] text-white border-indigo-400 shadow-md'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Class {grade}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('study-portal')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Study Material (Syllabus/Mock/DPP/PYQ)</span>
                </div>
              </button>

              <button
                onClick={() => handleNavClick('faculty')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Faculty: S.K. Prasad</span>
              </button>

              <button
                onClick={() => handleNavClick('advantages')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5 flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-amber-400" />
                <span>About Mathematics Care Point</span>
              </button>

              <button
                onClick={() => handleNavClick('contact-location')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Location: K.G. Road, Arrah</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Faculty Upload Portal (Protected)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Enquire About Admission</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};