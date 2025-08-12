import {Component, Input} from '@angular/core';
import {IPost} from '../../../interfaces/post.interface';
import {TruncatePipe} from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-post',
  imports: [
    TruncatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: IPost
}
