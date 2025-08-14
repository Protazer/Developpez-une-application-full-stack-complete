import {IUser} from './user.interface';
import {ITopic} from './topic.interface';

export interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author: IUser;
  topic: ITopic;
}

export interface ICreatePostRequest {
  title: string;
  content: string;
  topicId: string;
}

export interface ICreatePostFormStatus {
  status: boolean;
  message: string;
  type?: "success" | "error";
}
