import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  HelpCircle,
  Award,
  Search,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  GraduationCap,
  UploadCloud,
  Filter,
  Layers,
  FileCheck
} from 'lucide-react';
import { ClassGrade, MaterialCategory, StudyMaterial } from '../types';
import { SUBJECTS_CONFIG } from '../data/initialData';

interface ClassPortalProps {
  activeClass: ClassGrade;
  onSelectClass: (grade: ClassGrade) => void;
  materials: StudyMaterial[];
  onOpenViewer: (material: StudyMaterial) => void;
  onDownload: (material: StudyMaterial) => void;
  onOpenUploadForCategory: (grade: ClassGrade, subject: string, category: MaterialCategory) => void;
}

const CLASS_OPTIONS: ClassGrade[] = ['11', '12'];

const CATEGORY_TABS: {
  id: MaterialCategory;
  label: string;
  short: string;
  countLabel: string;
  icon: React.ElementType;
  iconActive: string;
  tileActive: string;
  countBadge: string;
  bar: string;
}[] = [
  {
    id: 'syllabus',
    label: '1. Syllabus',
    short: 'Chapters & Weightage',
    countLabel: 'Sets',
    icon: BookOpen,
    iconActive: 'bg-blue-600 text-white',
    tileActive: 'bg-[#1E293B] border-blue-500 shadow-blue-900/20 ring-1 ring-blue-500/50',
    countBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    bar: 'bg-blue-500'
  },
  {
    id: 'mock-paper',
    label: '2. Mock Papers',
    short: 'Full-Length Tests',
    countLabel: 'Papers',
    icon: FileText,
    iconActive: 'bg-purple-600 text-white',
    tileActive: 'bg-[#1E293B] border-purple-500 shadow-purple-900/20 ring-1 ring-purple-500/50',
    countBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bar: 'bg-purple-500'
  },
  {
    id: 'dpp',
    label: '3. Daily Practice (DPP)',
    short: 'Practice Problems',
    countLabel: 'Sheets',
    icon: HelpCircle,
    iconActive: 'bg-[#10B981] text-white',
    tileActive: 'bg-[#1E293B] border-[#10B981] shadow-emerald-900/20 ring-1 ring-[#10B981]/50',
    countBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    bar: 'bg-[#10B981]'
  },
  {
    id: 'pyq',
    label: '4. Previous Year (PYQ)',
    short: 'Past Exam Questions',
    countLabel: 'Sets',
    icon: Award,
    iconActive: 'bg-amber-600 text-white',
    tileActive: 'bg-[#1E293B] border-amber-500 shadow-amber-900/20 ring-1 ring-amber-500/50',
    countBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bar: 'bg-amber-500'
  }
];

const getCategoryMeta = (cat: MaterialCategory) => {
  switch (cat) {
    case 'syllabus':
      return {
        title: 'Syllabus & Chapter Weightage',
        desc: 'Chapter-wise syllabus overview and unit roadmap checklists.',
        icon: BookOpen,
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      };
    case 'mock-paper':
      return {
        title: 'Full-Length Mock Papers',
        desc: 'Timed practice papers in board pattern with solutions.',
        icon: FileText,
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      };
    case 'dpp':
      return {
        title: 'Daily Practice Papers (DPP)',
        desc: 'Topic-wise practice problem sets with hints and step-by-step solutions.',
        icon: HelpCircle,
        badgeColor: 'bg-[#10B981]/20 text-emerald-300 border-[#10B981]/30'
      };
    case 'pyq':
    default:
      return {
        title: 'Previous Year Questions (PYQ)',
        desc: 'Chapter-wise questions from previous exams with solutions.',
        icon: Award,
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      };
  }
};

