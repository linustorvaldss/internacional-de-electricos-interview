import { Department } from '../types';
import { DepartmentPayload, DepartmentUpdatePayload } from '../types/payloads';
import { api } from '../api';

export async function getDepartmentsAction(token?: string | null): Promise<Department[]> {
  return api.getDepartments(token);
}

export async function createDepartmentAction(data: DepartmentPayload, token?: string | null): Promise<Department> {
  return api.createDepartment(data, token);
}

export async function updateDepartmentAction(
  id: number,
  data: DepartmentUpdatePayload,
  token?: string | null,
): Promise<Department> {
  return api.updateDepartment(id, data, token);
}

export async function deleteDepartmentAction(id: number, token?: string | null): Promise<void> {
  return api.deleteDepartment(id, token);
}
