import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  HelpCircle,
  Share2,
  Printer,
  ZoomIn,
  ZoomOut,
  Award,
  BookOpen,
  Sparkles,
  MessageCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { StudyMaterial } from '../types';

interface DocumentViewerModalProps {
  material: StudyMaterial | null;
  onClose: () => void;
  onDownload: (material: StudyMaterial) => void;
}

const PHONE = '7654144498';

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  material,
  onClose,
  onDownload
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'content' | 'questions' | 'notes'>('content');

  if (!material) return null;

  const toggleSolution = (qNum: number) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'syllabus':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'mock-paper':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'dpp':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'pyq':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const formatCategoryName = (cat: string) => {
    switch (cat) {
      case 'syllabus': return 'Syllabus';
      case 'mock-paper': return 'Mock Paper';
      case 'dpp': return 'Daily Practice Paper (DPP)';
      case 'pyq': return 'Previous Year Question (PYQ)';
      default: return cat;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello! I'm reviewing this study material from Mathematics Care Point:\n` +
      `*${material.title}*\n` +
      `Class: ${material.classGrade} | Subject: ${material.subject.toUpperCase()} | Type: ${formatCategoryName(material.category)}\n` +
      `Faculty: S.K. Prasad (${PHONE})\n` +
      `Location: K.G. Road, Arrah, Bihar`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const doubtLink = `https://wa.me/91${PHONE}?text=${encodeURIComponent(
    `Hello Sir, I have a doubt regarding "${material.title}" (Class ${material.classGrade} Mathematics).`
  )}`;

  return (
    <div
      id="document-viewer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="document-viewer-dialog"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1E293B] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0F172A] border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadgeColor(material.category)}`}>
                  {formatCategoryName(material.category)}
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Class {material.classGrade} • {material.subject.toUpperCase()}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate font-['Outfit'] mt-0.5">
                {material.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-[#0F172A] rounded-xl p-1 border border-white/10 text-xs text-gray-300">
              <button
                onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
                className="p-1 hover:text-white hover:bg-white/10 rounded-lg"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="p-1 hover:text-white hover:bg-white/10 rounded-lg"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-[#0F172A] hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsAppShare}
              className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 transition-colors"
              title="Share via WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Download Button */}
            <button
              onClick={() => onDownload(material)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-indigo-500 text-white text-xs font-bold shadow transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-[#0F172A]/70 border-b border-white/10 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'content'
                ? 'bg-[#4F46E5] text-white font-semibold'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          {material.sampleQuestions && material.sampleQuestions.length > 0 && (
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'questions'
                  ? 'bg-[#4F46E5] text-white font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Solved Questions ({material.sampleQuestions.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'notes'
                ? 'bg-[#4F46E5] text-white font-semibold'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Study Tips</span>
          </button>
        </div>

        {/* Document Content Scroll Area */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0F172A]/40 space-y-6"
          style={{ fontSize: `${zoomLevel}%` }}
        >
          {/* Document header */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 text-center space-y-2 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest font-black text-indigo-400 font-['Outfit']">
                MATHEMATICS CARE POINT
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
              {material.title}
            </h3>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Prepared for Class {material.classGrade} • Faculty: S.K. Prasad • K.G. Road, Arrah
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-gray-300">
              {material.chapter && (
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 font-medium">
                  Chapter: <strong className="text-white">{material.chapter}</strong>
                </span>
              )}
              {material.year && (
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                  Target: <strong className="text-white">{material.year}</strong>
                </span>
              )}
              {material.marksTotal && (
                <span className="px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 font-semibold">
                  Max Marks: <strong>{material.marksTotal}</strong>
                </span>
              )}
              {material.durationMinutes && (
                <span className="px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 font-semibold">
                  Time Allowed: <strong>{material.durationMinutes} Mins</strong>
                </span>
              )}
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                File: {material.fileName || 'Study_Material.pdf'} ({material.fileSize || '2.0 MB'})
              </span>
            </div>
          </div>

          {/* TAB 1: Overview */}
          {activeTab === 'content' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Description & Scope
                </h4>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {material.description}
                </p>
                {material.contentSummary && (
                  <div className="mt-3 p-4 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-gray-300 leading-relaxed">
                    <strong className="text-indigo-400 font-semibold block mb-1">Topics Covered:</strong>
                    {material.contentSummary}
                  </div>
                )}
              </div>

              {/* Study instructions */}
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  How to Use This Material
                </h4>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  <li>Attempt papers in a quiet place within the allowed time, as in the actual exam.</li>
                  <li>Try each question on your own before looking at the solution.</li>
                  <li>Note the questions you could not solve and bring them to a doubt-clearing session.</li>
                  <li>Check your steps against the solution and marking scheme.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Solved Questions */}
          {activeTab === 'questions' && material.sampleQuestions && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-semibold text-gray-400">
                  Click 'Reveal Answer' to check your steps.
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  {Object.values(revealedSolutions).filter(Boolean).length} / {material.sampleQuestions.length} Revealed
                </span>
              </div>

              {material.sampleQuestions.map((q) => {
                const isRevealed = revealedSolutions[q.qNumber];
                return (
                  <div
                    key={q.qNumber}
                    className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#4F46E5] text-white text-xs font-bold">
                          Q{q.qNumber}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white/10 text-gray-300">
                          {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleSolution(q.qNumber)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isRevealed
                            ? 'bg-white/10 text-gray-200 hover:bg-white/20'
                            : 'bg-[#10B981] text-white hover:bg-[#059669] shadow-sm'
                        }`}
                      >
                        {isRevealed ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Answer</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Reveal Answer & Steps</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                      {q.question}
                    </p>

                    {q.solutionHint && !isRevealed && (
                      <div className="text-xs text-gray-400 italic bg-[#1E293B] p-3 rounded-xl border border-white/10 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong>Hint:</strong> {q.solutionHint}</span>
                      </div>
                    )}

                    {isRevealed && q.fullAnswer && (
                      <div className="mt-3 p-4 rounded-xl bg-[#0F172A] border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 font-mono space-y-1.5 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 font-sans font-bold text-emerald-400 text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Answer & Steps:</span>
                        </div>
                        <p className="whitespace-pre-line leading-relaxed text-gray-200 font-sans">
                          {q.fullAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: Study Tips */}
          {activeTab === 'notes' && (
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow">
                  SKP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">S.K. Prasad</h4>
                  <p className="text-xs text-gray-400">Director & Mathematics Faculty • Mathematics Care Point</p>
                </div>
              </div>

              <blockquote className="text-sm text-gray-200 italic border-l-4 border-indigo-500 pl-4 py-1 leading-relaxed">
                “Understand the concepts, practise with confidence, and build a strong foundation in Mathematics.”
              </blockquote>

              <div className="p-4 rounded-xl bg-[#1E293B] border border-white/10 space-y-2 text-xs text-gray-300">
                <strong className="text-indigo-400 font-semibold block">
                  Tips for Class {material.classGrade} Mathematics
                </strong>
                <ul className="list-disc list-inside space-y-1.5">
                  <li>Learn the concept and formula derivation before solving questions.</li>
                  <li>Practise regularly and write every step of the solution clearly.</li>
                  <li>Revise your mistakes and attempt similar questions again.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#1E293B] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-gray-300">
                  Have a doubt about this material?
                </div>
                <a
                  href={doubtLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="px-4 sm:px-6 py-4 bg-[#0F172A] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Mathematics Care Point • K.G. Road, Arrah</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onDownload(material)}
              className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 transition-all shadow"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF ({material.fileSize || '2.0 MB'})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};