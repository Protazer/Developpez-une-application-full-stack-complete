import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {IAuthFailure, IAuthSuccess, IRegisterRequest} from '../../../interfaces/auth.interface';
import {SessionService} from '../../services/session.service';
import {IUser} from '../../../interfaces/user.interface';

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
  registerForm!: FormGroup;
  passwordRegexp!: RegExp;
  formError: IAuthFailure = {
    status: false,
    message: ''
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)]],
    }, {
      updateOn: "blur",
    })
  }

  invalidField(field: string): boolean {
    const ctrl = this.registerForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  handleSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as IRegisterRequest).subscribe({
        next: (response: IAuthSuccess) => {
          this.formError = {status: false, message: ''};
          localStorage.setItem('token', response.token);
          this.authService.me().subscribe({
            next: (user: IUser) => {
              this.sessionService.logIn(user);
              this.router.navigateByUrl('/posts').then();
            }, error: e => this.formError = {status: true, message: e.message}
          })

        },
        error: e => {
          this.formError = {status: true, message: e.message};
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
