export type UserRole = 'ADMIN' | 'OFFICER' | 'STUDENT';
export type AccountStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED';
export type ExamStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type QuestionType = 'QCM' | 'OPEN';
export type RegistrationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type AccessType = 'TRIAL' | 'FULL';
export type SessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  createdAt: string;
}

export interface University {
  id: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  country: string;
  city: string;
  isActive: boolean;
  createdAt: string;
}

export interface Major {
  id: number;
  name: string;
  slug: string;
  durationYears: number;
  isActive: boolean;
  universityId: number;
  universityName: string;
  createdAt: string;
}

export interface Semester {
  id: number;
  number: number;
  label: string;
  academicYear: string | null;
  isActive: boolean;
  majorId: number;
  majorName: string;
  createdAt: string;
}

export interface Module {
  id: number;
  name: string;
  description: string | null;
  order: number;
  isActive: boolean;
  coverImageUrl: string | null;
  semesterId: number;
  semesterLabel: string;
  createdAt: string;
}

export interface Choice {
  id: number;
  text: string;
  isCorrect: boolean | null;
  order: number;
}

export interface Question {
  id: number;
  text: string;
  points: number;
  order: number;
  correctAnswer: string | null;
  explanation: string | null;
  questionType: QuestionType;
  choices: Choice[];
}

export interface Exam {
  id: number;
  title: string;
  year: number;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  status: ExamStatus;
  moduleId: number;
  moduleTitle: string;
  sourcePdfUrl: string | null;
  questions: Question[] | null;
  createdAt: string;
}

export interface RegistrationRequest {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  requestedUniversity: string;
  requestedMajor: string;
  status: RegistrationStatus;
  rejectionReason: string | null;
  reviewedByName: string | null;
  submittedAt: string;
  reviewedAt: string | null;
}

export interface Student {
  id: number;
  userId: number;
  name: string;
  email: string;
  universityId: number | null;
  universityName: string | null;
  majorId: number | null;
  majorName: string | null;
  requestedUniversity: string | null;
  requestedMajor: string | null;
  createdAt: string;
}

export interface AccessControl {
  id: number;
  studentId: number;
  studentName: string;
  semesterId: number;
  semesterLabel: string;
  accessType: AccessType;
  grantedByName: string;
  grantedAt: string;
  expiresAt: string | null;
}

export interface UserAnswer {
  id: number;
  questionId: number;
  choiceId: number | null;
  textAnswer: string | null;
  isCorrect: boolean | null;
  pointsEarned: number | null;
}

export interface ExamSession {
  id: number;
  examId: number;
  examTitle: string;
  status: SessionStatus;
  score: number | null;
  percentageScore: number | null;
  isPassed: boolean | null;
  startedAt: string;
  endedAt: string | null;
  exam: Exam | null;
  answers: UserAnswer[] | null;
}

export interface Officer {
  id: number;
  userId: number;
  name: string;
  email: string;
  staffCode: string;
  managedUniversityIds: number[];
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
