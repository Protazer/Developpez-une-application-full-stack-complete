import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';

/**
 * Home page component handling navigation and responsive layout.
 */
@Component({
  selector: 'app-home',
  imports: [
    ButtonComponent,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  /**
   * Observable emitting true when viewport matches tablet or smaller breakpoints.
   */
  public isResponsiveStyle$!: Observable<boolean>;

  /**
   * Creates an instance of HomeComponent.
   * @param router Angular Router to handle navigation.
   * @param breakPointObserver Service to detect viewport size changes.
   */
  constructor(private router: Router, private breakPointObserver: BreakpointObserver) {
  }

  /**
   * Initializes responsive style observable based on screen size.
   */
  ngOnInit() {
    this.isResponsiveStyle$ = this.breakPointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches));
  }

  /**
   * Navigates to the specified route.
   * @param route The route path to navigate to.
   */
  handleNavigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
