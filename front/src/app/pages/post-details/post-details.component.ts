import {Component, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post.service';
import {IPost} from '../../interfaces/post.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  post!: IPost;

  constructor(private route: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.postService.getPost(Number(postId)).subscribe(({next: post => this.post = post}))
  }

}
