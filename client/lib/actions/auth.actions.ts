import { LoginResponse } from '../types/login-response.type';

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginAction(data: LoginPayload): Promise<LoginResponse> {
  return login(data);
}
