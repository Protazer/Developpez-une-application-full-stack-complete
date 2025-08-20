import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IComment, ICommentRequest} from '../../interfaces/comment.interface';

/**
 * Service responsible for managing comments, including adding new comments.
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  /**
   * Base API path for comment endpoints.
   */
  private commentPath = "/api/comments";

  /**
   * Creates an instance of CommentService.
   * @param http Angular HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Sends a request to add a new comment.
   * @param comment The comment data to be added.
   * @returns An Observable emitting the updated list of comments.
   */
  public addComment(comment: ICommentRequest) {
    return this.http.post<IComment[]>(this.commentPath, comment);
  }
}
