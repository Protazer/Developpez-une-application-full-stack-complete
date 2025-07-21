import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {LoginFormComponent} from '../../core/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [
    FaIconComponent,
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public arrowLeft = faArrowLeft;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(private router: Router) {
  }

  handleNavigateToHome() {
    this.router.navigateByUrl('/');
  }
}
