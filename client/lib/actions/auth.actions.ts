import { api } from '../api';
import { LoginResponse } from '../types/login-response.type';


type LoginPayload = {
  email: string;
  password: string;
};

export async function loginAction(data: LoginPayload): Promise<LoginResponse> {
  return api.login(data);
}
