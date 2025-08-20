import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CreatePostFormComponent} from '../../core/components/create-post-form/create-post-form.component';
import {Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';

/**
 * Component responsible for rendering the post creation page
 * and handling responsive layout adjustments.
 */
@Component({
  selector: 'app-create-post',
  imports: [
    FaIconComponent,
    CreatePostFormComponent,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit {
  /**
   * FontAwesome icon for back arrow.
   */
  public faArrowLeft = faArrowLeft;

  /**
   * Observable emitting true if viewport matches tablet or smaller breakpoints.
   */
  public isResponsiveStyle$!: Observable<boolean>;

  /**
   * Creates an instance of CreatePostComponent.
   * @param router Angular Router to handle navigation.
   * @param breakPointObserver Service to observe screen size breakpoints.
   */
  constructor(private router: Router, private breakPointObserver: BreakpointObserver) {
  }

  /**
   * Initializes the component by setting up the breakpoint observer.
   */
  ngOnInit() {
    this.isResponsiveStyle$ = this.breakPointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches));
  }

  /**
   * Navigates back to the posts list page.
   */
  handleNavigateToPost() {
    this.router.navigateByUrl('/posts');
  }
}
