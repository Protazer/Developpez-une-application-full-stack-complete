export interface IUserTopic {
  id: string;
  title: string;
  content: string;
}

export interface IUserTopicList {
  topics: IUserTopic[];
}
