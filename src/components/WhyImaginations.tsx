import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Languages,
  Monitor,
  MapPin,
  Calculator,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const advantages = [
  {
    icon: Calculator,
    title: 'Mathematics Focus',
    desc: 'Dedicated coaching for Mathematics in Classes 11 and 12, with learning focused on the subject.',
    badge: 'Subject-focused'
  },
  {
    icon: GraduationCap,
    title: 'Class 11 & 12',
    desc: 'Classes designed for senior secondary students who want to strengthen their Mathematics foundation.',
    badge: 'Two classes'
  },
  {
    icon: BookOpen,
    title: 'CBSE & Bihar Board',
    desc: 'Mathematics coaching for students studying under either the CBSE or Bihar Board curriculum.',
    badge: 'Board support'
  },
  {
    icon: Languages,
    title: 'Hindi & English',
    desc: 'Learn Mathematics with support in Hindi or English medium.',
    badge: 'Two mediums'
  },
  {
    icon: Monitor,
    title: 'Online Live Classes',
    desc: 'Attend live Mathematics classes online, without needing to travel to the institute.',
    badge: 'Online'
  },
  {
    icon: MapPin,
    title: 'Offline Classes in Arrah',
    desc: 'Attend in-person classes at Mathematics Care Point on K.G. Road, Arrah.',
    badge: 'In-person'
  }
];

export const WhyImaginations: React.FC = () => {
  return (
    <section
      id="advantages"
      className="py-16 md:py-24 bg-[#0F172A] text-gray-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Mathematics Care Point</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Mathematics Learning for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Classes 11 & 12
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Mathematics Care Point, led by S.K. Prasad, provides Mathematics
            coaching for CBSE and Bihar Board students. Classes are available
            in Hindi and English, in both offline and online live formats.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantages.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="p-7 rounded-3xl bg-[#1E293B] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all duration-300 space-y-3 group shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#4F46E5]/20 text-indigo-300 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors font-['Outfit']">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Institute Details */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#1E293B] border border-white/10 shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-7">
            <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
              Mathematics Care Point
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Coaching details at a glance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Classes</p>
                <p className="text-xs text-gray-400 mt-1">Class 11 and Class 12</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Subject</p>
                <p className="text-xs text-gray-400 mt-1">Mathematics only</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Boards</p>
                <p className="text-xs text-gray-400 mt-1">CBSE and Bihar Board</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Teaching modes</p>
                <p className="text-xs text-gray-400 mt-1">Offline and online live classes</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Medium</p>
                <p className="text-xs text-gray-400 mt-1">Hindi and English</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/5 p-4">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Location</p>
                <p className="text-xs text-gray-400 mt-1">K.G. Road, Arrah, Bhojpur, Bihar</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Director & Faculty
            </p>
            <p className="text-base font-bold text-white mt-1">S.K. Prasad</p>
          </div>
        </div>
      </div>
    </section>
  );
};
