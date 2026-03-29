import { api } from '../api';
import { City, Department, DepartmentFilter } from '../types';
import { CityPayload, CityUpdatePayload } from '../types/payloads';

export type DashboardDataResult = {
  departments: Department[];
  cities: City[];
  effectiveFilter: DepartmentFilter;
};

export async function loadCitiesByFilterAction(
  token: string,
  selectedDepartmentFilter: DepartmentFilter,
): Promise<City[]> {
  if (selectedDepartmentFilter === 'all') {
    return api.getCities(token || undefined);
  }

  return api.getCitiesByDepartment(Number(selectedDepartmentFilter), token || undefined);
}

export async function refreshDashboardDataAction(
  token: string,
  selectedDepartmentFilter: DepartmentFilter,
): Promise<DashboardDataResult> {
  const departments = await api.getDepartments(token || undefined);

  let effectiveFilter = selectedDepartmentFilter;
  if (
    effectiveFilter !== 'all' &&
    !departments.some((department) => department.id === Number(effectiveFilter))
  ) {
    effectiveFilter = 'all';
  }

  const cities = await loadCitiesByFilterAction(token, effectiveFilter);

  return {
    departments,
    cities,
    effectiveFilter,
  };
}

export async function createCityAction(data: CityPayload, token?: string | null): Promise<City> {
  return api.createCity(data, token);
}

export async function updateCityAction(id: number, data: CityUpdatePayload, token?: string | null): Promise<City> {
  return api.updateCity(id, data, token);
}

export async function deleteCityAction(id: number, token?: string | null): Promise<void> {
  return api.deleteCity(id, token);
}

