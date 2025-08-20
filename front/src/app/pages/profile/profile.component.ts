import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileFormComponent} from '../../core/components/profile-form/profile-form.component';
import {IUser} from '../../interfaces/user.interface';
import {SessionService} from '../../core/services/session.service';
import {Router} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {TopicsListComponent} from '../../shared/components/topics-list/topics-list.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileFormComponent,
    NgIf,
    AsyncPipe,
    LoaderComponent,
    TopicsListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  /** Observable stream of the current user, or undefined if not logged in */
  public user$!: Observable<IUser | undefined>;

  /** Subscription to user observable, used to trigger navigation if user is absent */
  private userSubscription!: Subscription;

  /**
   * Creates an instance of ProfileComponent.
   * @param sessionService Service managing the user session
   * @param router Angular router for navigation
   */
  constructor(private sessionService: SessionService, private router: Router) {
  }

  /**
   * Subscribes to the user observable and redirects to login if no user is found.
   */
  ngOnInit(): void {
    this.user$ = this.sessionService.user$;
    this.userSubscription = this.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  /**
   * Cleans up the subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
