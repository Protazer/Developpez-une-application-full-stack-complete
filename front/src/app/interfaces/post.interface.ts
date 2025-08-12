export interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author: string;
}

export interface ICreatePostFormStatus {
  status: boolean;
  message: string;
  type?: "success" | "error";
}
