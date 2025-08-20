import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {LoginFormComponent} from '../../core/components/login-form/login-form.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

/**
 * Login page component displaying login form and handling navigation.
 */
@Component({
  selector: 'app-login',
  imports: [
    FaIconComponent,
    LoginFormComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  /**
   * FontAwesome icon for back arrow.
   */
  public arrowLeft = faArrowLeft;

  /**
   * Observable indicating if the screen size matches tablet or smaller.
   */
  public isResponsiveStyle$!: Observable<boolean>;

  /**
   * Creates an instance of LoginComponent.
   * @param router Angular Router service for navigation.
   * @param breakpointObserver Service to detect screen size changes.
   */
  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
  }

  /**
   * Initializes the responsive style observable.
   */
  ngOnInit() {
    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches));
  }

  /**
   * Navigates to the home page.
   */
  handleNavigateToHome() {
    this.router.navigateByUrl('/');
  }
}
