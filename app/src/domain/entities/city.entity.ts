export class CityEntity {
  constructor(
    public id: number,
    public name: string,
    public department_id: number,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}