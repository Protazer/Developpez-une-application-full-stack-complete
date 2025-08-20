import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICreatePostRequest, IPost} from '../../interfaces/post.interface';
import {Observable} from 'rxjs';

/**
 * Service responsible for handling operations related to posts,
 * including fetching all posts, fetching a single post by ID, and creating new posts.
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {

  /**
   * Base API path for post endpoints.
   */
  postApiPath = '/api/posts';

  /**
   * Creates an instance of PostService.
   * @param http Angular HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves all posts from the backend API.
   * @returns An Observable emitting an array of posts.
   */
  public getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postApiPath);
  }

  /**
   * Retrieves a single post by its ID.
   * @param id The ID of the post to retrieve.
   * @returns An Observable emitting the post data.
   */
  public getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.postApiPath}/${id}`);
  }

  /**
   * Creates a new post with the given data.
   * @param post The post data to create.
   * @returns An Observable emitting the response from the API.
   */
  public createPost(post: ICreatePostRequest): Observable<object> {
    return this.http.post(this.postApiPath, post);
  }
}
