import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Calculator,
  Monitor,
  Navigation,
  ExternalLink,
  Languages
} from 'lucide-react';
import { ClassGrade } from '../types';

interface ContactFooterProps {
  onSelectClass: (grade: ClassGrade) => void;
  onOpenAdmin: () => void;
  onOpenInquiry: () => void;
}

const PHONE = '7654144498';
const WHATSAPP_LINK =
  'https://wa.me/917654144498?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20Mathematics%20classes%20for%20Class%2011%20or%2012.';
const MAPS_LINK =
  'https://maps.google.com/?q=Mathematics+Care+Point+K.G.+Road+Arrah+Bihar';

export const ContactFooter: React.FC<ContactFooterProps> = ({
  onSelectClass,
  onOpenAdmin,
  onOpenInquiry
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClassClick = (grade: ClassGrade) => {
    onSelectClass(grade);
    scrollToSection('study-portal');
  };

  return (
    <footer
      id="contact-location"
      className="bg-[#0F172A] text-gray-300 border-t border-white/10 pt-16 pb-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top: Contact & Location Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Contact (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-white/10 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-[#10B981]/15 text-emerald-400 border border-[#10B981]/30">
                  Contact the Institute
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Connect with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                  Mathematics Care Point
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Have a question about Class 11 or Class 12 Mathematics batches,
                CBSE or Bihar Board preparation, or online live classes? Talk
                directly to <strong>S.K. Prasad</strong>, Director & Mathematics
                Faculty.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Phone & WhatsApp */}
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Phone className="w-4 h-4" />
                    <span>Call / WhatsApp</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono">
                    {PHONE}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Direct line to S.K. Prasad
                  </div>
                </div>

                {/* Class formats */}
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                    <Monitor className="w-4 h-4" />
                    <span>Offline & Online Classes</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Class 11 & 12 Mathematics
                  </div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    <span>Hindi & English medium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-2">
              <a
                id="footer-whatsapp-btn"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-base shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3 transition-all hover:scale-101 active:scale-99 group"
              >
                <div className="p-2 rounded-xl bg-white/20">
                  <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-emerald-100 font-medium">
                    Open WhatsApp Chat
                  </div>
                  <div className="text-lg font-black tracking-tight font-['Outfit']">
                    Enquire Now: +91 {PHONE}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Card 2: Address (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-white/10 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  Visit the Institute
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                <span>Institute Location</span>
              </h3>

              <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-2">
                <div className="text-sm font-bold text-white font-['Outfit']">
                  Mathematics Care Point
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                  📍 <strong>K.G. Road</strong>, Arrah, Bhojpur, Bihar
                </div>
                <div className="text-[11px] text-gray-400">
                  Offline Mathematics classes for Class 11 and 12 students in
                  Arrah. Online live classes are also available.
                </div>
              </div>

              {/* Location visual */}
              <div className="relative h-32 rounded-2xl bg-[#0F172A] border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-4">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center animate-bounce">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    K.G. Road, Arrah
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Bhojpur, Bihar
                  </span>
                </div>
              </div>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-bold shadow">
                <Calculator className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-black text-white font-['Outfit'] tracking-tight">
                MATHEMATICS CARE POINT
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Mathematics coaching for Class 11 and 12 (CBSE & Bihar Board) in
              Arrah. Led by S.K. Prasad.
            </p>
            <div className="text-xs text-[#10B981] font-mono">
              WhatsApp: {PHONE}
            </div>
          </div>

          {/* Class links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Class Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleClassClick('11')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Class 11 Mathematics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClassClick('12')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Class 12 Mathematics
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInquiry}
                  className="text-[#10B981] hover:text-emerald-300 font-semibold"
                >
                  + Enquire Now
                </button>
              </li>
            </ul>
          </div>

          {/* Study Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Study Material
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('study-portal')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Syllabus
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('study-portal')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mock Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('study-portal')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Daily Practice Papers (DPP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('study-portal')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Previous Year Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Institute Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Institute
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Faculty Upload Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faculty')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Faculty: S.K. Prasad
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('advantages')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Mathematics Care Point
                </button>
              </li>
              <li>
                <span className="text-gray-500 text-[11px] block mt-1">
                  K.G. Road, Arrah, Bihar
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500 space-y-2">
          <p>
            © {new Date().getFullYear()}{' '}
            <strong>Mathematics Care Point</strong>. All Rights Reserved.
            Director & Faculty: S.K. Prasad.
          </p>
          <p className="text-[11px] text-gray-500">
            Address: K.G. Road, Arrah, Bhojpur, Bihar • Call / WhatsApp: {PHONE}
          </p>
        </div>
      </div>
    </footer>
  );
};