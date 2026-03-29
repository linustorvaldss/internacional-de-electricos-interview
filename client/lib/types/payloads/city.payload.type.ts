export type CityPayload = {
  name: string;
  department_id: number;
};

export type CityUpdatePayload = {
  name?: string;
  department_id?: number;
};