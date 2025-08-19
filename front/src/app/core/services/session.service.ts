import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userSubject = new BehaviorSubject<IUser | undefined>(undefined);
  public user$: Observable<IUser | undefined> = this.userSubject.asObservable();

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  public isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  public logIn(user: IUser): void {
    this.userSubject.next(user);
    this.isLoggedSubject.next(true);
  }

  public updateUser(user: IUser): void {
    this.userSubject.next(user);
  }

  public logOut(): void {
    localStorage.removeItem('mdd-token');
    this.userSubject.next(undefined);
    this.isLoggedSubject.next(false);
  }
}
