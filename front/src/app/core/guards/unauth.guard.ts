import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {
  }

  public canActivate(): boolean {
    const session = localStorage.getItem('mdd-token');
    if (session) {
      this.router.navigate(['posts']);
      return false;
    }
    return true;
  }
}
