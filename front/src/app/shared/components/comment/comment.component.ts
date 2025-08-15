import {Component, Input} from '@angular/core';
import {IComment} from '../../../interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({required: true}) comment!: IComment;
}
