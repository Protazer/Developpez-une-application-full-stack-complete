import {Component, Input, OnInit} from '@angular/core';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {IProfileFormStatus, IUser} from '../../../interfaces/user.interface';
import {UserService} from '../../services/user.service';
import {SessionService} from '../../services/session.service';

/**
 * Component responsible for displaying and handling the user profile update form.
 */
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

  /**
   * The current user data used to pre-fill the form.
   */
  @Input({required: true}) user!: IUser | null;

  /**
   * Reactive form group for profile update.
   */
  profileForm!: FormGroup;

  /**
   * Regex used to validate password strength.
   */
  passwordRegexp!: RegExp;

  /**
   * Status object to display success or error messages after submission.
   */
  public formStatus: IProfileFormStatus = {
    status: false,
    type: "success",
    message: ''
  };

  /**
   * Creates an instance of ProfileFormComponent.
   * @param formBuilder Angular FormBuilder for creating the form group.
   * @param userService Service responsible for user data update.
   * @param sessionService Service for managing session and user state.
   */
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService
  ) {
  }

  /**
   * Initializes the form and sets up validation rules including password strength.
   */
  ngOnInit(): void {
    this.passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

    this.profileForm = this.formBuilder.group({
      username: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegexp)]
      ]
    }, {
      updateOn: 'blur'
    });
  }

  /**
   * Resets the form status when an input field gains focus.
   */
  handleOnFocus(): void {
    this.formStatus.status = false;
  }

  /**
   * Checks if a specific form control is invalid and has been interacted with.
   * @param field The name of the form control.
   * @returns True if the control is invalid and dirty or touched.
   */
  invalidField(field: string): boolean {
    const ctrl = this.profileForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  /**
   * Handles the form submission.
   * If valid, sends the updated user data to the server and updates the session.
   * Displays success or error messages accordingly.
   */
  handleSubmit(): void {
    if (!this.profileForm.valid) {
      this.formStatus.status = false;
      this.profileForm.markAllAsTouched();
    } else {
      this.userService.updateUser(this.profileForm.value).subscribe({
        next: (user) => {
          this.sessionService.updateUser(user);
          this.formStatus = {
            status: true,
            type: "success",
            message: 'Utilisateur mis à jour'
          };
        },
        error: (err) => {
          this.formStatus = {
            status: true,
            type: "error",
            message: err.error.message
          };
        }
      });
    }
  }
}
