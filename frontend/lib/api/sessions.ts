import apiClient from '@/lib/axios';
import { ApiResponse, ExamSession, PageResponse, UserAnswer } from '@/lib/types';

export async function startSession(examId: number): Promise<ExamSession> {
  const res = await apiClient.post<ApiResponse<ExamSession>>('/api/sessions/start', { examId });
  return res.data.data;
}

export async function saveAnswer(
  sessionId: number,
  data: { questionId: number; choiceId?: number; textAnswer?: string }
): Promise<UserAnswer> {
  const res = await apiClient.post<ApiResponse<UserAnswer>>(`/api/sessions/${sessionId}/answer`, data);
  return res.data.data;
}

export async function submitSession(sessionId: number): Promise<ExamSession> {
  const res = await apiClient.post<ApiResponse<ExamSession>>(`/api/sessions/${sessionId}/submit`);
  return res.data.data;
}

export async function getSession(sessionId: number): Promise<ExamSession> {
  const res = await apiClient.get<ApiResponse<ExamSession>>(`/api/sessions/${sessionId}`);
  return res.data.data;
}

export async function getMySessions(page = 0, size = 20): Promise<PageResponse<ExamSession>> {
  const res = await apiClient.get<ApiResponse<PageResponse<ExamSession>>>('/api/sessions/my', {
    params: { page, size },
  });
  return res.data.data;
}
