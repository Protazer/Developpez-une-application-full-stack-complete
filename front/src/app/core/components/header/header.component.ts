import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {map, Observable, Subscription} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    NgClass,
    FaIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isLogged$?: Observable<boolean>;
  public isResponsiveStyle$!: Observable<boolean>;
  public isResponsiveNavBarActive: boolean = false;
  public navigationSubscription!: Subscription;

  protected readonly faBars = faBars;

  constructor(private sessionService: SessionService, private router: Router, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.isLogged$ = this.sessionService.isLogged$;
    this.isResponsiveStyle$ = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall]).pipe(map(result => result.matches));
    this.navigationSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isResponsiveNavBarActive = false;
      }
    })
  }

  handleNavBar() {
    this.isResponsiveNavBarActive = !this.isResponsiveNavBarActive;
  }

  handleCloseNav() {
    if (this.isResponsiveNavBarActive) {
      this.isResponsiveNavBarActive = false;
    }
  }

  public logOut(): void {
    this.sessionService.logOut();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
