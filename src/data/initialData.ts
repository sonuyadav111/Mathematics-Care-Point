import { StudyMaterial, SubjectConfig, TeacherProfile, Testimonial } from '../types';

// NOTE: TeacherProfile.tsx no longer reads TEACHER_DATA (it has its own FACULTY
// constant). This object only exists so existing types keep compiling.
// Numeric/list fields are left empty on purpose: add them ONLY after S.K. Prasad
// confirms the real qualifications, experience and results.
export const TEACHER_DATA: TeacherProfile = {
  name: "S.K. Prasad",
  title: "Director & Mathematics Faculty",
  experienceYears: 0,
  qualification: [],
  specializations: [
    "Class 11 & 12 Mathematics",
    "CBSE and Bihar Board curriculum",
    "Hindi and English medium"
  ],
  philosophy: "Understand the concepts, practise with confidence, and build a strong foundation in Mathematics.",
  achievements: [],
  stats: {
    studentsMentored: 0,
    highestBoardScore: "",
    averageScoreImprovement: "",
    successRate: ""
  },
  contactNumber: "7654144498",
  bio: "S.K. Prasad is the Director and Mathematics faculty at Mathematics Care Point, K.G. Road, Arrah. The institute offers Class 11 and 12 Mathematics coaching for CBSE and Bihar Board students in Hindi and English, in offline and online live classes."
};

export const SUBJECTS_CONFIG: SubjectConfig[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    iconName: "Calculator",
    color: "from-blue-600 to-indigo-700",
    chaptersCount: 15,
    classes: ["11", "12"],
    description: "Concept-based Mathematics for Class 11 and 12 (CBSE and Bihar Board) with practice problems, tests and doubt clearing."
  }
];

