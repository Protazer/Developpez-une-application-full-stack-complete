import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser, IUserUpdateRequest} from '../../interfaces/user.interface';

/**
 * Service responsible for user-related operations such as updating user information.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Base API path for user endpoints.
   */
  private userApiPath = '/api/user';

  /**
   * Creates an instance of UserService.
   * @param http Angular HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Sends a request to update the current user's information.
   * @param userUpdateRequest Object containing updated user data.
   * @returns An Observable emitting the updated user data.
   */
  public updateUser(userUpdateRequest: IUserUpdateRequest) {
    return this.http.post<IUser>(`${this.userApiPath}`, userUpdateRequest);
  }
}
