import {Component, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post.service';
import {IPost} from '../../interfaces/post.interface';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-details',
  imports: [
    NgIf,
    LoaderComponent,
    FaIconComponent
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  post!: IPost;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(private route: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.postService.getPost(Number(postId)).subscribe(({next: post => this.post = post}))
  }
}
