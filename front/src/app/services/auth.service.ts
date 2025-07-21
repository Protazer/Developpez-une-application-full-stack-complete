import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthSuccess, IRegisterRequest} from '../interfaces/auth.interface';
import {Observable} from 'rxjs';

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

}
