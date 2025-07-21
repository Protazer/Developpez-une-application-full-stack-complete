export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface IAuthSuccess {
  token: string;
}
