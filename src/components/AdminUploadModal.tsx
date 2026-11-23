import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  LogOut,
  UserCheck
} from 'lucide-react';
import { ClassGrade, MaterialCategory, StudyMaterial } from '../types';

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: StudyMaterial[];
  onAddMaterial: (newMaterial: StudyMaterial) => void;
  onDeleteMaterial: (id: string) => void;
  onResetMaterials: () => void;
  initialClass?: ClassGrade;
  initialSubject?: string;
  initialCategory?: MaterialCategory;
}

const DEFAULT_PASSCODES = ['raman@321'];

export const AdminUploadModal: React.FC<AdminUploadModalProps> = ({
  isOpen,
  onClose,
  materials,
  onAddMaterial,
  onDeleteMaterial,
  onResetMaterials,
  initialClass = '12',
  initialSubject = 'mathematics',
  initialCategory = 'mock-paper'
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mathematics_care_point_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Login form state
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState('');

  const [activeAdminTab, setActiveAdminTab] = useState<'upload' | 'manage'>('upload');
  
  // Form states
  const [classGrade, setClassGrade] = useState<ClassGrade>(initialClass);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [category, setCategory] = useState<MaterialCategory>(initialCategory);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapter, setChapter] = useState('');
  const [year, setYear] = useState('2026-27');
  const [marksTotal, setMarksTotal] = useState<string>('70');
  const [durationMinutes, setDurationMinutes] = useState<string>('180');
  const [difficulty, setDifficulty] = useState<'Fundamental' | 'Medium' | 'Challenging' | 'Board Standard'>('Board Standard');
  
  // File upload states
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [uploadedFileDataUrl, setUploadedFileDataUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample questions state
  const [questionsList, setQuestionsList] = useState<{
    qNumber: number;
    question: string;
    marks: number;
    solutionHint: string;
    fullAnswer: string;
  }[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionMarks, setNewQuestionMarks] = useState(3);
  const [newQuestionHint, setNewQuestionHint] = useState('');
  const [newQuestionAnswer, setNewQuestionAnswer] = useState('');

  // Notification state
  const [successMessage, setSuccessMessage] = useState('');

  // Update form defaults when initial props change
  useEffect(() => {
    if (initialClass) setClassGrade(initialClass);
    if (initialSubject) setSubject(initialSubject);
    if (initialCategory) setCategory(initialCategory);
  }, [initialClass, initialSubject, initialCategory]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const savedPass = localStorage.getItem('mathematics_care_point_custom_passcode');
    const validCodes = savedPass ? [...DEFAULT_PASSCODES, savedPass] : DEFAULT_PASSCODES;

    if (validCodes.includes(enteredPasscode.trim())) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('mathematics_care_point_admin_auth', 'true');
      } catch (err) {
        console.error(err);
      }
      setEnteredPasscode('');
      setAuthError('');
    } else {
      setAuthError('Access Denied: Incorrect Admin Passcode. Only S.K. Prasad can upload.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('mathematics_care_point_admin_auth');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim() || newPasscode.trim().length < 4) {
      setAuthError('Passcode must be at least 4 characters long.');
      return;
    }
    try {
      localStorage.setItem('mathematics_care_point_custom_passcode', newPasscode.trim());
      setPasscodeSuccess('Admin passcode updated successfully!');
      setNewPasscode('');
      setTimeout(() => {
        setPasscodeSuccess('');
        setShowChangePassword(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setUploadedFileName(file.name);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setUploadedFileSize(`${sizeInMB} MB`);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFileDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    const nextQNum = questionsList.length + 1;
    setQuestionsList(prev => [
      ...prev,
      {
        qNumber: nextQNum,
        question: newQuestionText.trim(),
        marks: Number(newQuestionMarks) || 3,
        solutionHint: newQuestionHint.trim(),
        fullAnswer: newQuestionAnswer.trim()
      }
    ]);
    setNewQuestionText('');
    setNewQuestionHint('');
    setNewQuestionAnswer('');
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestionsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a document title.');
      return;
    }

    const newDoc: StudyMaterial = {
      id: `doc-${Date.now()}`,
      classGrade,
      subject,
      category,
      title: title.trim(),
      description: description.trim() || `Mathematics study material for Class ${classGrade}, published by Mathematics Care Point.`,
      chapter: chapter.trim() || 'General Unit Assessment',
      year: year || '2026-27',
      marksTotal: category === 'mock-paper' || category === 'dpp' ? Number(marksTotal) || 70 : undefined,
      durationMinutes: category === 'mock-paper' || category === 'dpp' ? Number(durationMinutes) || 180 : undefined,
      fileSize: uploadedFileSize || '1.8 MB',
      fileName: uploadedFileName || `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      dateAdded: new Date().toISOString().split('T')[0],
      difficulty,
      isOfficial: true,
      downloadsCount: 1,
      solutionsAvailable: questionsList.length > 0 || category !== 'syllabus',
      sampleQuestions: questionsList.length > 0 ? questionsList : [
        {
          qNumber: 1,
          question: `Representative question for ${title.trim()}: Outline the core principles and step derivations.`,
          marks: 4,
          solutionHint: "Apply standard board-exam steps with proper formula definitions.",
          fullAnswer: "Step 1: Write given values. Step 2: Formulate fundamental theorem. Step 3: Solve algebraically and state unit."
        }
      ],
      pdfDataUrl: uploadedFileDataUrl || undefined
    };

    onAddMaterial(newDoc);
    setSuccessMessage(`Document "${title}" uploaded successfully to Class ${classGrade} ${subject.toUpperCase()}!`);
    
    // Reset form
    setTitle('');
    setDescription('');
    setChapter('');
    setUploadedFileName('');
    setUploadedFileSize('');
    setUploadedFileDataUrl('');
    setQuestionsList([]);

    setTimeout(() => {
      setSuccessMessage('');
      setActiveAdminTab('manage');
    }, 1500);
  };

  const subjectOptions = [
    { id: 'mathematics', name: 'Mathematics' }
  ];

  return (
    <div 
      id="admin-upload-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="admin-upload-dialog"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1E293B] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0F172A] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${isAuthenticated ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
              {isAuthenticated ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                  {isAuthenticated ? 'Institute Academic Management Portal' : 'Institute Admin Verification'}
                </h2>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${isAuthenticated ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                  {isAuthenticated ? 'Authorized (S.K. Prasad)' : 'Restricted Access'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {isAuthenticated 
                  ? 'Only authorized institute staff can publish Mathematics study materials for Classes 11 and 12.' 
                  : 'Only authorized institute staff can upload or modify materials on this portal.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Admin Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECURITY GATE: If user is NOT authenticated */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-950/40">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-black text-white font-['Outfit']">
                Institute Institute Login Required
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                To prevent unauthorized uploads and preserve strict academic accuracy, only <strong>S.K. Prasad</strong> can upload syllabus blueprints, mock tests, DPPs, and PYQs.
              </p>
            </div>

            {/* Passcode Entry Form */}
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <label className="block text-left text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Institute Admin Passcode / PIN
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={enteredPasscode}
                    onChange={(e) => {
                      setEnteredPasscode(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter Admin Passcode"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-medium flex items-center gap-2 text-left animate-in shake">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Unlock className="w-4 h-4" />
                <span>Verify & Unlock Admin Portal</span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-white underline underline-offset-4"
              >
                Return to Public Student Repository
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED MENTOR VIEW */
          <>
            {/* Tab Switcher */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#0F172A]/70 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveAdminTab('upload')}
                  className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                    activeAdminTab === 'upload'
                      ? 'bg-[#10B981] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Document</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('manage')}
                  className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                    activeAdminTab === 'manage'
                      ? 'bg-[#4F46E5] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Manage Materials ({materials.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-[11px]"
                  title="Change Master Passcode"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Change Passcode</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-semibold"
                  title="Lock Upload Portal"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock / Sign Out</span>
                </button>
              </div>
            </div>

            {/* Change Passcode Box */}
            {showChangePassword && (
              <div className="mx-6 mt-4 p-4 rounded-2xl bg-[#0F172A] border border-amber-500/40 animate-in fade-in space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">Set Custom Admin Passcode</span>
                  <button onClick={() => setShowChangePassword(false)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleSaveNewPassword} className="flex gap-2">
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter new master passcode (min 4 characters)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold"
                  >
                    Save Passcode
                  </button>
                </form>
                {passcodeSuccess && (
                  <p className="text-xs text-emerald-400 font-semibold">{passcodeSuccess}</p>
                )}
              </div>
            )}

            {/* Success Alert */}
            {successMessage && (
              <div className="mx-6 mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: UPLOAD FORM */}
              {activeAdminTab === 'upload' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Target Class, Subject, Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Class */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Target Class *
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['11', '12'] as ClassGrade[]).map((grade) => (
                          <button
                            type="button"
                            key={grade}
                            onClick={() => setClassGrade(grade)}
                            className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                              classGrade === grade
                                ? 'bg-[#4F46E5] text-white border-indigo-400 shadow'
                                : 'bg-[#0F172A] text-gray-300 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            Class {grade}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Subject *
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-indigo-500"
                      >
                        {subjectOptions.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Document Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-indigo-500"
                      >
                        <option value="syllabus">1. Syllabus</option>
                        <option value="mock-paper">2. Mock Paper</option>
                        <option value="dpp">3. Daily Practice Paper (DPP)</option>
                        <option value="pyq">4. Previous Year Questions (PYQ)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Document Title & Chapter */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Document Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Class 12 Mathematics Full Length Mock Test #03 (Board Pattern)"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                        Chapter / Unit / Scope
                      </label>
                      <input
                        type="text"
                        value={chapter}
                        onChange={(e) => setChapter(e.target.value)}
                        placeholder="e.g. Integrals / Matrices / Continuity and Differentiability"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Row 3: Meta (Year, Marks, Duration, Difficulty) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2026-27"
                        className="w-full px-3 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Max Marks
                      </label>
                      <input
                        type="number"
                        value={marksTotal}
                        onChange={(e) => setMarksTotal(e.target.value)}
                        placeholder="70"
                        className="w-full px-3 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Duration (Minutes)
                      </label>
                      <input
                        type="number"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                        placeholder="180"
                        className="w-full px-3 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Difficulty Level
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Fundamental">Fundamental</option>
                        <option value="Medium">Medium</option>
                        <option value="Challenging">Challenging</option>
                        <option value="Board Standard">Board Standard</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Document Instructions / Overview
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide study guidelines, question type breakdown, and key focus tips for students..."
                      className="w-full px-4 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* PDF Drag and Drop Area */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Upload PDF / Test Paper File</span>
                      <span className="text-[11px] text-gray-400 lowercase font-normal">
                        (Supports .pdf, .docx, .txt - Or instant digital worksheet synthesizer)
                      </span>
                    </label>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-emerald-400 bg-emerald-950/40'
                          : uploadedFileName
                          ? 'border-indigo-500 bg-indigo-950/20'
                          : 'border-white/10 hover:border-white/20 bg-[#0F172A]'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.doc,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {uploadedFileName ? (
                        <div className="flex items-center justify-center gap-3 text-sm text-emerald-300 font-semibold">
                          <FileText className="w-6 h-6 text-emerald-400" />
                          <span>{uploadedFileName}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">
                            {uploadedFileSize}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <UploadCloud className="w-8 h-8 mx-auto text-gray-400" />
                          <p className="text-xs sm:text-sm font-medium text-gray-300">
                            Drag and drop your PDF here, or <span className="text-indigo-400 underline">browse files</span>
                          </p>
                          <p className="text-[11px] text-gray-500">
                            If no physical file is attached, an official verified worksheet with your instructions will be formatted automatically.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Optional: Add Interactive Solved Questions to this paper */}
                  <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
                          Add Interactive Solved Questions ({questionsList.length})
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        Allows students to practice & reveal answers
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          placeholder="Question prompt (e.g. Find the derivative of x² + 3x + 2...)"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-white focus:outline-none"
                        />
                        <input
                          type="number"
                          value={newQuestionMarks}
                          onChange={(e) => setNewQuestionMarks(Number(e.target.value))}
                          placeholder="Marks"
                          className="w-20 px-3 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-white focus:outline-none text-center"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newQuestionHint}
                          onChange={(e) => setNewQuestionHint(e.target.value)}
                          placeholder="Hint / Key Formula"
                          className="px-3.5 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-gray-300 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={newQuestionAnswer}
                          onChange={(e) => setNewQuestionAnswer(e.target.value)}
                          placeholder="Full Step Solution / Answer"
                          className="px-3.5 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-gray-300 focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-white/10 text-gray-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Append Question to Paper</span>
                      </button>
                    </div>

                    {/* List of currently added questions */}
                    {questionsList.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        {questionsList.map((q, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#1E293B] border border-white/10 text-xs"
                          >
                            <div className="truncate mr-2">
                              <span className="font-bold text-indigo-400 mr-2">Q{q.qNumber} ({q.marks}M):</span>
                              <span className="text-gray-300">{q.question}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(idx)}
                              className="text-rose-400 hover:text-rose-300 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Publish Document to Class {classGrade} Portal</span>
                    </button>
                  </div>

                </form>
              )}

              {/* TAB 2: MANAGE MATERIALS */}
              {activeAdminTab === 'manage' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Total Active Study Materials: {materials.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset study material library back to Mathematics Care Point default dataset?')) {
                          onResetMaterials();
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                    >
                      <RefreshCw className="w-3 h-3 text-amber-400" />
                      <span>Reset Default Vault</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
                    {materials.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                              Class {item.classGrade}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/10 text-gray-300 uppercase">
                              {item.subject}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                              {item.category.toUpperCase()}
                            </span>
                            {item.difficulty && (
                              <span className="text-[10px] text-gray-400">
                                • {item.difficulty}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 truncate">
                            {item.chapter} • Added {item.dateAdded} • {item.downloadsCount} Downloads
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onDeleteMaterial(item.id)}
                            className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-colors"
                            title="Delete Material"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        )}

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-[#0F172A] border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Mathematics Care Point • K.G. Road, Arrah, Bihar</span>
          </span>
          <span className="font-mono text-emerald-400">WhatsApp: 7654144498</span>
        </div>

      </div>
    </div>
  );
};

