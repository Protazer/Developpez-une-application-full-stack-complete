import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login-form',
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      identifiant: [null],
      password: [null],
    })
  }

  handleSubmit() {
    console.log(this.loginForm.value);
  }

}
