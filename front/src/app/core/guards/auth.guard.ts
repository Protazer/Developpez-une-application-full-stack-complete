import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    const session = localStorage.getItem('mdd-token');
    if (!session) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
