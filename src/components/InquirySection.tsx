import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  MapPin,
  User
} from 'lucide-react';
import { ClassGrade, InquiryFormState } from '../types';

interface InquirySectionProps {
  initialGrade?: ClassGrade;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  initialGrade = '12'
}) => {
  const [formData, setFormData] = useState<InquiryFormState>({
    studentName: '',
    parentName: '',
    phone: '',
    classGrade: initialGrade === '11' ? '11' : '12',
    subjects: ['Mathematics'],
    addressLocality: 'K.G. Road, Arrah',
    preferredTiming: 'Evening (4 PM - 7 PM)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const availableSubjectChoices = ['Mathematics'];

  const handleSubjectToggle = (subj: string) => {
    setFormData(prev => {
      const exists = prev.subjects.includes(subj);
      if (exists) {
        return { ...prev, subjects: prev.subjects.filter(s => s !== subj) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subj] };
      }
    });
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.phone.trim()) {
      alert('Please fill in student name and phone number.');
      return;
    }

    const text = encodeURIComponent(
      `*New Admission Inquiry - Mathematics Care Point*\n` +
      `👤 *Student Name:* ${formData.studentName}\n` +
      `👨‍👩‍👧 *Parent Name:* ${formData.parentName || 'N/A'}\n` +
      `📞 *Contact Number:* ${formData.phone}\n` +
      `🎓 *Target Class:* Class ${formData.classGrade}\n` +
      `📚 *Subject:* Mathematics\n` +
      `📍 *Student Locality:* ${formData.addressLocality || 'Not provided'}\n` +
      `⏰ *Preferred Time Slot:* ${formData.preferredTiming}\n` +
      `💬 *Message:* ${formData.message || 'Please share course and batch details.'}\n\n` +
      `_Sent via Mathematics Care Point website_`
    );

    setSubmitted(true);
    window.open(`https://wa.me/917654144498?text=${text}`, '_blank');
  };

  return (
    <section 
      id="inquiry-form" 
      className="py-16 md:py-24 bg-[#0F172A] text-gray-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#1E293B] border border-white/10 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em]">
              <Phone className="w-3.5 h-3.5" />
              <span>Class 11 & 12 Mathematics Admissions</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
              Enquire About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Class 11 & 12 Mathematics</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
              Fill in your details below to send an inquiry to Mathematics Care Point, Ara on WhatsApp: <strong>7654144498</strong>. Classes are available in Hindi and English medium.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-3xl bg-[#10B981]/10 border border-[#10B981]/30 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Inquiry Generated Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                Your WhatsApp inquiry has been prepared for Mathematics Care Point (7654144498). The institute can share batch and admission details with you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-2xl bg-[#0F172A] hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSend} className="space-y-6">
              
              {/* Row 1: Student Name & Parent Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Student Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Mr. Sharma"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Select Class *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['11', '12'] as ClassGrade[]).map((grade) => (
                      <button
                        type="button"
                        key={grade}
                        onClick={() => setFormData({ ...formData, classGrade: grade })}
                        className={`py-2.5 text-xs font-bold rounded-2xl border transition-all ${
                          formData.classGrade === grade
                            ? 'bg-[#4F46E5] text-white border-indigo-400 shadow-md scale-105'
                            : 'bg-[#0F172A] text-gray-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        Class {grade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subjects Choice Chips */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSubjectChoices.map((s) => {
                    const isSelected = formData.subjects.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => handleSubjectToggle(s)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-[#10B981] text-white border-emerald-400 shadow-sm scale-105'
                            : 'bg-[#0F172A] text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Locality & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Locality (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.addressLocality}
                      onChange={(e) => setFormData({ ...formData, addressLocality: e.target.value })}
                      placeholder="e.g. Nawada, Ara"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTiming}
                    onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Morning (7 AM - 9 AM)">Morning (7 AM - 9 AM)</option>
                    <option value="Afternoon (2 PM - 4 PM)">Afternoon (2 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                    <option value="Night (7 PM - 9 PM)">Night (7 PM - 9 PM)</option>
                    <option value="Weekend Intensive">Weekend Intensive</option>
                  </select>
                </div>
              </div>

              {/* Message Note */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Board / Medium / Your Question
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Class 12, Bihar Board, Hindi medium"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-sm sm:text-base font-bold shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all hover:scale-101 active:scale-99"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Inquiry to Mathematics Care Point</span>
                </button>
                <p className="text-[11px] text-center text-gray-400 mt-2">
                  Mathematics Care Point • K.G. Road, Arrah, Bihar
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
