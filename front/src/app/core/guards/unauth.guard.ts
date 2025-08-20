import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

/**
 * Guard that prevents access to routes for authenticated users.
 * Typically used to restrict access to login or registration pages
 * when the user is already logged in.
 */
@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

  /**
   * Creates an instance of UnauthGuard.
   * @param router Angular Router used to redirect authenticated users.
   */
  constructor(private router: Router) {
  }

  /**
   * Determines whether a route can be activated based on the absence of an auth token.
   * If a token is found in localStorage, redirects the user to the posts page.
   *
   * @returns True if the user is not authenticated; otherwise, false.
   */
  public canActivate(): boolean {
    const session = localStorage.getItem('mdd-token');
    if (session) {
      this.router.navigateByUrl('/posts');
      return false;
    }
    return true;
  }
}
