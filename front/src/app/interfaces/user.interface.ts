import {ITopic} from './topic.interface';

export interface IUser {
  id: number,
  name: string,
  email: string,
  topics: ITopic[],
  created_at: Date,
  updated_at: Date
}

export interface IUserUpdateRequest {
  name: string,
  email: string,
  password: string,
}

export interface IProfileFormStatus {
  status: boolean;
  type: "success" | "error";
  message: string;
}
