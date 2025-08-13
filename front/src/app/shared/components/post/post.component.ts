import {Component, Input} from '@angular/core';
import {IPost} from '../../../interfaces/post.interface';
import {TruncatePipe} from '../../pipes/truncate.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [
    TruncatePipe,
    DatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: IPost
}
