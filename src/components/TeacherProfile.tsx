import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Target,
  Clock,
  Compass,
  UserCheck
} from 'lucide-react';

interface TeacherProfileProps {
  onOpenInquiry: () => void;
}

// Only confirmed details are used here. Add qualifications, experience or
// results below ONLY after you have verified them with S.K. Prasad.
const FACULTY = {
  name: 'S.K. Prasad',
  title: 'Director & Mathematics Faculty',
  initials: 'SKP',
  philosophy:
    'Understand the concepts, practise with confidence, and build a strong foundation in Mathematics.',
  whatsapp: '7654144498',
  whatsappLink:
    'https://wa.me/917654144498?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20Mathematics%20classes%20for%20Class%2011%20or%2012.',
  highlights: [
    'Mathematics coaching for Class 11 and Class 12',
    'CBSE and Bihar Board curriculum',
    'Hindi and English medium support',
    'Offline classes in Arrah and online live classes',
    'Study material, test series and doubt-clearing sessions'
  ]
};

export const TeacherProfileSection: React.FC<TeacherProfileProps> = ({
  onOpenInquiry
}) => {
  return (
    <section
      id="faculty"
      className="py-16 md:py-24 bg-[#0F172A] text-gray-100 relative overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4F46E5]/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-[0.2em]">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Director & Faculty</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Meet{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              {FACULTY.name}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Mathematics coaching for Class 11 and 12 students of CBSE and Bihar
            Board at Mathematics Care Point, K.G. Road, Arrah.
          </p>
        </div>

        {/* Master Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Faculty Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5]/10 rounded-full blur-2xl"></div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#F59E0B] via-[#4F46E5] to-[#10B981] p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-[#0F172A] flex flex-col items-center justify-center text-white">
                      <span className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight">
                        {FACULTY.initials}
                      </span>
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">
                        Faculty
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-lg bg-[#10B981] text-white shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                    {FACULTY.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400">
                    {FACULTY.title}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-gray-400 text-[11px]">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>K.G. Road, Arrah, Bhojpur, Bihar</span>
                  </div>
                </div>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0F172A] border border-white/10 mb-6 text-center">
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-['Outfit']">
                    11 & 12
                  </div>
                  <div className="text-[11px] text-gray-400">Classes</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg sm:text-xl font-black text-indigo-400 font-['Outfit']">
                    CBSE & Bihar
                  </div>
                  <div className="text-[11px] text-gray-400">Boards</div>
                </div>
                <div className="space-y-0.5 pt-2 border-t border-white/10">
                  <div className="text-lg sm:text-xl font-bold text-amber-400 font-['Outfit']">
                    Hindi & English
                  </div>
                  <div className="text-[11px] text-gray-400">Medium</div>
                </div>
                <div className="space-y-0.5 pt-2 border-t border-white/10">
                  <div className="text-lg sm:text-xl font-bold text-blue-400 font-['Outfit']">
                    Offline + Online
                  </div>
                  <div className="text-[11px] text-gray-400">Live Classes</div>
                </div>
              </div>

              {/* Coaching highlights */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>What the coaching offers</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-300">
                  {FACULTY.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={FACULTY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Sir on WhatsApp ({FACULTY.whatsapp})</span>
                </a>

                <button
                  onClick={onOpenInquiry}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Enquire About Admission</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy & Approach */}
          <div className="lg:col-span-7 space-y-6">
            {/* Philosophy */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-white/10 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Teaching Approach</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                “{FACULTY.philosophy}”
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                Mathematics Care Point focuses on one subject only, so every
                class, worksheet and test is built around helping Class 11 and
                Class 12 students understand Mathematics clearly and solve
                problems with confidence.
              </p>
            </div>

            {/* 4 pillars */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                How Learning Works at Mathematics Care Point
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-[#1E293B] border border-white/10 space-y-2 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                    <Target className="w-4 h-4" />
                    <span>1. Concept Clarity</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Chapters are taught from the basics so students understand
                    why a method works, not just how to apply it.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-[#1E293B] border border-white/10 space-y-2 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                    <span>2. Study Material & Practice</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Study material and practice problems for Class 11 and 12,
                    available through the Study Portal on this website.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-[#1E293B] border border-white/10 space-y-2 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <Clock className="w-4 h-4" />
                    <span>3. Test Series</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Regular tests to check progress and build exam confidence
                    for CBSE and Bihar Board papers.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-[#1E293B] border border-white/10 space-y-2 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <MessageCircle className="w-4 h-4" />
                    <span>4. Doubt-Clearing Sessions</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Dedicated sessions to resolve questions, so no topic is
                    left unclear before the exam.
                  </p>
                </div>
              </div>
            </div>

            {/* Modes & medium */}
            <div className="p-6 rounded-3xl bg-[#1E293B]/70 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#10B981]" />
                <span>Learn the way that suits you</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                <div className="flex items-start gap-2.5 rounded-2xl bg-white/5 border border-white/5 p-4">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Offline:</strong> in-person
                    classes at K.G. Road, Arrah.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-2xl bg-white/5 border border-white/5 p-4">
                  <Monitor className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Online:</strong> live
                    classes from home, no travel needed.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 rounded-2xl bg-white/5 border border-white/5 p-4 sm:col-span-2">
                  <Languages className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Medium:</strong> Hindi and
                    English supported.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};