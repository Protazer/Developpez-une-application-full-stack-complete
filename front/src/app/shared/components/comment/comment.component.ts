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
  /**
   * Comment data to display.
   * This input is required.
   */
  @Input({required: true}) comment!: IComment;

  /**
   * Observable that emits true if the viewport matches tablet or smaller screen sizes.
   * Used to adapt the component's style responsively.
   */
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
