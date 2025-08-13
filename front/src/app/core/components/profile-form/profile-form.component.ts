import {Component, Input, OnInit} from '@angular/core';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {IProfileFormStatus, IUser} from '../../../interfaces/user.interface';
import {UserService} from '../../services/user.service';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-profile-form',
  imports: [
    ButtonComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnInit {
  @Input({required: true}) user!: IUser | null;
  profileForm!: FormGroup;
  passwordRegexp!: RegExp;
  public formStatus: IProfileFormStatus = {status: false, type: "success", message: ''};


  constructor(private formBuilder: FormBuilder, private userService: UserService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
    this.profileForm = this.formBuilder.group({
      username: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)]]
    }, {updateOn: 'blur'})
  }

  handleOnFocus() {
    this.formStatus.status = false;
  }

  invalidField(field: string): boolean {
    const ctrl = this.profileForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  handleSubmit() {
    if (!this.profileForm.valid) {
      this.formStatus.status = false;
      this.profileForm.markAllAsTouched();
    } else {
      this.userService.updateUser(this.profileForm.value).subscribe({
        next: (user) => {
          this.sessionService.updateUser(user);
          this.formStatus = {status: true, type: "success", message: 'Utilisateur mis à jour'};
        },
        error: (err) => {
          this.formStatus = {status: true, type: "error", message: err.error.message};
        }
      })
    }
  }
}
