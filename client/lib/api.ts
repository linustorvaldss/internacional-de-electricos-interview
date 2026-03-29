import { LoginResponse, UserResponse, Department, City} from './types';
import { request } from '@/utils';

export const api = {
  register(data: { name: string; email: string; password: string; status?: boolean }, token?: string | null) {
    return request<UserResponse>('auth/register', { method: 'POST', body: data, token });
  },
  login(data: { email: string; password: string }) {
    return request<LoginResponse>('auth/login', { method: 'POST', body: data });
  },
  getProfile(token: string) {
    return request<string>('auth/profile', { token });
  },

  getDepartments(token?: string | null) {
    return request<Department[]>('departments', { token });
  },
  createDepartment(data: { name: string }, token?: string | null) {
    return request<Department>('departments', { method: 'POST', body: data, token });
  },
  updateDepartment(id: number, data: { name?: string }, token?: string | null) {
    return request<Department>(`departments/${id}`, { method: 'PATCH', body: data, token });
  },
  deleteDepartment(id: number, token?: string | null) {
    return request<void>(`departments/${id}`, { method: 'DELETE', token });
  },
  getDepartmentCities(id: number, token?: string | null) {
    return request<City[]>(`departments/${id}/cities`, { token });
  },

  getCities(token?: string | null) {
    return request<City[]>('cities', { token });
  },
  getCitiesByDepartment(departmentId: number, token?: string | null) {
    return request<City[]>(`cities/department/${departmentId}`, { token });
  },
  createCity(data: { name: string; department_id: number }, token?: string | null) {
    return request<City>('cities', { method: 'POST', body: data, token });
  },
  updateCity(id: number, data: { name?: string; department_id?: number }, token?: string | null) {
    return request<City>(`cities/${id}`, { method: 'PATCH', body: data, token });
  },
  deleteCity(id: number, token?: string | null) {
    return request<void>(`cities/${id}`, { method: 'DELETE', token });
  },
};