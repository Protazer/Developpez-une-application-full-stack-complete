import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {SessionService} from '../services/session.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {
  }

  public canActivate(): boolean {
    const session = localStorage.getItem('token');
    if (!session) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
