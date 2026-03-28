export class DepartmentEntity {
  constructor(
    public id: number,
    public name: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}