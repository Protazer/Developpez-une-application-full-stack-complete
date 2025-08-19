import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {IPost} from '../../interfaces/post.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {PostService} from '../../core/services/post.service';
import {map, Observable, Subscription} from 'rxjs';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {PostsListComponent} from '../../shared/components/posts-list/posts-list.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-posts',
  imports: [
    ButtonComponent,
    FaIconComponent,
    NgClass,
    NgIf,
    LoaderComponent,
    PostsListComponent,
    AsyncPipe
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy {


  public sortType: "asc" | "dsc" = 'asc';

  public posts!: IPost[];
  public faArrowDown = faArrowDown;
  public isResponsiveStyle$!: Observable<boolean>;
  private postsSubscription!: Subscription;

  constructor(private router: Router, private postService: PostService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getAllPosts().subscribe(({
      next: (response: IPost[]) => {
        this.posts = response.sort((a, b) => a.created_at.localeCompare(b.created_at));
      }
    }))

    this.isResponsiveStyle$ = this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }

  handleSortPosts(): void {
    if (this.sortType === "asc") {
      this.sortType = "dsc";
      this.posts.sort((a, b) => b.created_at.localeCompare(a.created_at));
    } else {
      this.sortType = "asc";
      this.posts.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
  }

  handleOnCreatePost() {
    this.router.navigateByUrl("create-post");
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
