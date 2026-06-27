import apiClient from '@/lib/axios';
import { ApiResponse, PageResponse, University } from '@/lib/types';

export async function getUniversities(page = 0, size = 20): Promise<PageResponse<University>> {
  const res = await apiClient.get<ApiResponse<PageResponse<University>>>(`/api/universities`, {
    params: { page, size },
  });
  return res.data.data;
}

export async function getUniversity(id: number): Promise<University> {
  const res = await apiClient.get<ApiResponse<University>>(`/api/universities/${id}`);
  return res.data.data;
}

export async function createUniversity(data: Partial<University>): Promise<University> {
  const res = await apiClient.post<ApiResponse<University>>('/api/universities', data);
  return res.data.data;
}

export async function updateUniversity(id: number, data: Partial<University>): Promise<University> {
  const res = await apiClient.put<ApiResponse<University>>(`/api/universities/${id}`, data);
  return res.data.data;
}

export async function deleteUniversity(id: number): Promise<void> {
  await apiClient.delete(`/api/universities/${id}`);
}
