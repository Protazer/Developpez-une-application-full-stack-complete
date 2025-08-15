import {Component, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post.service';
import {IPost} from '../../interfaces/post.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgIf} from '@angular/common';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {CommentFormComponent} from '../../shared/components/comment-form/comment-form.component';
import {CommentService} from '../../core/services/comment.service';
import {CommentsListComponent} from '../../shared/components/comments-list/comments-list.component';

@Component({
  selector: 'app-post-details',
  imports: [
    NgIf,
    LoaderComponent,
    FaIconComponent,
    CommentFormComponent,
    DatePipe,
    CommentsListComponent
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  post!: IPost;
  postId!: number;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(private route: ActivatedRoute, private postService: PostService, private commentService: CommentService, private router: Router) {
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.postService.getPost(Number(this.route.snapshot.params['id'])).subscribe(({next: post => this.post = post}))
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