export const ClassPortal: React.FC<ClassPortalProps> = ({
  activeClass,
  onSelectClass,
  materials,
  onOpenViewer,
  onDownload,
  onOpenUploadForCategory
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState<MaterialCategory>('syllabus');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Class 10 is no longer offered: if state still holds it, move to Class 11.
  useEffect(() => {
    if (!CLASS_OPTIONS.includes(activeClass)) {
      onSelectClass('11');
    }
  }, [activeClass, onSelectClass]);

  const availableSubjects = useMemo(() => {
    return SUBJECTS_CONFIG.filter(sub => sub.classes.includes(activeClass));
  }, [activeClass]);

  useEffect(() => {
    if (selectedSubject !== 'all') {
      const exists = availableSubjects.some(s => s.id === selectedSubject);
      if (!exists) {
        setSelectedSubject('all');
      }
    }
  }, [activeClass, availableSubjects, selectedSubject]);

  const filteredMaterials = useMemo(() => {
    return materials.filter(item => {
      if (item.classGrade !== activeClass) return false;
      if (item.category !== activeCategoryTab) return false;
      if (selectedSubject !== 'all' && item.subject.toLowerCase() !== selectedSubject.toLowerCase()) return false;
      if (difficultyFilter !== 'all' && item.difficulty !== difficultyFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesChapter = item.chapter?.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesChapter && !matchesSubject) {
          return false;
        }
      }
      return true;
    });
  }, [materials, activeClass, activeCategoryTab, selectedSubject, difficultyFilter, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<MaterialCategory, number> = {
      'syllabus': 0,
      'mock-paper': 0,
      'dpp': 0,
      'pyq': 0
    };

    materials.forEach(m => {
      if (m.classGrade === activeClass) {
        if (selectedSubject === 'all' || m.subject.toLowerCase() === selectedSubject.toLowerCase()) {
          counts[m.category] = (counts[m.category] || 0) + 1;
        }
      }
    });

    return counts;
  }, [materials, activeClass, selectedSubject]);

  const currentCategoryMeta = getCategoryMeta(activeCategoryTab);
  const uploadSubject = selectedSubject === 'all' ? 'mathematics' : selectedSubject;

  return (
    <section
      id="study-portal"
      className="py-16 md:py-24 bg-[#0F172A] text-gray-100 relative"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4F46E5]/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-[0.2em]">
            <Layers className="w-3.5 h-3.5" />
            <span>Study Portal</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Mathematics Study Hub for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Class {activeClass}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Study material from Mathematics Care Point, led by <strong>S.K. Prasad</strong>. Choose your class and explore syllabus, mock papers, daily practice papers and previous year questions.
          </p>
        </div>

        {/* Class Switcher */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          {CLASS_OPTIONS.map((grade) => {
            const isSelected = activeClass === grade;
            return (
              <button
                key={grade}
                id={`portal-class-select-${grade}`}
                onClick={() => onSelectClass(grade)}
                className={`relative px-5 sm:px-8 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 sm:gap-2.5 ${
                  isSelected
                    ? 'bg-[#4F46E5] text-white shadow-xl shadow-indigo-900/40 scale-105 border border-indigo-300/40'
                    : 'bg-[#1E293B] text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-gray-400'}`} />
                <span>Class {grade}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Subject selector: only shown when there is more than one subject */}
        {availableSubjects.length > 1 && (
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <button
                id="subject-pill-all"
                onClick={() => setSelectedSubject('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedSubject === 'all'
                    ? 'bg-white text-[#0F172A] shadow-md scale-105'
                    : 'bg-[#1E293B] text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                All Subjects
              </button>

              {availableSubjects.map((sub) => {
                const isSelected = selectedSubject === sub.id;
                return (
                  <button
                    key={sub.id}
                    id={`subject-pill-${sub.id}`}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#4F46E5] text-white border-indigo-300 shadow-md scale-105'
                        : 'bg-[#1E293B] text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4 Category Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategoryTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`p-4 sm:p-5 rounded-3xl border text-left transition-all duration-200 relative overflow-hidden group shadow-lg ${
                  isActive
                    ? tab.tileActive
                    : 'bg-[#1E293B]/70 border-white/10 hover:bg-[#1E293B] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isActive ? tab.iconActive : 'bg-white/5 text-gray-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${tab.countBadge}`}>
                    {categoryCounts[tab.id]} {tab.countLabel}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-1 font-['Outfit']">
                  {tab.label}
                </div>
                <div className="text-[11px] text-gray-400 leading-tight line-clamp-1">
                  {tab.short}
                </div>
                {isActive && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${tab.bar}`}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#1E293B] border border-white/10 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="study-portal-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by chapter, topic, keyword..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 text-xs text-gray-300">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden sm:inline">Difficulty:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none"
              >
                <option value="all">All Levels</option>
                <option value="Fundamental">Fundamental</option>
                <option value="Medium">Medium</option>
                <option value="Challenging">Challenging</option>
                <option value="Board Standard">Board Standard</option>
              </select>
            </div>

            <button
              onClick={() => onOpenUploadForCategory(activeClass, uploadSubject, activeCategoryTab)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981]/40 text-emerald-300 border border-[#10B981]/30 text-xs font-semibold transition-colors"
              title="Upload a document to this category (faculty only)"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Upload to Tab</span>
            </button>
          </div>
        </div>

        {/* Category Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1E293B]/70 border border-white/10 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-2xl border ${currentCategoryMeta.badgeColor}`}>
              <currentCategoryMeta.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                Class {activeClass} Mathematics • {currentCategoryMeta.title}
              </h3>
              <p className="text-xs text-gray-400">
                {currentCategoryMeta.desc}
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block shrink-0">
            <span className="text-xs font-bold text-indigo-400 font-mono">
              {filteredMaterials.length} {filteredMaterials.length === 1 ? 'document' : 'documents'}
            </span>
          </div>
        </div>

        {/* Material Cards */}
        {filteredMaterials.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#1E293B] border border-dashed border-white/10 text-center space-y-3 shadow-xl">
            <FileText className="w-12 h-12 mx-auto text-gray-500" />
            <h4 className="text-base font-bold text-gray-200">No documents found</h4>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Try changing your search or filter. Faculty can add a new syllabus, mock paper, DPP or PYQ set using the Faculty Upload Portal.
            </p>
            <button
              onClick={() => onOpenUploadForCategory(activeClass, uploadSubject, activeCategoryTab)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Document to this Section</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((item) => (
              <div
                key={item.id}
                id={`material-card-${item.id}`}
                className="group relative p-6 rounded-3xl bg-[#1E293B] border border-white/10 hover:border-indigo-500/60 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Top tags row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10 uppercase tracking-wider">
                      {item.subject}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.difficulty && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.difficulty === 'Challenging'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.difficulty === 'Board Standard'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-[#10B981]/20 text-emerald-300 border border-[#10B981]/30'
                        }`}>
                          {item.difficulty}
                        </span>
                      )}
                      {item.year && (
                        <span className="text-[10px] font-mono text-gray-400">
                          {item.year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h4
                    onClick={() => onOpenViewer(item)}
                    className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-2 mb-2 font-['Outfit']"
                  >
                    {item.title}
                  </h4>

                  {item.chapter && (
                    <div className="text-xs font-semibold text-indigo-400 mb-1 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.chapter}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-gray-300">
                    {item.marksTotal && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10">
                        {item.marksTotal} Marks
                      </span>
                    )}
                    {item.durationMinutes && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {item.durationMinutes}m
                      </span>
                    )}
                    {item.solutionsAvailable && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Step Solutions
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2.5">
                  <button
                    onClick={() => onOpenViewer(item)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 group/btn border border-white/10"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400 group-hover/btn:scale-110 transition-transform" />
                    <span>View & Study</span>
                  </button>

                  <button
                    onClick={() => onDownload(item)}
                    className="py-2.5 px-3.5 rounded-xl bg-[#4F46E5]/20 hover:bg-[#4F46E5] text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1"
                    title={`Download ${item.fileName || 'PDF'}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="text-[10px]">{item.fileSize || 'PDF'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};