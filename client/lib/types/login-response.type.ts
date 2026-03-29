import { UserResponse } from './user-response.type';

export type LoginResponse = {
  user: UserResponse;
  token: string;
};