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
  public faArrowLeft = faArrowLeft;
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
