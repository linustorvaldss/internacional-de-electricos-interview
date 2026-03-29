import { api, LoginResponse } from '../api';

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginAction(data: LoginPayload): Promise<LoginResponse> {
  return api.login(data);
}
