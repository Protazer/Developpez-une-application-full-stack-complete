import {Component, Input} from '@angular/core';
import {IPost} from '../post/post.component.type';
import {PostComponent} from '../post/post.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  @Input() posts!: IPost[];
}
