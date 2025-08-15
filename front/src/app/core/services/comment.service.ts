import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICommentRequest} from '../../interfaces/comment.interface';
import {IPost} from '../../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentPath = "/api/comments";

  constructor(private http: HttpClient) {
  }

  public addComment(comment: ICommentRequest) {
    return this.http.post<IPost>(this.commentPath, comment);
  }
}
