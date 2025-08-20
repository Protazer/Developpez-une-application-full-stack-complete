import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

/**
 * Guard that prevents access to routes if the user is not authenticated.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
   * Creates an instance of AuthGuard.
   * @param router Angular Router used to redirect unauthenticated users.
   */
  constructor(private router: Router) {
  }

  /**
   * Determines whether a route can be activated based on the presence of an auth token.
   * If no token is found in localStorage, redirects the user to the login page.
   *
   * @returns True if the user is authenticated; otherwise, false.
   */
  public canActivate(): boolean {
    const session = localStorage.getItem('mdd-token');
    if (!session) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
