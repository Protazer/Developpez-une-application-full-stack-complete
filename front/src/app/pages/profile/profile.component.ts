import {Component, OnInit} from '@angular/core';
import {ProfileFormComponent} from '../../core/components/profile-form/profile-form.component';
import {IUser} from '../../interfaces/user.interface';
import {SessionService} from '../../core/services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public user!: IUser;

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit() {
    const user = this.sessionService.user;
    if (!user) {
      this.router.navigateByUrl('/login');
    } else {
      this.user = user;
    }
  }
}
