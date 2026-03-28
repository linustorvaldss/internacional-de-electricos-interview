export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public status: boolean,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}