export type Department = {
  id: number; 
  name: string;
  created_at: string;
  updated_at: string;
};

export type DepartmentFilter = 'all' | `${number}`;