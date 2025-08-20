import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAuthSuccess, ILoginRequest, IRegisterRequest} from '../../interfaces/auth.interface';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';

/**
 * Service responsible for handling authentication operations such as registration,
 * login, and fetching the authenticated user's profile.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Base API path for authentication endpoints.
   */
  private authPath = "/api/auth";

  /**
   * Creates an instance of AuthService.
   * @param http Angular HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Sends a registration request to the backend API.
   * @param registerRequest Object containing registration data.
   * @returns An Observable that emits the authentication success response with token.
   */
  public register(registerRequest: IRegisterRequest): Observable<IAuthSuccess> {
    return this.http.post<IAuthSuccess>(`${this.authPath}/register`, registerRequest);
  }

  /**
   * Sends a login request to the backend API.
   * @param loginRequest Object containing login credentials.
   * @returns An Observable that emits the authentication success response with token.
   */
  public login(loginRequest: ILoginRequest): Observable<IAuthSuccess> {
    return this.http.post<IAuthSuccess>(`${this.authPath}/login`, loginRequest);
  }

  /**
   * Fetches the currently authenticated user's profile information.
   * @returns An Observable that emits the user data.
   */
  public me(): Observable<IUser> {
    return this.http.get<IUser>(`${this.authPath}/me`);
  }
}
