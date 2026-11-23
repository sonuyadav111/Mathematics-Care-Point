// Mathematics Care Point offers Class 11 and 12 only.
export type ClassGrade = '11' | '12';

export type MaterialCategory = 'syllabus' | 'mock-paper' | 'dpp' | 'pyq';

export interface StudyMaterial {
  id: string;
  classGrade: ClassGrade;
  subject: string;
  category: MaterialCategory;
  title: string;
  description: string;
  chapter?: string;
  year?: string;
  marksTotal?: number;
  durationMinutes?: number;
  fileSize?: string;
  fileName?: string;
  dateAdded: string;
  difficulty?: 'Fundamental' | 'Medium' | 'Challenging' | 'Board Standard';
  keyTopics?: string[];
  questionsCount?: number;
  solutionsAvailable?: boolean;
  isOfficial?: boolean;
  downloadsCount: number;
  sampleQuestions?: {
    qNumber: number;
    question: string;
    marks: number;
    solutionHint?: string;
    fullAnswer?: string;
  }[];
  contentSummary?: string;
  pdfDataUrl?: string; // for user uploaded files
}

export interface SubjectConfig {
  id: string;
  name: string;
  iconName: string;
  color: string;
  chaptersCount: number;
  classes: ClassGrade[];
  description: string;
}

export interface TeacherProfile {
  name: string;
  title: string;
  experienceYears: number;
  qualification: string[];
  specializations: string[];
  philosophy: string;
  achievements: string[];
  stats: {
    studentsMentored: number;
    highestBoardScore: string;
    averageScoreImprovement: string;
    successRate: string;
  };
  contactNumber: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  parentName?: string;
  classGrade: string;
  year: string;
  scoreOrRank: string;
  quote: string;
  subject: string;
  avatarSeed: string;
  locality: string;
}

export interface InquiryFormState {
  studentName: string;
  parentName: string;
  phone: string;
  classGrade: ClassGrade;
  subjects: string[];
  addressLocality: string;
  preferredTiming: string;
  message: string;
}