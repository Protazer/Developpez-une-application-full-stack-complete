import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {map, Observable, Subscription} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

/**
 * Component responsible for displaying the application header,
 * including responsive navigation and user session controls.
 */
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

  /**
   * Observable that emits the user's authentication status.
   */
  public isLogged$?: Observable<boolean>;

  /**
   * Observable that emits `true` if the screen size matches responsive breakpoints.
   */
  public isResponsiveStyle$!: Observable<boolean>;

  /**
   * Indicates whether the responsive navigation bar is currently active (open).
   */
  public isResponsiveNavBarActive: boolean = false;

  /**
   * Subscription to router navigation events, used to close the navbar on route change.
   */
  public navigationSubscription!: Subscription;

  /**
   * FontAwesome icon for the hamburger menu.
   */
  public faBars = faBars;

  /**
   * Creates an instance of HeaderComponent.
   * @param sessionService Service for managing user session state.
   * @param router Angular Router for navigation and event handling.
   * @param breakpointObserver Observes screen size changes for responsive design.
   */
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  /**
   * Initializes the observables and subscribes to router events.
   * Also handles responsive layout detection.
   */
  ngOnInit(): void {
    this.isLogged$ = this.sessionService.isLogged$;

    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches));

    this.navigationSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isResponsiveNavBarActive = false;
      }
    });
  }

  /**
   * Toggles the visibility of the responsive navigation bar.
   */
  handleNavBar(): void {
    this.isResponsiveNavBarActive = !this.isResponsiveNavBarActive;
  }

  /**
   * Closes the responsive navigation bar if it is currently active.
   */
  handleCloseNav(): void {
    if (this.isResponsiveNavBarActive) {
      this.isResponsiveNavBarActive = false;
    }
  }

  /**
   * Logs the user out and navigates to the homepage.
   */
  public logOut(): void {
    this.sessionService.logOut();
    this.router.navigateByUrl('/');
  }

  /**
   * Unsubscribes from router navigation events to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }
}
