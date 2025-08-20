import {Component, Input} from '@angular/core';
import {PostComponent} from '../post/post.component';
import {NgForOf} from '@angular/common';
import {IPost} from '../../../interfaces/post.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  /** Posts array received from the parent component */
  @Input({required: true}) posts!: IPost[];

  constructor(private router: Router) {
  }

  /** Navigate to the detailed view of the selected post */
  handleOnClick(postId: string) {
    this.router.navigateByUrl(`posts/${postId}`);
  }
}
