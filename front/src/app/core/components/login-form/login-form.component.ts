import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {IAuthFailure, IAuthSuccess, ILoginRequest} from '../../../interfaces/auth.interface';
import {AuthService} from '../../services/auth.service';
import {SessionService} from '../../services/session.service';
import {IUser} from '../../../interfaces/user.interface';

/**
 * Component responsible for rendering and handling the login form.
 */
@Component({
  selector: 'app-login-form',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  /**
   * Reactive form group for login credentials.
   */
  public loginForm!: FormGroup;

  /**
   * Object containing form error state and message.
   */
  public formError: IAuthFailure = {status: false, message: ''};

  /**
   * Regular expression used to validate password complexity.
   */
  private passwordRegexp!: RegExp;

  /**
   * Creates an instance of LoginFormComponent.
   * @param fb FormBuilder used to construct the form.
   * @param authService Service responsible for authentication API calls.
   * @param router Angular Router used for navigation after successful login.
   * @param sessionService Manages the current user session.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {
  }

  /**
   * Initializes the login form and sets up the password validation pattern.
   */
  ngOnInit(): void {
    this.passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

    this.loginForm = this.fb.group({
      name: [null, Validators.required],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(this.passwordRegexp)
        ]
      ]
    }, {
      updateOn: 'blur'
    });
  }

  /**
   * Checks if a given form field is invalid and has been interacted with.
   * @param field The name of the form control.
   * @returns True if the field is invalid and dirty or touched.
   */
  invalidField(field: string): boolean {
    const ctrl = this.loginForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  /**
   * Handles form submission. If valid, attempts login and user session setup.
   * On failure, displays an appropriate error message.
   */
  handleSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as ILoginRequest).subscribe({
        next: (response: IAuthSuccess) => {
          this.formError = {status: false, message: ''};
          localStorage.setItem('mdd-token', response.token);

          this.authService.me().subscribe({
            next: (user: IUser) => {
              this.sessionService.logIn(user);
              this.router.navigateByUrl('/posts').then();
            },
            error: (e) => {
              this.formError = {status: true, message: e.error.message};
            }
          });
        },
        error: e => {
          this.formError = {status: true, message: e.error.message};
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
