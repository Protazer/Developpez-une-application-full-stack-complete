import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {IAuthFailure, IAuthSuccess, ILoginRequest} from '../../../interfaces/auth.interface';
import {AuthService} from '../../services/auth.service';
import {SessionService} from '../../services/session.service';
import {IUser} from '../../../interfaces/user.interface';

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
  public loginForm!: FormGroup;
  public formError: IAuthFailure = {status: false, message: ''};
  private passwordRegexp!: RegExp;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private sessionService: SessionService) {
  }


  ngOnInit() {
    this.passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
    this.loginForm = this.fb.group({
        name: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)]],
      },
      {updateOn: 'blur'}
    )
  }


  invalidField(field: string): boolean {
    const ctrl = this.loginForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as ILoginRequest).subscribe(
        {
          next: (response: IAuthSuccess) => {
            this.formError = {status: false, message: ''};
            localStorage.setItem('token', response.token);
            this.authService.me().subscribe({
              next: (user: IUser) => {
                this.sessionService.logIn(user);
                this.router.navigateByUrl('/posts').then();
              },
              error: (e) => {
                this.formError = {status: true, message: e.message};
              }
            })

          },
          error: e => this.formError = {status: true, message: e.message},
        }
      )
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
