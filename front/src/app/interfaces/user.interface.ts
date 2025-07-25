import {IUserTopic} from './topic.interface';

export interface IUser {
  id: number,
  name: string,
  email: string,
  topics: IUserTopic[],
  created_at: Date,
  updated_at: Date
}
