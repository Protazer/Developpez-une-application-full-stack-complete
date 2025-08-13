import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICreatePostRequest, IPost} from '../../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  topicApiPath = '/api/posts';

  constructor(private http: HttpClient) {
  }

  public getAllPosts() {
    return this.http.get<IPost[]>(this.topicApiPath);
  }

  public createPost(post: ICreatePostRequest) {
    return this.http.post(this.topicApiPath, post);
  }
}
