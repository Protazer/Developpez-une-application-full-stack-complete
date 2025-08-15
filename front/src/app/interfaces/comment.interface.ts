import {IUser} from './user.interface';

export interface IComment {
  id: string,
  content: string,
  user: IUser,
  createdAt: string,
  updatedAt: string,
}

export interface ICommentRequest {
  postId: number,
  content: string,
}

export interface ICommentFormStatus {
  status: boolean;
  message: string;
}
