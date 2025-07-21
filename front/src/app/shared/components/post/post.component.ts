import {Component, Input} from '@angular/core';
import {IPost} from '../../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: IPost
}
