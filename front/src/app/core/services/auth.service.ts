import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthSuccess, ILoginRequest, IRegisterRequest} from '../../interfaces/auth.interface';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authPath = "/api/auth";

  constructor(private http: HttpClient) {
  }

  public register(registerRequest: IRegisterRequest): Observable<IAuthSuccess> {
    return this.http.post<IAuthSuccess>(`${this.authPath}/register`, registerRequest);
  }

  public login(loginRequest: ILoginRequest): Observable<IAuthSuccess> {
    return this.http.post<IAuthSuccess>(`${this.authPath}/login`, loginRequest);
  }

  public me(): Observable<IUser> {
    return this.http.get<IUser>(`${this.authPath}/me`);
  }

}
