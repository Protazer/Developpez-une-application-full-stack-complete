import {Component, Input} from '@angular/core';
import {PostComponent} from '../post/post.component';
import {NgForOf} from '@angular/common';
import {IPost} from '../../../interfaces/post.interface';

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
