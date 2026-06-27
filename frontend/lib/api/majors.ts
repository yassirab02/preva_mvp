import apiClient from '@/lib/axios';
import { ApiResponse, Major, PageResponse } from '@/lib/types';

export async function getMajors(universityId?: number, page = 0, size = 20): Promise<PageResponse<Major>> {
  const res = await apiClient.get<ApiResponse<PageResponse<Major>>>('/api/majors', {
    params: { universityId, page, size },
  });
  return res.data.data;
}

export async function createMajor(data: { name: string; slug: string; durationYears: number; universityId: number }): Promise<Major> {
  const res = await apiClient.post<ApiResponse<Major>>('/api/majors', data);
  return res.data.data;
}

export async function updateMajor(id: number, data: { name: string; slug: string; durationYears: number; universityId: number }): Promise<Major> {
  const res = await apiClient.put<ApiResponse<Major>>(`/api/majors/${id}`, data);
  return res.data.data;
}
