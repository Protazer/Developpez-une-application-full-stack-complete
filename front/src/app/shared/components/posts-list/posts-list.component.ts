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
  @Input() posts!: IPost[];

  constructor(private router: Router) {
  }

  handleOnClick(postId: string) {
    this.router.navigateByUrl(`posts/${postId}`);
  }

}
