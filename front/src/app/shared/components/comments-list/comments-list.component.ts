import {Component, Input} from '@angular/core';
import {IComment} from '../../../interfaces/comment.interface';
import {NgForOf} from '@angular/common';
import {CommentComponent} from '../comment/comment.component';

@Component({
  selector: 'app-comments-list',
  imports: [
    NgForOf,
    CommentComponent
  ],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss'
})
export class CommentsListComponent {
  /**
   * Array of comments to be displayed.
   */
  @Input({required: true}) comments!: IComment[];
}
