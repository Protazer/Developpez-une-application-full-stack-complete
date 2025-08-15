import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IComment, ICommentRequest} from '../../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentPath = "/api/comments";

  constructor(private http: HttpClient) {
  }

  public addComment(comment: ICommentRequest) {
    return this.http.post<IComment[]>(this.commentPath, comment);
  }
}
