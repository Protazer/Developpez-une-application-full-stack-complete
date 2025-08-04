import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser, IUserUpdateRequest} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userApiPath = '/api/user';

  constructor(private http: HttpClient) {
  }

  public updateUser(userUpdateRequest: IUserUpdateRequest) {
    return this.http.post<IUser>(`${this.userApiPath}`, userUpdateRequest)
  }
}
