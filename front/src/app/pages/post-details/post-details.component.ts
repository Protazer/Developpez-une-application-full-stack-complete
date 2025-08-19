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

  public post!: IPost;
  public postId!: number;
  public faArrowLeft = faArrowLeft;
  public isResponsiveStyle$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, private postService: PostService, private commentService: CommentService, private router: Router, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.postService.getPost(Number(this.route.snapshot.params['id'])).subscribe(({next: post => this.post = post}))
    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }

  handlePostComment(comment: { content: string }) {
    this.commentService.addComment({
      postId: this.postId,
      content: comment.content
    }).subscribe(({next: comments => this.post.comments = comments}))
  }

  handleNavigateToPost() {
    this.router.navigateByUrl('/posts');
  }
}
