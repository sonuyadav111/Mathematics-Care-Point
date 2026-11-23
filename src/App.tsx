import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  Hero 
} from './components/Hero';
import { 
  ClassPortal 
} from './components/ClassPortal';
import { 
  TeacherProfileSection 
} from './components/TeacherProfile';
import { 
  WhyImaginations 
} from './components/WhyImaginations';
import { 
  TestimonialsSection 
} from './components/TestimonialsSection';
import { 
  InquirySection 
} from './components/InquirySection';
import { 
  ContactFooter 
} from './components/ContactFooter';
import { 
  DocumentViewerModal 
} from './components/DocumentViewerModal';
import { 
  AdminUploadModal 
} from './components/AdminUploadModal';
import { 
  ClassGrade, 
  MaterialCategory, 
  StudyMaterial 
} from './types';
import { 
  INITIAL_STUDY_MATERIALS 
} from './data/initialData';
import { 
  MessageCircle, 
  ArrowUp, 
  Sparkles, 
  CheckCircle,
  Download
} from 'lucide-react';

export default function App() {
  // Active class state (default Class 12 as senior board)
  const [activeClass, setActiveClass] = useState<ClassGrade>('12');

  // Study materials loaded from localStorage or initialized with defaults
  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('mathematics_care_point_study_materials');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading materials from localStorage:', e);
    }
    return INITIAL_STUDY_MATERIALS;
  });

  // Active document viewer state
  const [viewingMaterial, setViewingMaterial] = useState<StudyMaterial | null>(null);

  // Admin upload modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialClass, setAdminInitialClass] = useState<ClassGrade>('12');
  const [adminInitialSubject, setAdminInitialSubject] = useState<string>('physics');
  const [adminInitialCategory, setAdminInitialCategory] = useState<MaterialCategory>('mock-paper');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Save materials to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('mathematics_care_point_study_materials', JSON.stringify(materials));
    } catch (e) {
      console.error('Error saving materials to localStorage:', e);
    }
  }, [materials]);

  // Scroll to top button visibility listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Add new material from Admin Portal
  const handleAddMaterial = (newMaterial: StudyMaterial) => {
    setMaterials(prev => [newMaterial, ...prev]);
    showToast(`Published "${newMaterial.title}" to Class ${newMaterial.classGrade} Portal!`);
  };

  // Delete material from Admin Portal
  const handleDeleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    showToast('Material removed from portal library.');
  };

  // Reset materials back to initial default dataset
  const handleResetMaterials = () => {
    setMaterials(INITIAL_STUDY_MATERIALS);
    showToast('Restored default master study materials vault.');
  };

  // Open Admin modal with contextual pre-selection
  const handleOpenUploadForCategory = (grade: ClassGrade, subject: string, category: MaterialCategory) => {
    setAdminInitialClass(grade);
    setAdminInitialSubject(subject);
    setAdminInitialCategory(category);
    setIsAdminOpen(true);
  };

  // Download PDF handler
  const handleDownload = (material: StudyMaterial) => {
    // If real data URL exists, trigger download of that
    if (material.pdfDataUrl) {
      const link = document.createElement('a');
      link.href = material.pdfDataUrl;
      link.download = material.fileName || `${material.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create rich formatted educational text document as downloadable file
      const questionsText = material.sampleQuestions 
        ? material.sampleQuestions.map(q => `\nQuestion ${q.qNumber} [${q.marks} Marks]:\n${q.question}\n\nHint: ${q.solutionHint || 'Refer to standard theory'}\n\nStep Solution:\n${q.fullAnswer || 'See teacher notes'}\n---------------------------------------------`).join('\n')
        : 'Syllabus & Course Structure Notes';

      const fileContent = 
`=======================================================================
MATHEMATICS CARE POINT
Mathematics Coaching for Classes 11 & 12 | CBSE & Bihar Board
Director: S.K. Prasad | Contact / WhatsApp: 7654144498
Location: K.G. Road, Arrah, Bhojpur, Bihar
=======================================================================

DOCUMENT: ${material.title}
TARGET CLASS: Class ${material.classGrade}
SUBJECT: ${material.subject.toUpperCase()}
CATEGORY: ${material.category.toUpperCase()}
CHAPTER: ${material.chapter || 'Comprehensive Examination'}
ACADEMIC YEAR: ${material.year || '2025-26'}
TOTAL MARKS: ${material.marksTotal || 'N/A'} | TIME ALLOWED: ${material.durationMinutes ? `${material.durationMinutes} Minutes` : 'N/A'}

DESCRIPTION & GUIDELINES:
${material.description}

CURRICULUM SUMMARY:
${material.contentSummary || 'Mathematics Care Point study material and board examination guidance.'}

QUESTIONS & DETAILED STEP MARKING:
${questionsText}

=======================================================================
For 1-on-1 personalized home tutoring, mock test evaluation, and 
doubt resolution, contact S.K. Prasad at 7654144498.
=======================================================================`;

      const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = material.fileName ? material.fileName.replace('.pdf', '_Mathematics Care Point.txt') : `${material.title.replace(/[^a-zA-Z0-9]/g, '_')}_Mathematics Care Point.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    // Increment downloads count in local state
    setMaterials(prev => prev.map(m => m.id === material.id ? { ...m, downloadsCount: m.downloadsCount + 1 } : m));
    showToast(`Downloading "${material.title}"...`);
  };

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeClass={activeClass}
        onSelectClass={(grade) => setActiveClass(grade)}
        onOpenAdmin={() => {
          setAdminInitialClass(activeClass);
          setIsAdminOpen(true);
        }}
        onOpenInquiry={scrollToInquiry}
        materialsCount={materials.length}
      />

      {/* 2. Hero Section */}
      <Hero
        onSelectClass={(grade) => setActiveClass(grade)}
        onOpenInquiry={scrollToInquiry}
        onOpenAdmin={() => {
          setAdminInitialClass(activeClass);
          setIsAdminOpen(true);
        }}
      />

      {/* 3. Class-Wise Study Portal (Subject-Wise & 4 Tabs: Syllabus, Mock Papers, DPP, PYQ) */}
      <ClassPortal
        activeClass={activeClass}
        onSelectClass={(grade) => setActiveClass(grade)}
        materials={materials}
        onOpenViewer={(mat) => setViewingMaterial(mat)}
        onDownload={handleDownload}
        onOpenUploadForCategory={handleOpenUploadForCategory}
      />

      {/* 4. Director / Faculty Profile */}
      <TeacherProfileSection
        onOpenInquiry={scrollToInquiry}
      />

      {/* 5. Why Choose Mathematics Care Point */}
      <WhyImaginations />

      {/* 6. Real Student & Parent Testimonials */}
      <TestimonialsSection />

      {/* 7. Home Demo & Consultation Inquiry Section */}
      <InquirySection
        initialGrade={activeClass}
      />

      {/* 8. Contact & Location Footer (K.G. Road, Arrah, Bihar) */}
      <ContactFooter
        onSelectClass={(grade) => setActiveClass(grade)}
        onOpenAdmin={() => {
          setAdminInitialClass(activeClass);
          setIsAdminOpen(true);
        }}
        onOpenInquiry={scrollToInquiry}
      />

      {/* Interactive Document Viewer Modal */}
      {viewingMaterial && (
        <DocumentViewerModal
          material={viewingMaterial}
          onClose={() => setViewingMaterial(null)}
          onDownload={handleDownload}
        />
      )}

      {/* Admin Document Upload & Management Modal */}
      {isAdminOpen && (
        <AdminUploadModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          materials={materials}
          onAddMaterial={handleAddMaterial}
          onDeleteMaterial={handleDeleteMaterial}
          onResetMaterials={handleResetMaterials}
          initialClass={adminInitialClass}
          initialSubject={adminInitialSubject}
          initialCategory={adminInitialCategory}
        />
      )}

      {/* Floating Action Button: WhatsApp 7654144498 */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Primary Floating WhatsApp Integration */}
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/917654144498?text=Hello%20Sir%2C%20I%20would%20like%20to%20inquire%20about%20Mathematics%20classes%20for%20Class%2011%20or%2012."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xl shadow-emerald-600/40 border border-emerald-400/30 transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 leading-none">
              S.K. Prasad
            </div>
            <div className="text-xs font-black font-mono leading-tight">
              7654144498
            </div>
          </div>
        </a>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-slate-100 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

    </div>
  );
}
