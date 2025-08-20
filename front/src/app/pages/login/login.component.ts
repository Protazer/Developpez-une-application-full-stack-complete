import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {LoginFormComponent} from '../../core/components/login-form/login-form.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FaIconComponent,
    LoginFormComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public arrowLeft = faArrowLeft;
  public isResponsiveStyle$!: Observable<boolean>;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver,) {
  }

  ngOnInit() {
    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }

  handleNavigateToHome() {
    this.router.navigateByUrl('/');
  }
}
