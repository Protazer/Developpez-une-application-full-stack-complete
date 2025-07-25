import {Component} from '@angular/core';
import {RegisterFormComponent} from '../../core/components/register-form/register-form.component';
import {Router} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  imports: [
    RegisterFormComponent,
    FaIconComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  protected faArrowLeft = faArrowLeft;

  constructor(private router: Router) {
  }

  handleNavigateToHome() {
    this.router.navigateByUrl('/');
  }
}
