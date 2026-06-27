import axios from 'axios';
import { ApiResponse, User } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string): Promise<{ accessToken: string; user: User }> {
  const res = await axios.post<ApiResponse<{ accessToken: string; user: User }>>(
    `${BASE}/api/auth/login`,
    { email, password },
    { withCredentials: true }
  );
  return res.data.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  requestedUniversity: string;
  requestedMajor: string;
}): Promise<User> {
  const res = await axios.post<ApiResponse<User>>(`${BASE}/api/auth/register`, data);
  return res.data.data;
}

export async function refreshToken(): Promise<{ accessToken: string; user: User }> {
  const res = await axios.post<ApiResponse<{ accessToken: string; user: User }>>(
    `${BASE}/api/auth/refresh`,
    {},
    { withCredentials: true }
  );
  return res.data.data;
}
