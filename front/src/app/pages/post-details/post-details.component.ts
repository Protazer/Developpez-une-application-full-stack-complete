import {Component, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post.service';
import {IPost} from '../../interfaces/post.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {CommentFormComponent} from '../../shared/components/comment-form/comment-form.component';
import {CommentService} from '../../core/services/comment.service';
import {CommentsListComponent} from '../../shared/components/comments-list/comments-list.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';

/**
 * Component for displaying details of a single post, including comments.
 */
@Component({
  selector: 'app-post-details',
  imports: [
    NgIf,
    LoaderComponent,
    FaIconComponent,
    CommentFormComponent,
    DatePipe,
    CommentsListComponent,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  /** Current post displayed in the component */
  public post!: IPost;

  /** ID of the post being viewed */
  public postId!: number;

  /** FontAwesome icon for back arrow */
  public faArrowLeft = faArrowLeft;

  /** Observable that emits true if the viewport matches tablet or smaller sizes */
  public isResponsiveStyle$!: Observable<boolean>;

  /**
   * Creates an instance of PostDetailsComponent.
   * @param route ActivatedRoute to access route parameters
   * @param postService Service to fetch post data
   * @param commentService Service to manage comments
   * @param router Router for navigation
   * @param breakpointObserver Observer to track viewport size
   */
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  /**
   * Fetches post details based on route param and sets up responsive style observable.
   */
  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.params['id']);
    this.postService.getPost(this.postId).subscribe({
      next: post => this.post = post
    });

    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches));
  }

  /**
   * Handles adding a new comment to the current post.
   * @param comment Object containing comment content
   */
  handlePostComment(comment: { content: string }) {
    this.commentService.addComment({
      postId: this.postId,
      content: comment.content
    }).subscribe({
      next: comments => this.post.comments = comments
    });
  }

  /**
   * Navigates back to the posts listing page.
   */
  handleNavigateToPost() {
    this.router.navigateByUrl('/posts');
  }
}
