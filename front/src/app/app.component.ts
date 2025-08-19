import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './core/components/header/header.component';
import {map, Subscription} from 'rxjs';
import {NgIf} from '@angular/common';
import {AuthService} from './core/services/auth.service';
import {IUser} from './interfaces/user.interface';
import {SessionService} from './core/services/session.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public showHeader!: boolean;
  public navigationSubscription = new Subscription();
  public isResponsive: boolean = false;
  public breakpointObserverSubscription = new Subscription();
  public currentUrl!: string;

  constructor(private router: Router, private authService: AuthService, private sessionService: SessionService, private breakpointObserver: BreakpointObserver,) {
  }

  ngOnInit() {
    this.autoLog();


    this.navigationSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentUrl = val.url;
        this.updateShowHeader();
      }
    });

    this.breakpointObserverSubscription = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      ).subscribe(isResponsive => {
        this.isResponsive = isResponsive;
        this.updateShowHeader();
      });
  }

  public autoLog(): void {
    if (localStorage.getItem('mdd-token')) {
      this.authService.me().subscribe({
          next: (user: IUser) => {
            this.sessionService.logIn(user);
          },
          error: (_) => {
            this.router.navigateByUrl('/');
            this.sessionService.logOut();
          }
        }
      )
    }
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.breakpointObserverSubscription.unsubscribe()
  }

  private updateShowHeader(): void {
    if (this.currentUrl === '/') {
      this.showHeader = false;
    } else if (['/login', '/register'].includes(this.currentUrl)) {
      this.showHeader = !this.isResponsive;
    } else {
      this.showHeader = true;
    }
  }
}
