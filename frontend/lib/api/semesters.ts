import apiClient from '@/lib/axios';
import { ApiResponse, PageResponse, Semester } from '@/lib/types';

export async function getSemesters(majorId?: number, page = 0, size = 20): Promise<PageResponse<Semester>> {
  const res = await apiClient.get<ApiResponse<PageResponse<Semester>>>('/api/semesters', {
    params: { majorId, page, size },
  });
  return res.data.data;
}

export async function createSemester(data: { number: number; label: string; academicYear?: string; majorId: number }): Promise<Semester> {
  const res = await apiClient.post<ApiResponse<Semester>>('/api/semesters', data);
  return res.data.data;
}

export async function updateSemester(id: number, data: { number: number; label: string; academicYear?: string; majorId: number }): Promise<Semester> {
  const res = await apiClient.put<ApiResponse<Semester>>(`/api/semesters/${id}`, data);
  return res.data.data;
}
