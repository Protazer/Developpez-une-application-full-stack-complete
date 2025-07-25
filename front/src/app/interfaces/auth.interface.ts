export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  name: string;
  password: string;
}

export interface IAuthSuccess {
  token: string;
}

export interface IAuthFailure {
  status: boolean;
  message: string;

}
