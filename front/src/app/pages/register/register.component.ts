import {Component, OnInit} from '@angular/core';
import {RegisterFormComponent} from '../../core/components/register-form/register-form.component';
import {Router} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {AsyncPipe, NgIf} from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    RegisterFormComponent,
    FaIconComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  /** Icon for back navigation */
  public faArrowLeft = faArrowLeft;

  /** Observable indicating if responsive styles should be applied */
  public isResponsiveStyle$!: Observable<boolean>;

  /**
   * Creates an instance of RegisterComponent.
   * @param router Angular Router for navigation
   * @param breakpointObserver Service to detect screen size breakpoints
   */
  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
  }

  /**
   * Sets up the observable to track if current screen matches mobile/tablet breakpoints.
   */
  ngOnInit() {
    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }

  /** Navigates back to the home page */
  handleNavigateToHome() {
    this.router.navigateByUrl('/');
  }
}
