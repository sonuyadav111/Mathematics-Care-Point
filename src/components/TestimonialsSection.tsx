import React from 'react';
import { Quote, MapPin, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/initialData';

export const TestimonialsSection: React.FC = () => {
  // Nothing fake is shown: until real testimonials are added to
  // TESTIMONIALS_DATA (src/data/initialData.ts), this section stays hidden.
  if (TESTIMONIALS_DATA.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-[#0F172A] text-gray-100 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Student & Parent Feedback</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            What Students Say About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
              Mathematics Care Point
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Feedback from students and parents of Class 11 and 12 Mathematics at Mathematics Care Point, Arrah.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-3xl bg-[#1E293B] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between space-y-4 relative group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{t.subject}</span>
                  <Quote className="w-6 h-6 text-gray-600 group-hover:text-amber-500/60 transition-colors" />
                </div>

                {t.scoreOrRank && (
                  <div className="inline-block px-3 py-1 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 text-emerald-300 font-black text-xs font-mono">
                    {t.scoreOrRank}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center font-black text-xs text-white shadow">
                  {t.studentName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-['Outfit']">{t.studentName}</h4>
                  <p className="text-[11px] text-gray-400">
                    {t.classGrade}
                    {t.year ? ` (${t.year})` : ''}
                  </p>
                  {t.locality && (
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{t.locality}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};