// NOTE: These are SAMPLE entries so the portal is not empty. File names do not
// point to real PDFs. Replace them with your real material from the Faculty
// Upload Portal (Admin), then delete any sample you do not need.
export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  // ===================== CLASS 11 =====================
  {
    id: "c11-math-pyq-01",
    classGrade: "11",
    subject: "mathematics",
    category: "pyq",
    title: "Class 11 Trigonometric Functions: Previous Year Questions",
    description: "Compound angles, multiple and sub-multiple angle identities, conditional identities, and graphs of trigonometric functions.",
    chapter: "Trigonometric Functions",
    year: "Previous Years",
    marksTotal: 40,
    fileSize: "2.1 MB",
    fileName: "Class11_Math_Trigonometry_PYQ_Set.pdf",
    dateAdded: "2026-11-01",
    difficulty: "Medium",
    solutionsAvailable: true,
    downloadsCount: 0
  },

  // ===================== CLASS 12 =====================
  {
    id: "c12-math-syl-01",
    classGrade: "12",
    subject: "mathematics",
    category: "syllabus",
    title: "Class 12 Mathematics Syllabus & Chapter Weightage",
    description: "Chapter-wise overview of the Class 12 Mathematics syllabus: Relations & Functions, Algebra, Calculus, Vectors & 3D Geometry, Linear Programming and Probability.",
    chapter: "Full Class 12 Mathematics Syllabus",
    year: "2026-27",
    fileSize: "1.9 MB",
    fileName: "Class12_Mathematics_Syllabus.pdf",
    dateAdded: "2026-11-01",
    difficulty: "Board Standard",
    downloadsCount: 0,
    contentSummary: "Relations & Functions, Algebra (Matrices, Determinants), Calculus (Continuity, Differentiability, Integrals, Applications, Differential Equations), Vectors & 3D Geometry, Linear Programming, Probability. Always confirm the latest marks distribution with your board's official notice."
  },
  {
    id: "c12-math-mock-01",
    classGrade: "12",
    subject: "mathematics",
    category: "mock-paper",
    title: "Class 12 Mathematics Full-Length Mock Paper #01",
    description: "A full-syllabus practice paper in board pattern with MCQs, short and long answer questions, and case-study questions.",
    chapter: "Complete Class 12 Mathematics Syllabus",
    year: "2026-27",
    marksTotal: 80,
    durationMinutes: 180,
    fileSize: "2.8 MB",
    fileName: "Class12_Math_Mock_Paper_01.pdf",
    dateAdded: "2026-11-01",
    difficulty: "Challenging",
    solutionsAvailable: true,
    downloadsCount: 0,
    sampleQuestions: [
      {
        qNumber: 1,
        question: "Evaluate the definite integral: Integral from 0 to pi of [ x * sin(x) / (1 + cos^2(x)) ] dx.",
        marks: 4,
        solutionHint: "Use property Integral[f(x), 0 to a] = Integral[f(a-x), 0 to a]. Add the two integrals to eliminate x from the numerator.",
        fullAnswer: "Let I = Integral[ x sin x / (1 + cos^2 x), 0 to pi ]. Using the property: I = Integral[ (pi - x) sin x / (1 + cos^2 x), 0 to pi ]. Adding both: 2I = pi * Integral[ sin x / (1 + cos^2 x), 0 to pi ]. Put cos x = t, so -sin x dx = dt. 2I = pi * Integral[ 1/(1 + t^2), -1 to 1 ] = pi * (pi/4 + pi/4) = pi^2 / 2. Therefore I = pi^2 / 4."
      }
    ]
  },
  {
    id: "c12-math-dpp-01",
    classGrade: "12",
    subject: "mathematics",
    category: "dpp",
    title: "DPP #01: Definite Integrals Properties & Area Under Curves",
    description: "Practice questions on properties of definite integrals, symmetry, periodic functions and area under curves.",
    chapter: "Integrals & Applications",
    year: "2026-27",
    marksTotal: 30,
    durationMinutes: 60,
    fileSize: "1.5 MB",
    fileName: "DPP_01_Class12_Integrals.pdf",
    dateAdded: "2026-11-01",
    difficulty: "Challenging",
    solutionsAvailable: true,
    downloadsCount: 0
  },
  {
    id: "c12-math-pyq-01",
    classGrade: "12",
    subject: "mathematics",
    category: "pyq",
    title: "Class 12 Vectors & 3D Geometry: Previous Year Questions",
    description: "Shortest distance between skew lines, coplanarity, projection formulas and direction cosines.",
    chapter: "Vectors and Three Dimensional Geometry",
    year: "Previous Years",
    marksTotal: 65,
    fileSize: "3.4 MB",
    fileName: "Class12_Math_3D_Vectors_PYQ.pdf",
    dateAdded: "2026-11-01",
    difficulty: "Board Standard",
    solutionsAvailable: true,
    downloadsCount: 0
  }
];

// No verified testimonials yet. Add real ones here (with permission) when
// you have them. TestimonialsSection should show nothing, or a short note,
// while this list is empty.
export const TESTIMONIALS_DATA: Testimonial[] = [];

export const CORE_ADVANTAGES = [
  {
    title: "Mathematics Focus",
    desc: "Dedicated coaching for Mathematics in Classes 11 and 12.",
    icon: "Calculator",
    badge: "Subject-focused"
  },
  {
    title: "Class 11 & 12",
    desc: "Classes for senior secondary students who want to strengthen their Mathematics foundation.",
    icon: "GraduationCap",
    badge: "Two classes"
  },
  {
    title: "CBSE & Bihar Board",
    desc: "Coaching for students following either the CBSE or the Bihar Board curriculum.",
    icon: "BookOpen",
    badge: "Board support"
  },
  {
    title: "Hindi & English",
    desc: "Learn Mathematics with support in Hindi or English medium.",
    icon: "Languages",
    badge: "Two mediums"
  },
  {
    title: "Online Live Classes",
    desc: "Attend live Mathematics classes online, without travelling to the institute.",
    icon: "Monitor",
    badge: "Online"
  },
  {
    title: "Offline Classes in Arrah",
    desc: "Attend in-person classes at Mathematics Care Point, K.G. Road, Arrah.",
    icon: "MapPin",
    badge: "In-person"
  }
];