import apiClient from '@/lib/axios';
import { ApiResponse, Module, PageResponse } from '@/lib/types';

export async function getModules(semesterId?: number, page = 0, size = 20): Promise<PageResponse<Module>> {
  const res = await apiClient.get<ApiResponse<PageResponse<Module>>>('/api/modules', {
    params: { semesterId, page, size },
  });
  return res.data.data;
}

export async function getModule(id: number): Promise<Module> {
  const res = await apiClient.get<ApiResponse<Module>>(`/api/modules/${id}`);
  return res.data.data;
}

export async function createModule(data: { name: string; description?: string; order: number; coverImageUrl?: string; semesterId: number }): Promise<Module> {
  const res = await apiClient.post<ApiResponse<Module>>('/api/modules', data);
  return res.data.data;
}

export async function updateModule(id: number, data: { name: string; description?: string; order: number; coverImageUrl?: string; semesterId: number }): Promise<Module> {
  const res = await apiClient.put<ApiResponse<Module>>(`/api/modules/${id}`, data);
  return res.data.data;
}
