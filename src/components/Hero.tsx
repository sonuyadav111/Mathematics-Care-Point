import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  PhoneCall,
  MapPin,
  MessageSquare,
  Calendar,
  Check
} from 'lucide-react';
import { ClassGrade } from '../types';

interface HeroProps {
  onSelectClass: (grade: ClassGrade) => void;
  onOpenInquiry: () => void;
  onOpenAdmin: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectClass,
  onOpenInquiry,
  onOpenAdmin
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
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-[#0F172A] text-white overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#4F46E5]/15 blur-[140px] rounded-full pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#10B981]/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Primary Hero */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#4F46E5]/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F46E5]/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Class 11 & 12 Mathematics Coaching</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>K.G. Road, Arrah</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight font-['Outfit']">
                Build Strong Maths Concepts for Classes 11 & 12 with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                  Mathematics Care Point
                </span>
              </h1>

              <p className="text-gray-300 max-w-2xl text-sm sm:text-base leading-relaxed">
                Mathematics coaching for <strong className="text-white">CBSE</strong> and{' '}
                <strong className="text-white">Bihar Board</strong> students, with Hindi
                and English medium support. Join offline or online live classes and
                strengthen your understanding of Mathematics.
              </p>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <button
                id="hero-explore-syllabus-btn"
                onClick={() => scrollToSection('study-portal')}
                className="bg-white hover:bg-gray-100 text-[#0F172A] px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Access Study Portal</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>

              <button
                id="hero-access-material-btn"
                onClick={() => scrollToSection('study-portal')}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Study Material</span>
              </button>

              <a
                id="hero-whatsapp-direct-btn"
                href="https://wa.me/917654144498?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20Mathematics%20classes%20for%20Class%2011%20or%2012."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#10B981] hover:bg-[#059669] text-white px-5 sm:px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp (7654144498)</span>
              </a>

              <button
                id="hero-book-demo-btn"
                onClick={onOpenInquiry}
                className="px-4 sm:px-5 py-3.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </button>
            </div>
          </div>

          {/* Faculty Spotlight */}
          <div className="lg:col-span-4 bg-[#1E293B] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center justify-between relative shadow-2xl">
            <div className="flex flex-col items-center w-full">
              <div className="relative mb-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#4F46E5] p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-2xl sm:text-3xl font-serif italic font-bold text-white">
                    SKP
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#10B981] p-1.5 rounded-full border-4 border-[#1E293B] text-white shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white font-['Outfit']">S.K. Prasad</h3>
              <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Director & Mathematics Faculty
              </p>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic px-2 mb-4">
                “Understand the concepts, practise with confidence, and build a strong
                foundation in Mathematics.”
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-black text-emerald-400 font-['Outfit']">11 & 12</div>
                <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Classes</div>
              </div>
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-black text-indigo-400 font-['Outfit']">CBSE & Bihar</div>
                <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Boards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Class 11 and 12 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            id="class-11-quick-card"
            onClick={() => handleClassClick('11')}
            className="group bg-[#1E293B] border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Senior Secondary
                </span>
                <span className="text-2xl font-black text-white font-['Outfit']">Class 11</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors font-['Outfit']">
                Mathematics – Class 11
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Develop a clear understanding of Class 11 Mathematics concepts and
                strengthen your problem-solving skills.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-400">
              <span>Explore Class 11</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          <div
            id="class-12-quick-card"
            onClick={() => handleClassClick('12')}
            className="group bg-[#1E293B] border border-white/10 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Board Preparation
                </span>
                <span className="text-2xl font-black text-white font-['Outfit']">Class 12</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-['Outfit']">
                Mathematics – Class 12
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Prepare for your board examination through concept learning and
                Mathematics practice.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Explore Class 12</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Admin, study resources and location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#10B981]/5 border border-[#10B981]/20 rounded-3xl p-5 sm:p-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-[#10B981] w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/30">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest block">
                  Study Support
                </span>
                <p className="text-sm sm:text-base font-bold text-white">Class 11 & 12 Maths Resources</p>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('study-portal')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 shrink-0 ml-3"
            >
              View
            </button>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-5 sm:p-6 flex items-center justify-between border border-white/20 shadow-xl shadow-indigo-900/40">
            <div className="space-y-1">
              <div className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">
                Faculty Portal
              </div>
              <h4 className="text-base font-bold text-white leading-tight">Institute Upload Panel</h4>
              <p className="text-indigo-200 text-xs">Manage Mathematics study materials</p>
            </div>
            <button
              onClick={onOpenAdmin}
              className="bg-white text-indigo-700 hover:bg-gray-100 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shrink-0 ml-3 transition-all hover:scale-105"
            >
              Upload
            </button>
          </div>

          <div className="lg:col-span-3 bg-[#111827] border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-center">
            <h4 className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1 font-bold">
              Institute Address
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-gray-200 leading-snug">
              K.G. Road, Arrah, Bhojpur, Bihar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
