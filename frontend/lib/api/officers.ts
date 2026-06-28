import apiClient from '@/lib/axios';
import { ApiResponse, Officer, PageResponse } from '@/lib/types';

export async function getOfficers(page = 0, size = 20): Promise<PageResponse<Officer>> {
  const res = await apiClient.get<ApiResponse<PageResponse<Officer>>>('/api/officers', {
    params: { page, size },
  });
  return res.data.data;
}

export async function createOfficer(data: { userId: number; staffCode: string; universityIds: number[] }): Promise<Officer> {
  const res = await apiClient.post<ApiResponse<Officer>>('/api/officers', data);
  return res.data.data;
}

export async function updateOfficerUniversities(id: number, universityIds: number[]): Promise<Officer> {
  const res = await apiClient.put<ApiResponse<Officer>>(`/api/officers/${id}/universities`, { universityIds });
  return res.data.data;
}
