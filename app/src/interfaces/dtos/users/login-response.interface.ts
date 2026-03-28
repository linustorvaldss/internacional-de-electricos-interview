export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
  };
  token: string;
}
