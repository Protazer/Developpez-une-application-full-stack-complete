import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './core/components/header/header.component';
import {Subscription} from 'rxjs';
import {NgIf} from '@angular/common';
import {AuthService} from './core/services/auth.service';
import {IUser} from './interfaces/user.interface';
import {SessionService} from './core/services/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public showHeader!: boolean;
  public navigationSubscription = new Subscription();

  constructor(private router: Router, private authService: AuthService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.autoLog();
    this.navigationSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showHeader = val.url != '/';
      }
    })

  }

  public autoLog(): void {
    this.authService.me().subscribe({
        next: (user: IUser) => {
          this.sessionService.logIn(user);
        },
        error: (err) => {
          this.router.navigateByUrl('/');
          this.sessionService.logOut();
        }
      }
    )
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
