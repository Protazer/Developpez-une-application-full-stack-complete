import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileFormComponent} from '../../core/components/profile-form/profile-form.component';
import {IUser} from '../../interfaces/user.interface';
import {SessionService} from '../../core/services/session.service';
import {Router} from '@angular/router';
import {TopicListComponent} from '../../shared/components/topic-list/topic-list.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {LoaderComponent} from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileFormComponent,
    TopicListComponent,
    NgIf,
    AsyncPipe,
    LoaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$!: Observable<IUser | undefined>;
  private userSubscription!: Subscription;

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.sessionService.user$;
    this.userSubscription = this.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
