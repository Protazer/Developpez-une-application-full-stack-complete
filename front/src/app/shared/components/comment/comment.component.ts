import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../interfaces/comment.interface';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  @Input({required: true}) comment!: IComment;
  public isResponsiveStyle$!: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }
}
