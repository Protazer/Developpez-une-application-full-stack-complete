import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CreatePostFormComponent} from '../../core/components/create-post-form/create-post-form.component';
import {Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-create-post',
  imports: [
    FaIconComponent,
    CreatePostFormComponent,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit {
  public faArrowLeft = faArrowLeft;
  public isResponsiveStyle$!: Observable<boolean>;

  constructor(private router: Router, private breakPointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.isResponsiveStyle$ = this.breakPointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }

  handleNavigateToPost() {
    console.log('router');
    this.router.navigateByUrl('/posts');
  }

}
