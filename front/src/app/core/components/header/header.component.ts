import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public isLogged$?: Observable<boolean>;

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit() {
    this.isLogged$ = this.sessionService.isLogged$;
  }

  public logOut(): void {
    this.sessionService.logOut();
    this.router.navigateByUrl('/');
  }
}
