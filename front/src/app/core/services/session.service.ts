import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';

/**
 * Service managing the user session state including authentication status
 * and the current user information.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * BehaviorSubject holding the current authenticated user or undefined if not logged in.
   */
  private userSubject = new BehaviorSubject<IUser | undefined>(undefined);

  /**
   * Observable emitting the current user or undefined.
   */
  public user$: Observable<IUser | undefined> = this.userSubject.asObservable();

  /**
   * BehaviorSubject holding the current authentication status.
   */
  private isLoggedSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable emitting the current logged-in status.
   */
  public isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  /**
   * Logs in a user by updating the current user and authentication status.
   * @param user The authenticated user information.
   */
  public logIn(user: IUser): void {
    this.userSubject.next(user);
    this.isLoggedSubject.next(true);
  }

  /**
   * Updates the current user information without changing authentication status.
   * @param user The updated user information.
   */
  public updateUser(user: IUser): void {
    this.userSubject.next(user);
  }

  /**
   * Logs out the user by clearing session data and updating observables.
   */
  public logOut(): void {
    localStorage.removeItem('mdd-token');
    this.userSubject.next(undefined);
    this.isLoggedSubject.next(false);
  }
}
