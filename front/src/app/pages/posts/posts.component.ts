import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostListComponent} from '../../shared/components/post-list/post-list.component';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {IPost} from '../../interfaces/post.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {PostService} from '../../core/services/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [
    PostListComponent,
    ButtonComponent,
    FaIconComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy {


  public sortType: "asc" | "dsc" = 'asc';

  public posts!: IPost[];
  protected faArrowDown = faArrowDown;
  private postsSubscription!: Subscription;

  constructor(private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getAllPosts().subscribe(({
      next: (response: IPost[]) => {
        this.posts = response.sort((a, b) => a.created_at.localeCompare(b.created_at));
      }
    }))
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
