import apiClient from '@/lib/axios';
import { ApiResponse, PageResponse, RegistrationRequest } from '@/lib/types';

export async function getRegistrations(page = 0, size = 20): Promise<PageResponse<RegistrationRequest>> {
  const res = await apiClient.get<ApiResponse<PageResponse<RegistrationRequest>>>('/api/registrations', {
    params: { page, size },
  });
  return res.data.data;
}

export async function getRegistration(id: number): Promise<RegistrationRequest> {
  const res = await apiClient.get<ApiResponse<RegistrationRequest>>(`/api/registrations/${id}`);
  return res.data.data;
}

export async function approveRegistration(id: number): Promise<RegistrationRequest> {
  const res = await apiClient.patch<ApiResponse<RegistrationRequest>>(`/api/registrations/${id}/approve`);
  return res.data.data;
}

export async function rejectRegistration(id: number, rejectionReason: string): Promise<RegistrationRequest> {
  const res = await apiClient.patch<ApiResponse<RegistrationRequest>>(`/api/registrations/${id}/reject`, {
    rejectionReason,
  });
  return res.data.data;
}
