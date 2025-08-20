import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {IPost} from '../../interfaces/post.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {PostService} from '../../core/services/post.service';
import {map, Observable, Subscription} from 'rxjs';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {PostsListComponent} from '../../shared/components/posts-list/posts-list.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

/**
 * Component to display and manage a list of posts.
 */
@Component({
  selector: 'app-posts',
  imports: [
    ButtonComponent,
    FaIconComponent,
    NgClass,
    NgIf,
    LoaderComponent,
    PostsListComponent,
    AsyncPipe
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy {

  /** Sort order for posts: ascending ('asc') or descending ('dsc') */
  public sortType: "asc" | "dsc" = 'asc';

  /** Array of posts to display */
  public posts!: IPost[];

  /** FontAwesome icon for arrow down */
  public faArrowDown = faArrowDown;

  /** Observable that emits true if viewport matches tablet or smaller */
  public isResponsiveStyle$!: Observable<boolean>;

  /** Subscription for posts observable */
  private postsSubscription!: Subscription;

  /**
   * Creates an instance of PostsComponent.
   * @param router Router for navigation
   * @param postService Service to fetch posts data
   * @param breakpointObserver Observer to track viewport size changes
   */
  constructor(
    private router: Router,
    private postService: PostService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  /**
   * Subscribes to posts service to fetch posts and sets up responsive layout observable.
   */
  ngOnInit(): void {
    this.postsSubscription = this.postService.getAllPosts().subscribe({
      next: (response: IPost[]) => {
        this.posts = response.sort((a, b) => a.created_at.localeCompare(b.created_at));
      }
    });

    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches));
  }

  /**
   * Toggles the sorting order of the posts list between ascending and descending.
   */
  handleSortPosts(): void {
    if (this.sortType === "asc") {
      this.sortType = "dsc";
      this.posts.sort((a, b) => b.created_at.localeCompare(a.created_at));
    } else {
      this.sortType = "asc";
      this.posts.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
  }

  /**
   * Navigates to the 'create post' page.
   */
  handleOnCreatePost(): void {
    this.router.navigateByUrl("create-post");
  }

  /**
   * Cleans up the subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }
}
