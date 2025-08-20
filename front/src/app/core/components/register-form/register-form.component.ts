import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {IAuthFailure, IAuthSuccess, IRegisterRequest} from '../../../interfaces/auth.interface';
import {SessionService} from '../../services/session.service';
import {IUser} from '../../../interfaces/user.interface';

/**
 * Component responsible for handling user registration via a reactive form.
 */
@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  /**
   * Reactive form group used for registration.
   */
  registerForm!: FormGroup;

  /**
   * Regular expression used to validate password complexity.
   */
  passwordRegexp!: RegExp;

  /**
   * Object storing form error state and message.
   */
  formError: IAuthFailure = {
    status: false,
    message: ''
  };

  /**
   * Creates an instance of RegisterFormComponent.
   * @param fb FormBuilder for constructing the reactive form.
   * @param router Angular Router used for navigation after successful registration.
   * @param authService Service responsible for registration and authentication.
   * @param sessionService Service to manage the active user session.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
  }

  /**
   * Initializes the form group and password validation pattern.
   */
  ngOnInit(): void {
    this.passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)]
      ]
    }, {
      updateOn: "blur"
    });
  }

  /**
   * Checks whether a specific form control is invalid and has been touched or modified.
   * @param field Name of the form control.
   * @returns True if the control is invalid and dirty or touched.
   */
  invalidField(field: string): boolean {
    const ctrl = this.registerForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  /**
   * Handles form submission. Sends registration request to the API,
   * stores token on success, and initializes user session.
   * Displays error message on failure.
   */
  handleSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as IRegisterRequest).subscribe({
        next: (response: IAuthSuccess) => {
          this.formError = {status: false, message: ''};
          localStorage.setItem('mdd-token', response.token);

          this.authService.me().subscribe({
            next: (user: IUser) => {
              this.sessionService.logIn(user);
              this.router.navigateByUrl('/posts').then();
            },
            error: e => {
              this.formError = {status: true, message: e.error.message};
            }
          });
        },
        error: e => {
          this.formError = {status: true, message: e.error.message};
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
