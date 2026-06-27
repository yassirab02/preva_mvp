import apiClient from '@/lib/axios';
import { ApiResponse, Exam, PageResponse } from '@/lib/types';

export async function getExams(moduleId: number, page = 0, size = 20): Promise<PageResponse<Exam>> {
  const res = await apiClient.get<ApiResponse<PageResponse<Exam>>>('/api/exams', {
    params: { moduleId, page, size },
  });
  return res.data.data;
}

export async function getExam(id: number): Promise<Exam> {
  const res = await apiClient.get<ApiResponse<Exam>>(`/api/exams/${id}`);
  return res.data.data;
}

export async function createExam(data: {
  title: string;
  year: number;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  moduleId: number;
  sourcePdfUrl?: string;
}): Promise<Exam> {
  const res = await apiClient.post<ApiResponse<Exam>>('/api/exams', data);
  return res.data.data;
}

export async function updateExam(id: number, data: Parameters<typeof createExam>[0]): Promise<Exam> {
  const res = await apiClient.put<ApiResponse<Exam>>(`/api/exams/${id}`, data);
  return res.data.data;
}

export async function publishExam(id: number): Promise<Exam> {
  const res = await apiClient.patch<ApiResponse<Exam>>(`/api/exams/${id}/publish`);
  return res.data.data;
}

export async function archiveExam(id: number): Promise<Exam> {
  const res = await apiClient.patch<ApiResponse<Exam>>(`/api/exams/${id}/archive`);
  return res.data.data;
}

export async function addQuestion(examId: number, data: {
  text: string;
  points: number;
  order: number;
  correctAnswer?: string;
  explanation?: string;
  questionType: 'QCM' | 'OPEN';
}): Promise<void> {
  await apiClient.post(`/api/exams/${examId}/questions`, data);
}

export async function updateQuestion(id: number, data: {
  text: string;
  points: number;
  order: number;
  correctAnswer?: string;
  explanation?: string;
  questionType: 'QCM' | 'OPEN';
}): Promise<void> {
  await apiClient.put(`/api/questions/${id}`, data);
}

export async function deleteQuestion(id: number): Promise<void> {
  await apiClient.delete(`/api/questions/${id}`);
}

export async function addChoice(questionId: number, data: { text: string; isCorrect: boolean; order: number }): Promise<void> {
  await apiClient.post(`/api/questions/${questionId}/choices`, data);
}

export async function updateChoice(id: number, data: { text: string; isCorrect: boolean; order: number }): Promise<void> {
  await apiClient.put(`/api/choices/${id}`, data);
}
