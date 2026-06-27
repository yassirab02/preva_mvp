import apiClient from '@/lib/axios';
import { AccessControl, AccessType, ApiResponse } from '@/lib/types';

export async function grantAccess(data: {
  studentId: number;
  semesterId: number;
  accessType: AccessType;
  expiresAt?: string;
}): Promise<AccessControl> {
  const res = await apiClient.post<ApiResponse<AccessControl>>('/api/access', data);
  return res.data.data;
}

export async function getStudentAccess(studentId: number): Promise<AccessControl[]> {
  const res = await apiClient.get<ApiResponse<AccessControl[]>>(`/api/access/student/${studentId}`);
  return res.data.data;
}

export async function revokeAccess(id: number): Promise<void> {
  await apiClient.delete(`/api/access/${id}`);
}
